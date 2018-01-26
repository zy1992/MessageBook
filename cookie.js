/**
 * Created by My on 2018/1/15.
 */
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.get("/",function(req,res,next){
    res.cookie("name",'tfboy',{maxAge:90000,httpOnly:true});
    res.send(req.cookies.name)
})

app.listen(3000);