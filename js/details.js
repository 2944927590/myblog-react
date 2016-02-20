import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

import AppF from './App_function';
import config from './app_config';
import Articles from './article';

let Article = React.createClass({
    render() {
        let threeArticle = this.props.article;
        //console.log(threeArticle);
        let cur, pre, next;
        $.each(threeArticle, function(item, value){
           // console.log(item);
           // console.log(value);
            if(item == 'cur'){
                cur = <div>
                        <div className="col-md-12 article-title">{value.title}</div>
                        <div className="col-md-12 article-icon">
                            <ul>
                                <li>
                                    <i className="glyphicon glyphicon-folder-open"></i>&nbsp;{value.category}
                                </li>
                                <li>
                                    <i className="glyphicon glyphicon-time"></i>&nbsp;{value.create_time}
                                </li>
                                <li>
                                    <i className="glyphicon glyphicon-eye-open"></i>&nbsp;{value.hits}人阅读
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <p className="article-content">{value.content}</p>
                        </div>
                        <div className="col-md-12 article-icon">
                            <ul>
                                <li>
                                    <a href="javascript:;"><i className="glyphicon glyphicon-thumbs-up"></i>&nbsp;赞</a>
                                </li>
                                <li>
                                    <i className="glyphicon glyphicon-comment"></i>&nbsp;0人评论
                                </li>
                            </ul>
                        </div>
                       </div>
            } else if(item == 'pre'){
                //console.log(value.length);
                if(!value.id){
                    pre = <p className="article-pre">
                            <i className="glyphicon glyphicon-chevron-up"></i>&nbsp;上一篇：无
                          </p>
                } else {
                    pre = <p className="article-pre" data-category-id={value.category_id}>
                            <Link
                                to="details"
                                params={{articleId: value.id}}
                                title={value.title}>
                                <i className="glyphicon glyphicon-chevron-up"></i>
                                &nbsp;上一篇：{value.title}
                            </Link>
                          </p>
                }
            } else {
                //console.log(value.id);
                if(!value.id){
                    next = <p className="article-pre">
                              <i className="glyphicon glyphicon-chevron-down"></i>&nbsp;下一篇：无
                           </p>
                } else {
                    next = <p className="article-pre" data-category-id={value.category_id}>
                                <Link
                                    to="details"
                                    params={{articleId: value.id}}
                                    title={value.title}>
                                    <i className="glyphicon glyphicon-chevron-down"></i>
                                    &nbsp;下一篇：{value.title}
                                </Link>
                           </p>
                }
            }
        });
        return (
            <div className="row">
                {cur}
                <div className="col-md-12" id="pre-next">
                    {pre}
                    {next}
                </div>
            </div>
        );
    }
});

let Details = React.createClass({
    //初始化状态变量
    getInitialState() {
        return {
            articleId: this.props.params.articleId,
            threeArticle: []
        };
    },
    loadCommentsFromServer() {
        let self = this;
        $.ajax({
            url: './mock/detail.json',
            dataType: 'json',
            success: function(r) {
                if(200 == r.errCode){
                    var details = r.data;
                    AppF.articleSort(details, 'id', 'ase', function(details){
                        AppF.timeToStr(details, function(details){
                            var details = details;
                            self.getArticleKey(details, self.state.articleId, function(key){
                                self.getThreeArticle(details, key, function(threeArticle){
                                    //console.log(threeArticle);
                                    self.setState({
                                        threeArticle: threeArticle[0]
                                    });
                                });
                            });
                        });
                    });
                }
            },
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }
        });
    },
    changeNavClass() {
        $("#pre-next").on('click', 'p', function(){
            console.log($(this).data('category-id'));
            $("#navbar-nav li a").trigger('click', $(this).data('category-id'));
        });
    },
    //当组件在页面上渲染完成之后调用
    componentDidMount() {
        this.loadCommentsFromServer();
        this.changeNavClass();
    },
    //当组件刚刚从页面中移除或销毁时调用
    //componentWillUnmount(){
    //
    //},
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    componentWillReceiveProps(nextProps) {
        this.setState({
            articleId: nextProps.params.articleId
        });
        this.loadCommentsFromServer();
    },
    //在接收到新的 props 或者 state，将要渲染之前调用。
    //shouldComponentUpdate(nextProps, nextState) {
    //  //console.log( nextProps);
    //  return this.state.categoryId == nextProps.params.categoryId;
    //},
    getThreeArticle(details, key, cb) {
        var arr = new Array();
        var length = details.length;
        //  console.log(key);
        if( length == 0 || key === ''){
            cb([]);
        } else if(length == 1){
            arr.push({pre: {}, cur: details[0], next: {} });
        } else {
            if(key == 0){
                arr.push({pre: {}, cur: details[0], next: details[1] });
            } else if (key == length - 1){
                arr.push({pre: details[length - 2], cur: details[length - 1], next: {} });
            } else {
                arr.push({pre: details[key - 1], cur: details[key], next: details[key + 1] });
            }
        }
        cb(arr);
    },
    getArticleKey(details, article_id, cb) {
        if(0 == details.length){
            cb('');
        } else {
            details.forEach(function(item, k){
                if(item['id'] == article_id){
                    cb(k);
                }
            });
        }
    },
    render() {
        return(
            <div>
                <Article article={this.state.threeArticle}/>
            </div>
        );
    }
});

export default Details;