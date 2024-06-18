import Image from "next/image";
import styles from "./page.module.css";
import { MongoClient } from "mongodb";
import { connectDB } from "../util/database";
import Link from "next/link";
import TabContent from "../component/TabContent";
import NavTab from "./navTab";
import { Nav } from "react-bootstrap";
import Soccer from "./apitest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import UserCheck from './userCheck'
import { User } from "@nextui-org/react";


const db = (await connectDB).db("nextforum")
let result = await db.collection('post').find().toArray()
console.log(result)

let session = await getServerSession(authOptions)


// result.map((a,i)=>{
//   posts=[
//     {
//       id: result[i]._id,
//       title: result[i].title,
//       href: '#',
//       description:
//         result[i].content,
//       date: 'Mar 16, 2020',
//       datetime: '2020-03-16',
//       category: { title: 'Marketing', href: '#' },
//       author: {
//         name: 'Michael Foster',
//         role: 'Co-Founder / CTO',
//         href: '#',
//         imageUrl:
//           'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       },

//     }
//   ]
// })

export default async function Home(props) {
  

  return (
    
    
    <div>
      
      {/* {!session?<UserCheck/>:''} */}
      
      <Soccer></Soccer>
      
      
        <div>{props.title}</div>
        
        
        
        
      
    </div>

  );
}
