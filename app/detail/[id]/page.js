import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./comment"
import Like from "./like"


export default async function Detail(props){

    const db = (await connectDB).db("nextforum")
    let result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)})
    console.log(props.params.id)
    return(
        <div>
            <br></br>
            <h4>상세페이지</h4>
            <div class="bg-slate-300 my-4 w-full h-[2px]"></div>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <br></br>
            <Like parentid={props.params.id}></Like>
            <br></br>
            <Comment _id={result._id.toString()}></Comment>
        </div>
    )
}