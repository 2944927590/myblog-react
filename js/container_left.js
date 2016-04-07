import React from 'react';

let ContainerLeft = React.createClass({
    render() {
        return(
           <div>
               <p className="notice"><i className="glyphicon glyphicon-bullhorn"></i>&nbsp;<span>公告</span></p>
               <div className="notice-content">本博客文章如无特别注明，均为原创，欢迎转载、传阅，共同交流~</div>
               <p className="blogger"><i className="glyphicon glyphicon-user"></i>&nbsp;<span>博主</span></p>
               <div className="blogger-info">
                   <p><span>昵称：<a href="javascript:;" data-go-route="archive/home/init">阿林十一</a></span></p>
                   <p><span>家乡：<a href="javascript:;">江西省-赣州市</a></span></p>
                   <p><span>现居住地：<a href="javascript:;">江西省-赣州市</a></span></p>
                   <p><span>园龄：<a href="javascript:;">8个月</a></span></p>
               </div>
               <p className="new-blog"><i className="glyphicon glyphicon-list-alt"></i>&nbsp;<span>最新文章</span></p>
               <div className="new-blog-details">
                   <ul>
                       <li><a href="javascript:;" title="{{=item.title}}" data-go-route-reload="archive/detail/detail&detailId={{=item.id}}">aaaaa</a></li>
                   </ul>
               </div>
               <p className="reading-list"><i className="glyphicon glyphicon-list"></i>&nbsp;<span>阅读排行榜</span></p>
               <div className="reading-list-details">
                   <ul>
                       <li><a href="javascript:;" title="{{=item.title}}" data-go-route-reload="archive/detail/detail&detailId={{=item.id}}">bbbbbbb</a></li>
                   </ul>
               </div>
           </div>
        );
    }
});

export default ContainerLeft;
