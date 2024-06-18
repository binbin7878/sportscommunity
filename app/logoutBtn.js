'use client'

import {signOut} from 'next-auth/react'
import Button from 'react-bootstrap/Button';

export default function LogoutBtn(){
    return(
        <Button onClick={()=>{signOut()}} variant='dark'>로그아웃</Button>
        // <button onClick={()=>{signOut()}}>로그아웃</button>
    )
}