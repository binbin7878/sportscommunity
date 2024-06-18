


import { connectDB } from "../../util/database"
import Link from "next/link"
import DetailLink from "./DetailLink"
import ListItem from "./ListItem"


export const dynamic='force-dynamic'//항상 다이나믹 렌더링


export default async function List() {
    const db = (await connectDB).db("nextforum")
    let result = await db.collection('post').find().toArray()
    result=result.map((a)=>{
        a._id=a._id.toString()
        
        return a

    })

    return (
        <div className="list-bg">
            <ListItem result={result}></ListItem>
        </div>
    )
}

//여러페이지 만드려면 [dynamic route]
//현재 ul이 뭔지 궁금하면 props/useRouter
//페이지 이동,prefetch 등은 useRouter