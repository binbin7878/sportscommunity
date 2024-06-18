import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props){

    const db = (await connectDB).db("nextforum")
    let result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)})
    
    console.log(result)
    return(
        <div className="p-20">
            <h4>수정페이지</h4>
            <form action="/api/post/modify" method="POST">
                <input type="hidden" name='id' defaultValue={result._id.toString()}></input>
                <input name="title" placeholder="글제목" defaultValue={result.title} />
                <input name="content" placeholder="글내용" defaultValue={result.content}/>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}