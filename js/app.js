import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import $ from 'jquery';


//import Forms from './form';
//import Timer from './timer';

import Home from './home';
import Category from './category';
import Details from './details';
import AppF from './App_function';


let Nav = React.createClass({

    render() {
        //console.log(this.props.nav);
        let nav = this.props.nav;
        //console.log(nav);
        let navCom = nav.map(function(category , i){
            if(0 == category.children.length){
                return <li>
                           <Link to="category" key={'Link-' + i}>{category.name}</Link>
                       </li>
            } else {
                let navLiDrop = category.children.map(function(children , ii){
                    return <li>
                               <Link to="category" key={'Link-child' + ii}>{children.name}</Link>
                           </li>
                });
                //console.log(category.children);
                return <li className="dropdown">
                           <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" role="button"   aria-haspopup="true" aria-expanded="false" key="child-00">
                               {category.name}
                               <span className="caret"></span>
                           </a>
                           <ul className="dropdown-menu">
                               {navLiDrop}
                           </ul>
                       </li>
            }
        });
        //console.log(navCom);
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="home" className="navbar-brand" >{"XZQ\'Blog"}</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav" id="navbar-nav">
                            <li  className="active" >
                                <Link to="home" key="Link-00">首页 </Link>
                            </li>
                            {navCom}
                        </ul>
                        <form className="navbar-form navbar-right" role="search">
                            <div className="form-group">
                                <input type="text" className="form-control search-input" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-default search-button">搜索</button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
});

let App = React.createClass({
    getInitialState() {
        return {data: []};
    },
    loadCommentsFromServer() {
        $.ajax({
            url: './mock/nav.json',
            dataType: 'json',
            success: function(r) {
                if(200 == r.errCode){
                    var data = [];
                    AppF.nav(r.data, function(nav){
                        data.push(nav || []);
                    });
                    this.setState({data: data[0]});
                    //console.log(this.state.data);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount() {
        this.loadCommentsFromServer();
    },
    render() {
        let nav = this.state.data;
        return (
            <div>
                <header className="page-head">
                    <Nav nav={nav} />
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
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
                        <div className="col-md-9">
                            <div id="container-right">
                                {/* <RouteHandler/> */}
                                <RouteHandler/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}></DefaultRoute>
    <Route name="category" path="/category" handler={Category}/>
    <Route name="details" path="/details" handler={Details}/>
  </Route>

);

Router.run(routes, Router.HashLocation, (Handler) => {
  React.render(<Handler />, document.getElementById("react"));
});

