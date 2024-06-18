import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Like from "./like"
import Comment from "./comment"
import ListItem from "./ListItem"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { user } from "@nextui-org/react"
import ImgShow from './imgShow'
import { Container, Divider } from "@mui/material"

export default async function Detail(props) {


    const db = (await connectDB).db("nextforum")
    let result = await db.collection('post_soccer').findOne({ _id: new ObjectId(props.params.id) })
    console.log(props.params)
    console.log('result', result)
    let session = await getServerSession(authOptions)

    const user = session.user.email


    let imgsrcArray = [];
    try {
        imgsrcArray = JSON.parse(result.filesrc);
    } catch (error) {
        console.error("Failed to parse filesrc:", error);
    }



    return (
        <div style={{ margin: '5rem' }}>



            <h4>상세페이지</h4>

            <Divider component={'div'}></Divider>
            <div style={{textAlign:'right',marginLeft:'79rem'}}>
                {
                    user == result.author ? <div style={{listStyleType:'none'}}><ListItem result={result}></ListItem></div> : ''
                }
            </div>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <div className="img-container">
                <ImgShow imgsrc={imgsrcArray} imgname={result.filename}></ImgShow>
            </div>
            <br></br>
            <Like parentid={props.params.id}></Like>
            <br></br>
            <span style={{fontSize:'15px'}}>작성 시간 : <a style={{fontSize:'13px'}}>{result.postAt}</a></span>
            <br></br>
            <br></br>
            <Comment _id={result._id.toString()}></Comment>




        </div>
    )
}