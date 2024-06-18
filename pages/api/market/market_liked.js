// import { connectDB } from "@/util/database";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
// import { ObjectId } from "mongodb";


// export default async function Handler(req, res) {

//     console.log('찜전송결과',req.body)
//     let session=await getServerSession(req,res,authOptions)
//     const db = (await connectDB).db("nextforum")
    

//     if(req.method=='POST'){
//         let a=await db.collection('market_like').find({post_id:new ObjectId(req.body),user:session.user.email}).toArray()
//         if(a.length>0){
//             await db.collection('market_like').deleteOne({post_id:new ObjectId(req.body),user:session.user.email})
//             return res.status(200).json('찜콩취소')
//         }else{
//             const result=await db.collection('market_like').insertOne({post_id:new ObjectId(req.body),user:session.user.email})
//             return res.status(200).json('찜콩')
//         }
//     }    

    

// }

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function Handler(req, res) {
    let session = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db("nextforum");

    if (req.method === 'POST') {
        const { post_id } = req.body; // 클라이언트에서 전송한 post_id 추출
        console.log('찜전송결과', post_id);

        try {
            const existingLike = await db.collection('market_like').findOne({ post_id: new ObjectId(post_id), user: session.user.email });

            if (existingLike) {
                await db.collection('market_like').deleteOne({ post_id: new ObjectId(post_id), user: session.user.email });
                return res.status(200).json({ status: '찜콩취소' });
            } else {
                await db.collection('market_like').insertOne({ post_id: new ObjectId(post_id), user: session.user.email,
                    post_title:req.body.post_title,
                    post_content:req.body.post_content
                 });
                return res.status(200).json({ status: '찜콩' });
            }
        } catch (error) {
            console.error('Database operation failed:', error);
            return res.status(500).json({ error: 'Database operation failed' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
