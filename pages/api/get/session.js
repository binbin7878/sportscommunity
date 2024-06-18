import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req,res){
    let session = await getServerSession(req, res, authOptions)
    if(session){
        res.status(200).json(session.user.email)
    }else{
        res.status(500).json('로그인 안함')
    }
}