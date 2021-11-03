const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Stadium = require("./Models/stadium");
const Review= require("./Models/reviews");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");
const catchAsync = require("./utils/catchAsync");
const joi = require("joi");
const ImageExtension = require('joi-image-extension')
const {serverSchema,reviewSchema}= require("./schema.js");
const stadiums=require("./routes/stadiums");
const reviews=require("./routes/reviews");
const session= require("express-session");
const flash=require("connect-flash");
mongoose.connect("mongodb://localhost:27017/stadiumsHub",
    {
        useNewUrlParser: true,

        useUnifiedTopology: true,
       
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const sessionConfig={
    secret:"key",
    resave:false,
    saveUninitialized:true,
    cookie:{
       
        maxAge:24*7*60*60,
        httpOnly:true,
    }
}


app.use(session(sessionConfig));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
app.use("/stadiums",stadiums);
app.use("/stadiums/:id/reviews",reviews);


app.all("*", (req, res, next) => {
    next(new expressError("Page not found", 404));
})
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Something wrong";
    res.status(status).render("error", { err });

})
app.listen(2000, () => {
    console.log("listening on Port 2000");
})