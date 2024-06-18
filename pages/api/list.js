import { connectDB } from "@/util/database";


export default async function ListHandler(req,res){

    const db = (await connectDB).db("nextforum")
    let result=await db.collection('post').find().toArray()
   
    return res.status(200).json(result)
}