import { connectDB } from "@/util/database";

import { ObjectId } from "mongodb";


export default async function handler(req, res) {
        console.log('parent_id',req.query.parent_id)
        

        const db = (await connectDB).db("nextforum")
        let result=await db.collection('comment_market')
        .find({parent_id:new ObjectId(req.query.parent_id)}).toArray()

        
        return res.status(200).json(result)



}