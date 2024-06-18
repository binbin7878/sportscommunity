import { connectDB } from "@/util/database";

import { ObjectId } from "mongodb";


export default async function handler(req, res) {

        // const db = (await connectDB).db("nextforum")
        // let result=await db.collection('commenthate')
        // .find({parentid:req.query.id}).toArray()
        
        // let resultcnt=await db.collection('commenthate').countDocuments({parentid:req.query.id})
        // return res.status(200).json(resultcnt)

        try {
                console.log('commenthateget출력:', req.query);

                const db = (await connectDB).db("nextforum");
                const result = await db.collection('commenthate').countDocuments({ commentid: req.query.commentid });

                console.log('resultcnt', result);
                return res.status(200).json(result);
        } catch (error) {
                console.error('Error fetching like counts:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
        }



}