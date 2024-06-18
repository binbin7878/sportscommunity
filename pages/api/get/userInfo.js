import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../util/database';

export default async function handler(req,res){
    const db = (await connectDB).db("nextforum")
    let session = await getServerSession(req, res, authOptions)
    if(session){
        
        let result=await db.collection('user')
        .findOne({email:session.user.email})
        console.log('result',result)
        res.status(200).json(result)
    }else{
        res.status(500).json('로그인 안함')
    }
}