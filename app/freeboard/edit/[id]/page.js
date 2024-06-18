import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import updatePost from "./updatePost"
import UpdatePost from "./updatePost"

export default async function Edit(props){

    const db = (await connectDB).db("nextforum")
    let result = await db.collection('post_freeboard').findOne({_id:new ObjectId(props.params.id)})
    
    console.log("Edit result:", result)
    return(
        // <div className="p-20">
        //     <h4>수정페이지</h4>
        //     <form action="/api/post/modify" method="POST">
        //         <input type="hidden" name='id' defaultValue={result._id.toString()}></input>
        //         <input name="title" placeholder="글제목" defaultValue={result.title} />
        //         <input name="content" placeholder="글내용" defaultValue={result.content}/>
        //         <button type="submit">수정</button>
        //     </form>
        // </div>
        <UpdatePost _id={result._id.toString()} title={result.title} content={result.content}></UpdatePost>
        
    )
}