'use client'
import { TextField, Divider, Container, Button, IconButton } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { FloatingLabel, Form, FormControl } from "react-bootstrap";
import { use, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";


export default function Comment(props) {

    const router = useRouter()

    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState('')
    const [newComment, setNewComment] = useState([])
    const [user, getUser] = useState('')

    useEffect(() => {
        fetch('/api/get/session')
            .then((r) => r.json())
            .then((result) => {
                getUser(result)
            })
    }, [props.postid])

    useEffect(() => {
        fetch('/api/market/get_comment?parent_id=' + props.postid).then((r) => r.json())
            .then((result) => {
                console.log('commentlist', result)
                setCommentList(result)
            })
    }, [props.postid])



    return (
        <div>


            <div>
                {commentList.length > 0 ? commentList.map((a, i) => {
                    return (
                        <div className={"comment"+i}>
                            <h5 style={{ color: 'black' }}><a style={{ fontSize: '20px' }}>{a.content}</a></h5>
                            <span style={{ color: 'gray', fontSize: '17px' }}>닉네임 : {a.author}</span><br></br>
                            <a style={{ fontSize: '12px', color: 'gray' }}>{a.comment_at}</a>

                            {
                                user == a.author ? <IconButton aria-label="delete" onClick={(e) => {
                                    if(window.confirm('댓글을 삭제하시겠습니까?')){

                                        fetch('/api/market/delete_comment',{
                                            method:'DELETE',
                                            body:a._id
                                        }).then((r)=>r.json())
                                        .then((result)=>{
                                            if(result=='삭제완료'){
                                                alert('삭제완료!')
                                                router.refresh()
                                            }else{
                                                alert('서버오류!')
                                            }
    
                                        })
                                    }else{
                                        alert('삭제 취소!')
                                    }                                    

                                }}>
                                    <DeleteIcon style={{ justifyContent: 'flex-end', color: 'black' }} />
                                </IconButton> : ''
                            }

                            <Divider component={'div'} style={{ borderColor: 'gray' }}></Divider>

                        </div>
                    )

                }) : ''
                }
            </div>



            <Container style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                <FloatingLabel controlId="floatingTextarea2" label="댓글" style={{ flexGrow: 1 }}>
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '36px', resize: 'none' }}
                        onChange={(e) => {
                            setComment(e.target.value)
                            console.log(comment)

                        }}
                        id="commentInput"
                    />
                </FloatingLabel>

                <Button variant="contained" endIcon={<SendIcon />} style={{ marginLeft: '1rem', color: 'white', borderColor: 'black', backgroundColor: 'black' }}
                    onClick={((e) => {
                        fetch('/api/market/post_comment', {
                            method: 'POST',
                            body: JSON.stringify({ parent_id: props.postid, content: comment })
                        }).then((r) => r.json())
                            .then((result) => {
                                console.log('post result', result)
                                if(result=='저장완료'){
                                    router.refresh()
                                }
                            })

                    })}> 작성하기</Button>
            </Container>
        </div>
    )
}