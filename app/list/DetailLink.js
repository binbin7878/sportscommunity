'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(){
    let router=useRouter()
    return(
        <button onClick={()=>{
            router.back()
            
        }}>버튼</button>
    )
}//사용안하는중.. 아직 라우터 쓰면 버튼 뒤로가기나 뭐 만들기 가능