import { connectDB } from "@/util/database";

import { ObjectId } from "mongodb";



export default async function handler(req, res) {
        // console.log('commentlikeget출력:',req.query)

        // const db = (await connectDB).db("nextforum")
        // let result=await db.collection('commentheart')
        // .find({commentid:req.query.commentid}).toArray()
        // console.log('댓글아이디result',result)


        // let resultcnt=await db.collection('commentheart').countDocuments({commentid:result.commentid})
        // console.log('resultcnt배열',resultcnt)
        // return res.status(200).json(resultcnt)

        try {
                console.log('commentlikeget출력:', req.query);

                const db = (await connectDB).db("nextforum");
                const result = await db.collection('commentheart').countDocuments({ commentid: req.query.commentid });

                console.log('resultcnt', result);
                return res.status(200).json(result);
        } catch (error) {
                console.error('Error fetching like counts:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
        }



}