var MongoClient = require("mongodb").MongoClient;
var dbURL = require('../settings.js');

exports._connectMongoDB = function(callBack){
    MongoClient.connect(dbURL.dburl,function(err,db){
        if(err){
            callBack(err,null);
            return;
        }
        callBack(err,db);
    })
};

//insertData
exports.insertOne = function(collectionName,json,callBack){
        this._connectMongoDB(function(err,db){
            db.collection(collectionName).insertOne(json,function(err,result){
                if(err){
                    callBack(err,null);
                    return;
                }
                callBack(err,result);
                db.close();
            })
        })
};


//deleteData
exports.deleteOne = function(collectionName,json,callBack){
    this._connectMongoDB(function(err,db){
        db.collection(collectionName).deleteOne(json,function(err,result){
            if(err){
                callBack(err,null);
                return;
            }
            callBack(err,result);
            db.close();
        })
    })
};
//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
exports.find = function (collectionName, json, C, D) {
    var result = [];    //结果数组
    if (arguments.length == 3) {
        //那么参数C就是callback，参数D没有传。
        var callback = C;
        var skipnumber = 0;
        //数目限制
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        //应该省略的条数
        var skipnumber = args.pageamount * args.page || 0;
        //数目限制
        var limit = args.pageamount || 0;
        //排序方式
        var sort = args.sort || {};
    } else {
        throw new Error("find函数的参数个数，必须是3个，或者4个。");
        return;
    }

    //连接数据库，连接之后查找所有
    this._connectMongoDB(function (err, db) {
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close(); //关闭数据库
                return;
            }
            if (doc != null) {
                result.push(doc);   //放入结果数组
            } else {
                //遍历结束，没有更多的文档了
                callback(null, result);
                db.close(); //关闭数据库
            }
        });
    });
};
//update
exports.updateOne = function(collectionName,json1,json2,callBack){
        this._connectMongoDB(function(err,db){
            db.collection(collectionName).updateOne(json1,json2,function(err,result){
                if(err){
                    callBack(err,null);
                    return;
                }
                callBack(err,result);
                db.close();
            })
        })
};
exports.updateMany = function(collectionName,json1,json2,callBack){
    this._connectMongoDB(function(err,db){
        db.collection(collectionName).updateMany(json1,json2,function(err,result){
            if(err){
                callBack(err,null);
                return;
            }
            callBack(err,result);
            db.close();
        })
    })
};

exports.deleteOne= function(collectionName,json,callBack){
    this._connectMongoDB(function(err,db){
        db.collection(collectionName).deleteOne(json,function(err,result){
            if(err){
                callBack(err,null);
                return;
            }
            callBack(err,result);
            db.close();
        })
    })
};
exports.deleteMany= function(collectionName,json,callBack){
    this._connectMongoDB(function(err,db){
        db.collection(collectionName).deleteMany(json,function(err,result){
            if(err){
                callBack(err,null);
                return;
            }
            callBack(err,result);
            db.close();
        })
    })
};
exports.getAllCount = function(collectionName,json,callBack){
    this._connectMongoDB(function(err,db){
        db.collection(collectionName).count({}).then(function(count){
            callBack(count);
            db.close();
        })
    })
};