import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PubSub from 'pubsub-js';

import AppF from './../_base/app_function';
import config from './../_config/app_config';
import Articles from './article';
import EventName from './../_base/app_event';

let Article = React.createClass({
    changeNavClassPre: function(e){
        console.log("Article -- changeNavClassPre");
        let cid = React.findDOMNode(this.refs.articlePre).getAttribute("data-category-id");
        PubSub.publish(EventName.navClass, {categoryId: cid});
    },
    changeNavClassNext: function(e){
        console.log("Article -- changeNavClassPre");
        let cid = React.findDOMNode(this.refs.articleNext).getAttribute("data-category-id");
        PubSub.publish(EventName.navClass, {categoryId: cid});
    },
    render() {
        let threeArticle = this.props.article;
        let cur, pre, next;
        //console.log(threeArticle);
        $.each(threeArticle, (item, value) => {
            if(item == 'cur'){
                cur = (
                    <div>
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
                );
            } else if(item == 'pre'){
                if(!value.id){
                    pre = (
                        <p className="article-pre">
                            <i className="glyphicon glyphicon-chevron-up"></i>&nbsp;上一篇：无
                        </p>
                    );
                } else {
                    pre = (
                        <p className="article-pre" data-category-id={value.category_id} onClick={this.changeNavClassPre} ref="articlePre">
                            <Link
                                to="details"
                                params={{articleId: value.id}}
                                title={value.title}>
                                <i className="glyphicon glyphicon-chevron-up"></i>
                                &nbsp;上一篇：{value.title}
                            </Link>
                        </p>
                    );
                }
            } else {
                if(!value.id){
                    next = (
                        <p className="article-pre">
                            <i className="glyphicon glyphicon-chevron-down"></i>&nbsp;下一篇：无
                        </p>
                    );
                } else {
                    next = (
                        <p className="article-pre" data-category-id={value.category_id} onClick={this.changeNavClassNext} ref="articleNext">
                            <Link
                                to="details"
                                params={{articleId: value.id}}
                                title={value.title}>
                                <i className="glyphicon glyphicon-chevron-down"></i>
                                &nbsp;下一篇：{value.title}
                            </Link>
                        </p>
                    );
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
    getInitialState() {
        return {
            threeArticle: []
        };
    },
    loadCommentsFromServer() {
        console.log("loadCommentsFromServer");
        let self = this;
        $.ajax({
            url: './mock/detail.json',
            dataType: 'json',
            success: function(r) {
                if(200 == r.errCode){
                    var details = r.data;
                    AppF.articleSort(details, 'id', 'ase', (details) => {
                        AppF.timeToStr(details, (details) => {
                            var details = details;
                            self.getArticleKey(details, self.props.params.articleId, (key) => {
                                self.getThreeArticle(details, key, (threeArticle) => {
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
    componentWillMount(){
        console.log("Details -- componentWillMount");
        this.loadCommentsFromServer();
    },
    //当组件在页面上渲染完成之后调用
    componentDidMount() {
        console.log("Details -- componentDidMount");
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    componentWillReceiveProps(nextProps) {
        console.log("Details -- componentWillReceiveProps");
        this.loadCommentsFromServer();
    },
    render() {
        console.log(this.state.threeArticle);
        return(
            <div>
                <Article article={this.state.threeArticle}/>
            </div>
        );
    },
    getThreeArticle(details, key, cb) {
        var arr = [];
        var length = details.length;
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
    }
});

export default Details;