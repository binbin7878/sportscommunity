


import { connectDB } from "@/util/database";


export default async function Signup(req,res){

   
    if(req.method=='POST'){
        if(req.body.id==''){
            return res.status(500).json('아이디 입력바람')
        }else if(req.body.email==''){
            return res.status(500).json('이메일 입력바람')
        }
        else if(req.body.password==''||req.body.passwordconfirm==''){
            return res.status(500).json('비밀번호 입력바람')
        }else if(req.body.password!=req.body.passwordconfirm){
            return res.status(500).json('비밀번호 다름')

        }else{
            const db = (await connectDB).db("nextforum")
            await db.collection('user').insertOne({userid:req.body.id,password:req.body.password})
            return res.status(200).redirect('/list')
        }
        
        
        
        
    }
    
}

