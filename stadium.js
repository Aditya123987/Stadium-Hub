const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review= require("./reviews");
const stadiumSchema=new schema(
    {
        name:String,
        
        capacity:Number,
        location:String,
        description:String,
        latitude:Number,
        longitude:Number,
        image:String,
        reviews:[
            {type:schema.Types.ObjectId,
            ref:"Review"
            }
        ]
    }
)
stadiumSchema.post("findOneAndDelete",async function(doc){
    if(doc){
        await Review.deleteMany({
            id:{$in:
                doc.reviews
            }
        })
    }
});
module.exports=mongoose.model("Stadium",stadiumSchema);
