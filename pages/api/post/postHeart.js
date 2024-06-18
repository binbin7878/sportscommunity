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
                let dupCount=await db.collection('postheart').find({
                    parentid:req.body,
                    userid:session.user.email
                }).toArray()
                if(dupCount.length>0){
                    await db.collection('postheart').deleteOne(heart)
                    let a=await db.collection('postheart').countDocuments({parentid:req.body})
                    return res.status(200).json({like:a,msg:'좋아요취소'})
                }else{
                    await db.collection('postheart').insertOne(heart)
                }
                let count=await db.collection('postheart').countDocuments({parentid:req.body})
                return res.status(200).json({like:count,msg:'좋아요'})
        }

    }else if(!session){
        return res.status(500).json('로그인안함')
    }
    
    else{
        return res.status(500).json('오류')

    }
}