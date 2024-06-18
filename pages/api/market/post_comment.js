import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {

    let today=new Date()
    let commentAt=today.toLocaleString()

    let session = await getServerSession(req, res, authOptions)
    console.log('session:',session)

    
    
    if (req.method == 'POST') {
        console.log('request body:',req.body)

        
        if (session == null) {
            return res.status(500).json('로그인 부터 해주세요!')
        }
        else if (req.body.content == '') {
            return res.status(500).json('댓글을 입력해주세요!')
        }
        else {
            req.body = JSON.parse(req.body)
            
            let comment = {
                content: req.body.content,
                parent_id: new ObjectId(req.body.parent_id),
                author: session.user.email,
                comment_at:commentAt
            }
            const db = (await connectDB).db("nextforum")
            await db.collection('comment_market').insertOne(comment)
            return res.status(200).json('저장완료')
        }


    }
    

}