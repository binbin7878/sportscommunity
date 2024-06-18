import { connectDB } from "../../../util/database";
import { ObjectId } from "mongodb";

export default async function handler(req,res){
    if(req.method=='POST'){

        console.log(req.body.id)
        
        
        const db = (await connectDB).db("nextforum")
        let result=await db.collection('user').find({userid:req.body.id}).toArray()
        console.log(result.length)
        if(result.length>0){
            return res.status(200).json('아이디 중복')
        }else{
            return res.status(200).json('가입 가능')
        }
    }
}