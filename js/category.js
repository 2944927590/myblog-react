import React from 'react';
import $ from 'jquery';

import AppF from './App_function';
import config from './app_config';
import Articles from './article';


let Category = React.createClass({
  //初始化状态变量
  getInitialState() {
    return {
      categoryId: this.props.params.categoryId,
      article: []
    };
  },
  loadCommentsFromServer() {
    let self = this;
    $.ajax({
      url: './mock/detail.json',
      dataType: 'json',
      success: function(r) {
        if(200 == r.errCode){
          AppF.getDetailsByField(r.data, 'category_id', self.state.categoryId, (details) => {
            AppF.articleCut(details, config.indexShowNum, (detailsCuted) => {
              //console.log(detailsCuted);
              AppF.timeToStr(detailsCuted, (detailsStrTime) => {
                AppF.isStrCut(detailsStrTime, 'title', config.indexTitleLength, (details) => {
                  AppF.isStrCut(details, 'content', config.indexContentLength, (details) => {
                    self.setState({article: details});
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
  //当组件在页面上渲染完成之后调用
  componentDidMount() {
    this.loadCommentsFromServer();
  },
  //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryId: nextProps.params.categoryId
    });
    this.loadCommentsFromServer();
  },
  render(){
    let articles = this.state.article;
    let category = config.emptyArticleMsg;

    articles.map( (item, index) => {
      category = item.category;
      return false;
    });
    return (
        <div>
          <div className="headline">{category}<span className="font-green"></span></div>
          <Articles details={articles}/>
        </div>
    );
  }
});




export default Category
