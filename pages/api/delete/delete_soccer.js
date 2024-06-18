import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req,res){
    
    if(req.method=='DELETE'){      
        
        const db = (await connectDB).db("nextforum")
        // let session=await getServerSession(req,res,authOptions)
        // let find=await db.collection('post_basketball').findOne({_id:new ObjectId(req.body)})

        await db.collection('post_soccer').deleteOne({_id:new ObjectId(req.body)})
            return res.status(200).json('삭제완료')
        // if(find.author==session.user.email){
        //     await db.collection('post_basketball').deleteOne({_id:new ObjectId(req.body)})
        //     return res.status(200).json('삭제완료')
        // }else{
        //     return res.status(500).json('작성자만 삭제 가능')
        // }
        
        
    }
}