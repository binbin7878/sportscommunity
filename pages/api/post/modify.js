import { connectDB } from "@/util/database";
import { _id } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";


export default async function Modify(req, res) {


    if (req.method == 'POST') {


        if (req.body.title == '') {
            return res.status(500).json('제목 없음')
        } else if (req.body.content == '') {
            return res.status(500).json('내용 없음')
        } else {
            const db = (await connectDB).db("nextforum")
            await db.collection('post').updateOne({ _id : new ObjectId(req.body.id) },
                { $set: { title: req.body.title, content: req.body.content } });

            return res.status(200).redirect('/list')
        }







    }

}