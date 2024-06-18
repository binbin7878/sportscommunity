'use client'
import Button from 'react-bootstrap/Button';
import {signIn} from 'next-auth/react'

export default function LoginBtn(){
    return(
        <Button onClick={()=>{signIn()}} variant='dark'>로그인</Button>
        // <button onClick={()=>{signIn()}}>로그인</button>
    )
}