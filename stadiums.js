
const express = require("express");

const router=express.Router();
const Stadium = require("../Models/stadium");
const expressError = require("../utils/expressError");
const catchAsync = require("../utils/catchAsync");
const {serverSchema}= require("../schema.js")

const validateStadium = (req, res,next) => {
    
    const {error}=serverSchema.validate(req.body);
    console.log(error);
    if(error){
    const msg=error.details.map(el=>el.message).join(', ');
    throw new expressError(msg,400);
    }
    else{
        next();
    }
}
router.get("/", catchAsync(async (req, res) => {
    const stadiums = await Stadium.find({});
    res.render("index", { stadiums });
}))
router.get("/new", (req, res) => {
    res.render("new");
})
router.post("/", validateStadium,catchAsync(async (req, res, next) => {
    // if (!req.body,name) throw new expressError("name not filled", 500);
   
    const newStadium = new Stadium(req.body);
    await newStadium.save();
    req.flash("success","Successfully created a new stadium!!!!");
    res.redirect(`/Stadiums/${newStadium.id}`)
}
))
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const stadium = await Stadium.findById(id).populate("reviews");
    if(!stadium){
        req.flash("error","Stadium not found");
        return res.redirect(`/Stadiums`);
    }
    res.render("show", { stadium });
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const stadium = await Stadium.findById(id);
    if(!stadium){
        req.flash("error","Stadium not found");
        return res.redirect(`/Stadiums`);
    }
    res.render("edit", { stadium });
}))
router.put("/:id",validateStadium, catchAsync(async (req, res) => {
    const { id } = req.params;
    const stadium = await Stadium.findByIdAndUpdate(id, req.body);
    req.flash("success","Updated a stadium!!!");
    res.redirect(`/Stadiums/${stadium.id}`);
}))
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Stadium.findByIdAndDelete(id);
    req.flash("success","Deleted a stadium!!!")
    res.redirect("/Stadiums");
}))
module.exports=router;