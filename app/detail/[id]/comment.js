'use client'

import { useEffect, useState } from "react"

import { Avatar } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { CloseButton ,Spinner, FloatingLabel, Form, Button, Placeholder } from "react-bootstrap";






const notify = (a) => toast.error(a);

function BorderExample() {
    return <Spinner animation="border" />;
}


export default function Comment(props) {
    let [comment, setComment] = useState('')
    let [commentList, setCommentList] = useState([])
    let [addComment, setAddComment] = useState('')
    const [session, setSession] = useState('')



    useEffect(() => {
        fetch('/api/get/session').then(r => r.json()).then(
            result => {
                setSession(result)
            }
        )
    }, [])

    useEffect(() => {
        fetch('/api/get/comment?id=' + props._id).then(r => r.json())
            .then(result => {
                console.log(result)
                setCommentList(result)

            })
    }, [])

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise((resolve) => setTimeout(resolve, 2000));
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    // let session=await getServerSession(authOptions)
    return (

        <div>
            <div>

                <h2 className="commentTitle">댓글창</h2>

                <Placeholder xs={12} bg="secondary" size="xs" />
                {
                    commentList.length > 0 ?
                        commentList.map((a, i) => {
                            return (
                                <div>
                                    <div className="commentList">
                                        <p key={i}>{a.content} <span>{a.author}</span></p>
                                        <CloseButton className='deleteComment' onClick={(e) => {
                                            fetch('/api/delete/deletecomment',
                                                {
                                                    method: 'DELETE',
                                                    body: a._id
                                                }
                                            )
                                                .then((r) => {
                                                    if (r.status == 200) {
                                                        return r.json()

                                                    } else if (r.status == 500) {
                                                        return r.json()
                                                    }
                                                    else {
                                                        //서버가 에러코드전송시 실행할코드
                                                    }
                                                })
                                                .then((result) => {
                                                    console.log(result)
                                                    if (result == '삭제완료') {
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
                                        }}></CloseButton>
                                    </div>

                                </div>



                            )
                        }) : '댓글없음'
                }
            </div>
            {/* <input  id="commentInput"></input> */}

            <div class="bg-slate-300 my-4 w-full h-[2px]"></div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar /><span style={{ marginLeft: '8px' }}>
                    {session ? session : '로그인 필요'}
                </span>
            </div>
            <br></br>





            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    onChange={(e) => {
                        setComment(e.target.value)
                        console.log(comment.trim().length)
                    }}
                    id="commentInput"
                />
            </FloatingLabel>
            <br></br>
            {/* <Button onClick={(e) => {
                console.log(comment)
                if (comment.trim().length > 0) {
                    console.log(comment.length)
                    fetch('/api/post/comment', {
                        method: 'POST',
                        body: JSON.stringify({ comment: comment, _id: props._id }),

                    }).then(r => r.json())
                        .then(result => {
                            if (result == '저장완료') {
                                fetch('/api/get/comment?id=' + props._id)
                                    .then(r => r.json())
                                    .then(result2 => {
                                        console.log(result2)
                                        setCommentList(result2)
                                        document.getElementById('commentInput').value = '';
                                    })
                            } else if (result == '로그인 부터 해주세요!') {
                                notify(result)
                            }
                        })
                } else {
                    notify('댓글을 입력 해주세요!')
                }

            }} variant="dark">댓글전송</Button> */}
            <Button
                variant="dark"
                disabled={isLoading}
                onClick={(e) => {
                    !isLoading ? handleClick : null
                    console.log(comment)
                    if (comment.trim().length > 0) {

                        console.log(comment.length)
                        fetch('/api/post/comment', {
                            method: 'POST',
                            body: JSON.stringify({ comment: comment, _id: props._id }),

                        }).then(r => r.json())
                            .then(result => {
                                if (result == '저장완료') {
                                    fetch('/api/get/comment?id=' + props._id)
                                        .then(r => r.json())
                                        .then(result2 => {
                                            console.log(result2)
                                            setCommentList(result2)
                                            document.getElementById('commentInput').value = '';
                                        })
                                } else if (result == '로그인 부터 해주세요!') {
                                    notify(result)
                                }
                            })
                    } else {
                        notify('댓글을 입력 해주세요!')
                    }

                }}

            >
                {isLoading ? '입력중…' : '댓글입력'}
            </Button>
        </div>
    )
}