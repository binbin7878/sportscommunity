import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
    let session=await getServerSession(req,res,authOptions)

    if(session){
        if(req.method=='POST'){
            console.log(req.body)
            let heart={
                parentid:req.body,
                userid:session.user.email
            }     
            const db = (await connectDB).db("nextforum")
                let dupCount=await db.collection('posthate').find({
                    parentid:req.body,
                    userid:session.user.email
                }).toArray()
                if(dupCount.length>0){
                    await db.collection('posthate').deleteOne(heart)
                    let a=await db.collection('posthate').countDocuments({parentid:req.body})
                    return res.status(200).json({like:a,msg:'싫어요취소'})
                }else{
                    await db.collection('posthate').insertOne(heart)
                }
                let count=await db.collection('posthate').countDocuments({parentid:req.body})
                return res.status(200).json({like:count,msg:'싫어요'})
        }

    }else if(!session){
        return res.status(500).json('로그인안함')
    }
    
    else{
        return res.status(500).json('오류')

    }
}