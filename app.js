var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var auth_router = require("src/network/routes/auth");
var products_router = require("src/network/routes/products");
var users_router = require("src/network/routes/users");
var carts_router = require("src/network/routes/carts");
var orders_router = require("src/network/routes/orders");
var payments_router = require("src/network/routes/payments");
var products_categories_router = require("src/network/routes/products_categories");


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors()); // Use this after the variable declaration
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/v1/auth", auth_router);
app.use("/v1/products", products_router);
app.use("/v1/users", users_router);
app.use("/v1/payments", payments_router);
app.use("/v1/categories", products_categories_router);
app.use("/v1/carts", carts_router);
app.use("/v1/orders", orders_router);

module.exports = app;
