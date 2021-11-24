var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var auth_router = require("src/network/routes/auth");
var products_router = require("src/network/routes/products");


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/v1/auth", auth_router);
app.use("/v1/products", products_router);

module.exports = app;
