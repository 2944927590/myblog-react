import React from 'react';
import { Link } from 'react-router';

let Article = React.createClass({
    render() {
        let details = this.props.details;
        details = details.map( (item, index) => {
            return (
                <article key={"article-" + index}>
                    <div className="title" title={item.title}>
                        <Link to="details" params={{articleId: item.id}} title={item.title}>
                            <i className="glyphicon glyphicon-triangle-right icon-title"></i>
                            &nbsp;{item.title}
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-md-3">

                            <img className="img-thumbnail" src ={ "../vendor/images/" + item.img_file }/>
                        </div>
                        <div className="col-md-9">
                            <div className="content">
                                <p>{item.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row sub-title">
                        <div className="col-md-3"><i className="glyphicon glyphicon-time"></i>&nbsp;{item.create_time}</div>
                        <div className="col-md-2"><i className="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;{item.category}</div>
                        <div className="col-md-2"><i className="glyphicon glyphicon-eye-open"></i> {item.hits}</div>
                        <div className="col-md-5">
                            <Link to="details" params={{articleId: item.id}}  className="btn btn-success btn-sm pull-right btn-read-all" title={item.title}>阅读全文>></Link>
                        </div>
                    </div>
                </article>
            );
        });
        return(
            <div>
                <div className="article-list">
                    {details}
                </div>
            </div>
        );
    }
});

export default Article;
