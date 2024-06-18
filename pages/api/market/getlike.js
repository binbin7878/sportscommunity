import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";

import { getServerSession } from "next-auth";

export default async function handler(req, res) {
        let session=await getServerSession(req,res,authOptions)


        const db = (await connectDB).db("nextforum")
        let result=await db.collection('market_like')
        .find({user:session.user.email}).toArray()
        

        const post_id=result.map(item=>item.post_id)

        
        
        
        return res.status(200).json(post_id)



}