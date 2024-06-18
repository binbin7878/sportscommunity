'use client'

import { useEffect, useState } from "react"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import toastAlert from "@/app/toast"
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material"
import { useRouter } from "next/navigation"
import { Modal,Button } from "react-bootstrap"



export default function Like(props) {

    const router = useRouter();
    const [show, setShow] = useState(false);

    const handleLoginClose = () => {
        setShow(false);
        router.push('/login');
    }

    const [open, setOpen] = useState(false)
    const [alerttype,setAlertType]=useState('')
    const [severity,setSeverity]=useState('')
    useEffect(()=>{
        handleClick()
    },[alerttype])
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const notify = (a) => toast.error(a);
    const alert = (a) => toast.success(a)

    let [likeCount, setLikeCount] = useState(0)
    let [hateCount, setHateCount] = useState(0)

    useEffect(() => {
        fetch('/api/get/postlike?id=' + props.parentid).then(r => r.json())
            .then(result => {
                console.log(result)
                setLikeCount(result)

            })
    }, [])
    useEffect(() => {
        fetch('/api/get/posthate?id=' + props.parentid).then(r => r.json())
            .then(result => {
                console.log(result)
                setHateCount(result)

            })
    }, [])

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <span className='like' onClick={(e) => {

                fetch('/api/post/postHeart',
                    {
                        method: 'POST',
                        body: props.parentid
                    }
                )
                    .then(r => r.json())
                    .then(result => {
                        if (result == '로그인안함') {

                            setShow(true)
                        } else if (result.msg == '좋아요취소') {
                            setLikeCount(JSON.parse(result.like))
                            handleClick()
                            setSeverity('success')
                            setAlertType('좋아요취소')
                        }
                        else if (result.msg == '좋아요') {
                            setLikeCount(JSON.parse(result.like))
                            handleClick()
                            setSeverity('success')
                            setAlertType('좋아요~')
                        }

                    })
            }}>👍
                {
                    likeCount > 0 ?
                        likeCount : 0
                }</span>
            <span className="hate" onClick={(e) => {

                fetch('/api/post/postHate',
                    {
                        method: 'POST',
                        body: props.parentid
                    }
                )
                    .then(r => r.json())
                    .then(result => {
                        if (result == '로그인안함') {

                            setShow(true)
                        } else if (result.msg == '싫어요취소') {
                            setHateCount(JSON.parse(result.like))
                            setSeverity('info')
                            setAlertType('싫어요 취소')
                        }
                        else if (result.msg == '싫어요') {
                            setHateCount(JSON.parse(result.like))
                            setSeverity('info')
                            setAlertType('싫어요ㅠ')
                        }

                    })
            }}>👎{
                    hateCount > 0 ?
                        hateCount : 0
                }</span>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {alerttype}
                </Alert>
            </Snackbar>

            <Modal
                show={show}
                onHide={handleLoginClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>로그인 필요</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    로그인을 먼저 해주세요.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleLoginClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}