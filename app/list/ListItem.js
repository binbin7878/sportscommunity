'use client'

import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"



export default function ListItem({ result }) {

    return (
        <div>
            {
                result.map((a, i) => {
                    return (
                        <div className="list-item" key={i}>
                            <Link href={'/detail/' + a._id}><h4>{a.title}</h4></Link>
                            <Link href={'/edit/' + a._id}>✍️</Link>
                            <span onClick={(e) => {
                                fetch('/api/delete/delete',
                                    {
                                        method: 'DELETE',
                                        body: a._id
                                    }
                                )
                                    .then((r) => {
                                        if (r.status == 200) {
                                            return r.json()

                                        }else if(r.status==500){
                                            return r.json()
                                        } 
                                        else {
                                            //서버가 에러코드전송시 실행할코드
                                        }
                                    })
                                    .then((result) => {
                                        console.log(result)
                                        if(result=='삭제완료'){
                                            e.target.parentElement.style.opacity = 0;
                                            setTimeout(() => {
                                                e.target.parentElement.style.display = 'none'
                                            }, 1000)
                                        }
                                        
                                        //성공시 실행할코드
                                    }).catch((error) => {
                                        //인터넷문제 등으로 실패시 실행할코드
                                        console.log(error)
                                    })
                            }}>🗑️</span>
                            <p>{a.content}</p>
                        </div>

                    )
                })
            }
        </div>
    )


}