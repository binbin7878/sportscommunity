import { connectDB } from "@/util/database";

import { ObjectId } from "mongodb";


export default async function handler(req, res) {

        const db = (await connectDB).db("nextforum")
        let result=await db.collection('posthate')
        .find({parentid:req.query.id}).toArray()
        
        let resultcnt=await db.collection('posthate').countDocuments({parentid:req.query.id})
        return res.status(200).json(resultcnt)



}