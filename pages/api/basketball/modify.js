import { connectDB } from "@/util/database";
import { _id } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";


export default async function Modify(req, res) {


    const today=new Date()
    const commentAt=today.toLocaleString()


    if (req.method == 'POST') {

        console.log('upudate baseball',req.body)


        if (req.body.title == '') {
            return res.status(500).json('제목 없음')
        } else if (req.body.content == '') {
            return res.status(500).json('내용 없음')
        } else {
            const db = (await connectDB).db("nextforum")
            await db.collection('post_basketball').updateOne({ _id : new ObjectId(req.body.id) },
                { $set: { title: req.body.title, content: req.body.content, filesrc:req.body.filesrc, postAt:commentAt } });

            return res.status(200).redirect('/')
        }







    }

}