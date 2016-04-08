import React from 'react';
import $ from 'jquery';

import AppF from './../_base/app_function';
import config from './../_config/app_config';
import Articles from './article';

let Category = React.createClass({
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
  componentDidMount() {
    this.loadCommentsFromServer();
  },
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
