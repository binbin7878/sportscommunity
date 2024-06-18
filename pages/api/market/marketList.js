import { connectDB } from "@/util/database";



export default async function handler(req, res) {
        
        

        const db = (await connectDB).db("nextforum")
        let result=await db.collection('post_market')
        .find().toArray()
        console.log('marketlist:',result)
        res.status(200).json(result)



}