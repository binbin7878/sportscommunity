import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
        
        console.log(req.query)

        const db = (await connectDB).db("nextforum")
        let result=await db.collection('post_market')
        .find({_id: new ObjectId(req.query.id)}).toArray()
        console.log('result:',result)
        return res.status(200).json(result)



}