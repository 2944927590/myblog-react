import React from 'react';
import $ from 'jquery';

import AppF from './App_function';
import config from './app_config';
import Articles from './article';

let Home = React.createClass({
  getInitialState() {
    return {
      details: []
    };
  },
  loadCommentsFromServer() {
    let self = this;
    $.ajax({
      url: './mock/detail.json',
      dataType: 'json',
      success: function(r) {
        if(200 == r.errCode){
          AppF.articleCut(r.data, config.indexShowNum, (detailsCuted) => {
            //console.log(detailsCuted);
            AppF.timeToStr(detailsCuted, (detailsStrTime) => {
              AppF.isStrCut(detailsStrTime, 'title', config.indexTitleLength, (details) => {
                AppF.isStrCut(details, 'content', config.indexContentLength, (details) => {
                  self.setState({details: details || []});
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
  render() {
    let details = this.state.details;
    return(
      <div>
        <div className="headline">文章<span className="font-green">推荐</span></div>
        <Articles details={details}/>
      </div>
    );
  }
});

export default Home;

