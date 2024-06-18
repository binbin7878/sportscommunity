'use client'

import { useEffect, useState } from "react"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import toastAlert from "@/app/toast"





export default function Like(props){
    const notify=(a)=>toast.error(a);

    let[likeCount,setLikeCount]=useState()

    useEffect(() => {
        fetch('/api/get/postlike?id=' + props.parentid).then(r => r.json())
            .then(result => {
                console.log(result)
                setLikeCount(result)

            })
    }, [])

    return(
        <div>
            <ToastContainer autoClose={2000}/>
            <span className='like'onClick={(e)=>{
                
                fetch('/api/post/postHeart',
                    {
                        method:'POST',
                        body:props.parentid
                    }
                )
                .then(r=>r.json())
                .then(result=>{
                    if(result=='좋아요이미함'){
                        notify('이미 좋아요 했어요!');
                        console.log(result)
                    }else if(result=='0'){                                  
                        notify('로그인부터 해주세요!');

                    }
                    
                    else{
                        setLikeCount(JSON.parse(result))
                    }
                    
                })
            }}>👍
            {
                    likeCount > 0 ?
                        likeCount: 0
                }</span>
            <span>👎<b></b></span>
            
        </div>

    )
}