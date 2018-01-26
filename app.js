/**
 * Created by My on 2018/1/14.
 */
var express = require("express");
var ejs = require("ejs");
var formidable = require("formidable");
var db = require("./models/db.js");
var objectId = require("mongodb").ObjectId;
var app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.get("/",function(req,res,next){
    db.getAllCount("messageBook",{},function(count){
        res.render('index',{
            "pageamount":Math.ceil(count / 4)
        });
    });

});

app.post("/submit",function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fileds){
        db.insertOne("messageBook",{
            "userName":fileds.userName,
            "message":fileds.message,
            "messageTime":new Date()
        },function(err,result){
            if(err){
                res.json("-1");
                return;
            }
            res.json("1");
        })
    });
});

    app.get("/show",function(req,res,next){
        var page = parseInt(req.query.page);
        db.find("messageBook",{},{"sort":{"messageTime":-1},"pageamount":4,"page":page},function(err,result){
            res.json({"result":result});
        })
    });

app.get("/deleteMessage",function(req,res,next){
    var id = req.query.id;
    db.deleteMany("messageBook",{"_id":objectId(id)},function(err,result){
        res.redirect("/");
    });
});


app.listen(3000);