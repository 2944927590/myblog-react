import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import $ from 'jquery';

import config from './app_config';
import Home from './home';
import ContainerLeft from './container_left';
import Category from './category';
import Details from './details';
import Footer from './footer';
import AppF from './App_function';

let Nav = React.createClass({
    addActive(e){
        var self = $(e.target),
            cid = self.parent().data('active');
        //console.log(self);
        //console.log(cid);
        $('#navbar-nav li').removeClass('active');
        $('#navbar-nav li[data-active="' + cid +'"]').addClass('active');
        self.parents('.dropdown').addClass("active");
    },
    render() {
        //console.log(this.props.nav);
        let self = this;
        let nav = self.props.nav;
        //console.log(nav);
        let navCom = nav.map( (category , i) => {
            if(0 == category.children.length){
                return <li key={'Link-' + i} data-active={category.id} onClick={this.addActive}>
                           <Link
                               to="category"
                               params={{categoryId: category.id}}>
                               {category.name}
                           </Link>
                       </li>
            } else {
                let navLiDrop = category.children.map( (children , ii) => {
                    return <li key={'Link-child' + ii} data-active={children.id} onClick={this.addActive}>
                               <Link
                                   to="category"
                                   params={{categoryId: children.id}} >
                                   {children.name}
                               </Link>
                           </li>
                });

                return <li className="dropdown" key={'Link-' + i}>
                           <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" role="button"   aria-haspopup="true" aria-expanded="false" key="child-00">
                               {category.name}
                               <span className="caret"></span>
                           </a>
                           <ul className="dropdown-menu" id="navbar-topic-list">
                               {navLiDrop}
                           </ul>
                       </li>
            }
        });
        //console.log(navCom);
        return (
            <header className="page-head">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header" data-active="0">
                            <Link to="home" className="navbar-brand">{config.title}</Link>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav" id="navbar-nav">
                                <li  className="active" data-active="0" onClick={this.addActive}>
                                    <Link to="home" key="Link-home" >首页 </Link>
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
            </header>
        );
    }
});
//app 入口
let App = React.createClass({
    //初始化状态变量
    getInitialState() {
        return {category: []};
    },
    loadCommentsFromServer() {
        var self = this;
        $.ajax({
            url: './mock/nav.json',
            dataType: 'json',
            success: function(r) {
                if(200 == r.errCode){
                    AppF.nav(r.data, function(nav){
                        self.setState({category: nav || []});
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
    //当组件刚刚从页面中移除或销毁时调用
    componentWillUnmount(){

    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    componentWillReceiveProps(nextProps) {

    },
    render() {
        let nav = this.state.category;
        return (
            <div>
                <Nav nav={nav} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ContainerLeft/>
                        </div>
                        <div className="col-md-9">
                            <div id="container-right">
                                {/* <RouteHandler/> */}
                                <RouteHandler/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}></DefaultRoute>
    <Route name="category" path="/category/:categoryId" handler={Category}/>
    <Route name="details" path="/details/:articleId" handler={Details}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Handler) => {
  React.render(<Handler />, document.getElementById("app"));
});

