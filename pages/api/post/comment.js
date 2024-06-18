import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    console.log(session)

    const today=new Date()
    const commentAt=today.toLocaleString()
    
    if (req.method == 'POST') {
        if (session == null) {
            return res.status(500).json('로그인 부터 해주세요!')
        }
        else if (req.body.comment == '') {
            return res.status(500).json('댓글을 입력해주세요!')
        }
        else {
            req.body = JSON.parse(req.body)
            
            let comment = {
                content: req.body.comment,
                parent: new ObjectId(req.body._id),
                author: session.user.email,
                commentat:commentAt
            }
            const db = (await connectDB).db("nextforum")
            await db.collection('comment').insertOne(comment)
            return res.status(200).json('저장완료')
        }


    }
    else if (req.method == 'GET') {
        const db = (await connectDB).db("nextforum")
        await db.collection('comment').find().toArray()
    }

}