define(function(require, exports, module){

    exports.init = function(){

    };
    exports.nav = function(topicList, cb){
        var arr = new Array();
        topicList.forEach(function(v){
            var children = new Array();
            if(0 == v['pid']){
                topicList.forEach(function(vv){
                    if(vv['pid'] == v['id']){
                        children.push(vv);
                    }
                });
                v['children'] = children;
                arr.push(v);
            }
        });
        cb(arr);
    }
    exports.articleSort = function(details, field, order, cb){
        if(0 == details.length){
            cb([]);
        } else if(field.length > 0){
            if(order.toLowerCase() == 'desc'){
                details.sort(function(a, b){
                    return parseInt( b[field] ) - parseInt( a[field] );
                });
            } else {
                details.sort(function(a, b){
                    return parseInt( a[field] ) - parseInt( b[field] );
                });
            }
            cb(details || []);
        }
    }
    exports.articleCut = function(details, num, cb){
        //console.log(details);
        if(0 == details.length || !num) {
            cb([]);
        } else {
            var arr = new Array();
            for(var i = 0, length = details.length; i < num && i < length; i++){
                arr.push(details[i]);
            }
            cb(arr || []);
        }

    }
    exports.timeToStr = function(details, cb){
        if(0 == details.length){
            cb([]);
        } else {
            var time = require("./time");
            details.forEach(function(item){
                item.create_time = time.format('yyyy年mm月dd日', parseInt(item.create_time * 1000));
            });
            cb(details || []);
        }
    }
    exports.isStrCut = function(details, field, num, cb){
        if(0 == details.length){
            cb([]);
        } else {
            details.forEach(function(item){
                //console.log(item[field]);
                if(item[field].length > num){
                    //console.log(item[field].length);
                    item[field] = item[field].substr(0, num) + "...";
                }
            });
            cb(details || []);
        }
    }
    exports.getDetailsByField = function(details, field, value, cb){
        //console.log(field);
        //console.log(value);
        //console.log(field.length);
        //console.log(value.length);
        if(0 == details.length){
            cb([]);
        } else if(field.length || value.length){
            var arr = new Array();
            details.forEach(function(item){
                //console.log(item[field]);
                //console.log('-----------'+value);
                if(item[field] == value){
                    //console.log(item);
                    //console.log(item[field]);
                    arr.push(item);
                }
            });
            cb(arr);
        } else {
            cb(details);
        }
    }
    exports.addClassActive = function( category_id ){
        $('#navbar-nav li').removeClass('active');
        var current_li = $('#navbar-nav li[data-nav="category' + category_id +'"]');
        current_li.addClass('active');
        var parent = current_li.parents("li.dropdown");
        if(parent.length){
            parent.addClass('active');
        }
    }
});