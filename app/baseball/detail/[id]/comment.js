'use client'

import { useEffect, useState } from "react"

import { Avatar } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { CloseButton, Spinner, FloatingLabel, Form, Button, Placeholder } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material"




const notify = (a) => toast.error(a);

function BorderExample() {
    return <Spinner animation="border" />;
}


export default function Comment(props) {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const [addComment, setAddComment] = useState('')
    const [session, setSession] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [likeCount, setLikeCount] = useState([])
    const [hateCount, setHateCount] = useState([])
    const [open, setOpen] = useState(false)
    const [alerttype, setAlertType] = useState('')
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        handleClick2()
    }, [alerttype])
    const handleClick2 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


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
                console.log('get comment결과:', result)
                console.log('comment결과', comment)
                setCommentList(result)


            })
    }, [props._id])



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

    const notify = (a) => toast.error(a);
    const alert = (a) => toast.success(a)





    // useEffect(() => {
    //     console.log('commentlist:', commentList)

    //     fetch('/api/get/commentlike?commentid=' + commentList._id).then(r => r.json())
    //         .then(result => {

    //             console.log('좋아요결과get:', result)

    //             setLikeCount(result)

    //         })
    // }, [commentList])

    useEffect(() => {
        const fetchLikeCounts = async () => {
            const newLikeCounts = await Promise.all(commentList.map(async (comment, i) => {
                const response = await fetch('/api/get/commentlike?commentid=' + commentList[i]._id);
                const result = await response.json();
                return { commentId: comment._id, likeCount: result };
            }));
            setLikeCount(newLikeCounts);
        };

        fetchLikeCounts();
    }, [commentList]);

    console.log('commentlist:', commentList);
    console.log('likeCounts:', likeCount);

    useEffect(() => {
        const fetchHateCounts = async () => {
            const newHateCounts = await Promise.all(commentList.map(async (comment, i) => {
                const response = await fetch('/api/get/commenthate?commentid=' + commentList[i]._id);
                const result = await response.json();
                return { commentId: comment._id, hateCount: result };
            }));
            setHateCount(newHateCounts);
        };

        fetchHateCounts();
    }, [commentList]);

    console.log('commentlist:', commentList);
    console.log('hateCounts:', hateCount);



    // useEffect(() => {
    //     fetch('/api/get/commenthate?commentid=' + commentList._id).then(r => r.json())
    //         .then(result => {
    //             console.log('싫어요결과get:', result)
    //             setHateCount(result)

    //         })
    // }, [commentList])

    return (

        <div>
            <div>

                <h2 className="commentTitle">댓글창</h2>

                <div class="bg-slate-300 my-4 w-full h-[2px]"></div>                {
                    commentList.length > 0 ?
                        commentList.map((a, i) => {

                            return (
                                <div>
                                    <div className="commentList">
                                    <a key={i}>{a.content} 
                                        
                                        <div >
                                        <span style={{fontSize:'12px',textAlign:'right'}}>{a.commentat}</span>
                                        <span style={{marginLeft:'1rem'}}>{a.author}</span>
                                        </div>
                                        
                                        </a>
                                        {
                                            session == a.author ?

                                                <CloseButton className='deleteComment' onClick={(e) => {
                                                    console.log(e.target.value)
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
                                                                console.log(e.target.parentElement.value)
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
                                                }} /> : ''
                                        }
                                        <ToastContainer autoClose={2000} />
                                        <div className="commentReactions">
                                            <span className='like' onClick={(e) => {
                                                console.log('좋아요 보냄클릭:', props._id, a._id)
                                                fetch('/api/post/commentheart',
                                                    {
                                                        method: 'POST',
                                                        body:
                                                            JSON.stringify({
                                                                postid: props._id,
                                                                commentid: a._id

                                                            }),
                                                    }
                                                )
                                                    .then(r => r.json())
                                                    .then(result => {
                                                        console.log(result)
                                                        if (result == '로그인안함') {

                                                            notify('로그인부터 해주세요!');
                                                        } else if (result.msg == '좋아요취소') {

                                                            setLikeCount(likeCount.map((item) =>
                                                                item.commentId === a._id ?
                                                                    { ...item, likeCount: JSON.parse(result.like) } : item))
                                                            handleClick2()
                                                            setSeverity('success')
                                                            setAlertType('좋아요취소')
                                                        }
                                                        else if (result.msg == '좋아요') {
                                                            setLikeCount(likeCount.map((item) =>
                                                                item.commentId === a._id ?
                                                                    { ...item, likeCount: JSON.parse(result.like) } : item))

                                                            handleClick2()
                                                            setSeverity('success')
                                                            setAlertType('좋아요b')
                                                        }

                                                    })
                                            }}>👍
                                                {/* {likeCount.length > 0 ? likeCount[i].likeCount : 0 } */}
                                                {likeCount.find(item => item.commentId === a._id)?.likeCount || 0}
                                                </span>

                                            <span className="hate" onClick={(e) => {

                                                fetch('/api/post/commenthate',
                                                    {
                                                        method: 'POST',
                                                        body:
                                                            JSON.stringify({
                                                                postid: props._id,
                                                                commentid: a._id

                                                            }),
                                                    }
                                                )
                                                    .then(r => r.json())
                                                    .then(result => {
                                                        if (result == '로그인안함') {

                                                            notify('로그인부터 해주세요!');
                                                        } else if (result.msg == '싫어요취소') {
                                                            setHateCount(hateCount.map((item) =>
                                                                item.commentId === a._id ?
                                                                    { ...item, hateCount: JSON.parse(result.like) } : item))
                                                            handleClick2()
                                                            setSeverity('info')
                                                            setAlertType('싫어요 취소')

                                                        }
                                                        else if (result.msg == '싫어요') {
                                                            setHateCount(hateCount.map((item) =>
                                                                item.commentId === a._id ?
                                                                    { ...item, hateCount: JSON.parse(result.like) } : item))
                                                            handleClick2()
                                                            setSeverity('info')
                                                            setAlertType('싫어요ㅠ')

                                                        }

                                                    })
                                            }}>👎
                                            {/* { hateCount.length > 0 ? hateCount[i].hateCount : 0 } */}
                                            {hateCount.find(item => item.commentId === a._id)?.hateCount || 0}
                                            </span>
                                        </div>
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
                                            console.log('result2:',result2)
                                            setCommentList(result2)
                                            setLikeCount(prev => [...prev, { commentId: result2[result2.length - 1]._id, likeCount: 0 }]);
                                            setHateCount(prev => [...prev, { commentId: result2[result2.length - 1]._id, hateCount: 0 }])
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

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {alerttype}
                </Alert>
            </Snackbar>
        </div>


    )
}