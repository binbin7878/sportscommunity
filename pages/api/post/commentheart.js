import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
    console.log(req.body)
    let session=await getServerSession(req,res,authOptions)

    if(session){
        if(req.method=='POST'){
            console.log('댓글 좋아요 전송결과:',req.body)
            let result=JSON.parse(req.body)
            console.log('jsonparsereqbody:',result)
            let heart={
                postid:result.postid,
                userid:session.user.email,
                commentid:result.commentid
                
            }
            console.log('heart:',heart)     
            const db = (await connectDB).db("nextforum")
                let dupCount=await db.collection('commentheart').find(heart).toArray()
                if(dupCount.length>0){
                    await db.collection('commentheart').deleteOne(heart)
                    let a=await db.collection('commentheart').countDocuments({commentid:heart.commentid})
                    return res.status(200).json({like:a,msg:'좋아요취소'})
                }else{
                    await db.collection('commentheart').insertOne(heart)
                }
                let count=await db.collection('commentheart').countDocuments({commentid:heart.commentid})
                return res.status(200).json({like:count,msg:'좋아요'})
        }

    }else if(!session){
        return res.status(500).json('로그인안함')
    }
    
    else{
        return res.status(500).json('오류')

    }
}