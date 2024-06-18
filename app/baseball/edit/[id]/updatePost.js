'use client'



import toastAlert from "@/app/toast";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Col, Image, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




function modal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Do not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={router.push('/login')}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}



export default function UpdatePost(props) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        router.push('/login');
    }
    

    // function handleShow(){
    //     setShow(true)
    // }

    useEffect(() => {
        fetch('/api/get/session').then(r => r.json())
            .then(result => {
                if (result == '로그인 안함') {
                    setShow(true)
                    // window.alert('로그인부터 해주세요!')
                    // router.push('/login')
                }


            })
    }, [])

    const [uploadedFiles, setUploadedFiles] = useState([]);
    let [src, setSrc] = useState([])

    
    function FluidExample() {
        return (
            <div>
                {src.map((url, index) => (
                    <Image key={index} src={url} fluid />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="p-20">


                {/* <form action="/api/post/write" method="POST">
                    <input name="title" placeholder="글제목" />
                    <input name="content" placeholder="글내용" />
                    <Button variant="dark" type="submit">글쓰기</Button>
                    
                </form> */}
                
                <Form action='/api/baseball/modify' method="POST">
                <input type="hidden" name='id' defaultValue={props._id}></input>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>글제목</Form.Label>
                        <Form.Control type="text" placeholder="title" name="title" defaultValue={props.title}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>글내용</Form.Label>
                        <Form.Control as="textarea" rows={15} name="content" defaultValue={props.content}/>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>첨부파일</Form.Label>
                        <Form.Control type="file" multiple name="filename" accept="image/*"
                        onChange={async (e) => {
                                
                                    

                            let files = Array.from(e.target.files);
                            let newSrcs = [];

                        for (let file of files) {
                            let filename = encodeURIComponent(file.name);
                            let res = await fetch('/api/post/image?file=' + filename);
                            res = await res.json();

                            const formData = new FormData();
                            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                                formData.append(key, value);
                            });

                            let uploadResult = await fetch(res.url, {
                                method: 'POST',
                                body: formData,
                            });

                            if (uploadResult.ok) {
                                newSrcs.push(res.url + '/' + filename);
                            } else {
                                console.log('업로드 실패');
                            }
                        }

                        setSrc((prevSrc) => [...prevSrc, ...newSrcs]);
                        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
                        

                    }}/>
                    </Form.Group>
                    {FluidExample()}
                    <Form.Control type="hidden" name="filesrc" value={JSON.stringify(src)}/>
                    <Button variant="dark" type="submit">수정</Button>
                </Form>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
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
                    <Button variant="primary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>




        </div>

    )
}


// 'use client';

// export default function UpdatePost(props) {
//     console.log("UpdatePost props:", props);
//     return (
//         <div>
//             <h4>Update Post Form</h4>
//             <p>Title: {props.title}</p>
//             <p>Content: {props.content}</p>
//         </div>
//     );
// }