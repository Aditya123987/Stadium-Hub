const express=require("express");
const app=express();
const stadiums=require("./seed.js")

const mongoose=require("mongoose");
const Stadium=require("../Models/stadium");

mongoose.connect("mongodb://localhost:27017/stadiumsHub",
{
    useNewUrlParser:true,
    
    useUnifiedTopology:true,
}
)
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
})

const seedDB=async()=>{
    await Stadium.deleteMany({});
    for(let i=0;i<12;i++){
        const n=new Stadium(stadiums[i]);
        await n.save();
        
    }
}
seedDB().then(()=>{mongoose.connection.close()});