'use client'

import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal,Button } from "react-bootstrap";
import { useRouter } from "next/navigation";






export default function ListItem({ result }) {

    const router = useRouter();
    // const [show, setShow] = useState(false);


    const onDelete=()=>{
        if(window.confirm('글을 삭제하시겠습니까?'))
            {
                fetch('/api/delete/delete_soccer',
                    {
                        method: 'DELETE',
                        body: result._id,

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

                            alert('글이 삭제되었습니다!')
                            router.push('/')
                            // e.target.parentElement.style.opacity = 0;
                            // setTimeout(() => {
                            //     e.target.parentElement.style.display = 'none'
                            // }, 1000)
                        }

                        //성공시 실행할코드
                    }).catch((error) => {
                        //인터넷문제 등으로 실패시 실행할코드
                        console.log(error)
                    })
                
            }else{
                alert('취소합니다.')
            }
    }
    // const handleClose = () => {
    //     setShow(false);
    //     router.push('/');
    // }

    useEffect(() => {
        fetch('/api/get/session')
            .then((r) => { if (r.status == 200) { return r.json() } })
            .then((result) => {
                console.log(result)
            })
    }, [])

    return (
        <div>
            {

                <div className="list-item" key={result._id}>
                    {/* <Link href={'/detail/basketball/' + a._id}><h4>{a.title}</h4></Link> */}
                    <Link href={'/soccer/edit/' + result._id}>✍️</Link>
                    {/* <span >🗑️</span> */}
                    <DeleteIcon onClick={(e) => {
                        // fetch('/api/delete/delete_soccer',
                        //     {
                        //         method: 'DELETE',
                        //         body: result._id,

                        //     }
                        // )
                        //     .then((r) => {
                        //         if (r.status == 200) {
                        //             return r.json()

                        //         } else if (r.status == 500) {
                        //             return r.json()
                        //         }
                        //         else {
                        //             //서버가 에러코드전송시 실행할코드
                        //         }
                        //     })
                        //     .then((result) => {
                        //         console.log(result)
                        //         if (result == '삭제완료') {

                        //             setShow(true)
                        //             // e.target.parentElement.style.opacity = 0;
                        //             // setTimeout(() => {
                        //             //     e.target.parentElement.style.display = 'none'
                        //             // }, 1000)
                        //         }

                        //         //성공시 실행할코드
                        //     }).catch((error) => {
                        //         //인터넷문제 등으로 실패시 실행할코드
                        //         console.log(error)
                        //     })
                        onDelete()
                    }}></DeleteIcon>

                </div>


            }

            {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>삭제 완료</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    글이 삭제되었습니다
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )


}