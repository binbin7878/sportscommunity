import { connectDB } from "../../../util/database";

import { ObjectId } from "mongodb";


export default async function handler(req, res) {
        if(req.method=='GET'){
            try{
                const db = (await connectDB).db("nextforum")
                let result=await db.collection('post_soccer')
                .find().toArray()
                                
                res.status(200).json(result)
            } catch(error){
                console.log(error)
                res.status(500).json({message:'Interner server error'})

            }
        }else{
            res.status(405).json({message:'Method Not Allowed'})
        }
        

       



}