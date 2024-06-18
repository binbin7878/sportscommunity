import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function Sell(req, res) {
    let session=await getServerSession(req,res,authOptions)

    if(session){
        req.body.author=session.user.email
        if (req.method == 'POST') {
            console.log(req.body)
            if (req.body.title == '') {
                return res.status(500).json('제목 없음')
            } else if (req.body.content == '') {
                return res.status(500).json('내용없음')
            } else {
                const db = (await connectDB).db("nextforum")
                await db.collection('post_market').insertOne(req.body)
                return res.status(200).redirect('/market')
            } 
        }

    }
    else{
        return res.status(500).json('로그인 먼저 해주세요.')
    }

    

}