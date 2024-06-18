'use client'
import * as React from 'react'
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, ImageList, ImageListItem } from "@mui/material"
import { Form, Image, FloatingLabel, Button } from "react-bootstrap";
import { useState,useEffect } from "react";





export const dynamic = 'force-dynamic'//항상 다이나믹 렌더링


export default async function Sell() {


    let [src, setSrc] = useState([])

    const [img, showimg] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([]);
    

    React.useEffect(() => {

    }, [img])
    const [user, getUser] = useState('')

    useEffect(() => {
        fetch('/api/get/session')
            .then((r) => r.json())
            .then((result) => {
                console.log(result)
                getUser(result)
            })
    }, [])



    

    

    return (


        <div className="list-bg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>

            <h4>파세요</h4>
            <Form action={'/api/post/sell'} method='POST'>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <div>
                        <Form.Group>
                            <TextField id="outlined-basic" label="품명" variant="outlined" sx={{ width: '48ch' }} name='title' />
                        </Form.Group>

                    </div>
                    <div>
                        <Form.Group>
                            <FormControl sx={{ m: 1, width: '48ch' }}>
                                <InputLabel htmlFor="outlined-adornment-amount">판매가</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">￦</InputAdornment>}
                                    label="Amount"
                                    name='price'
                                />
                            </FormControl>
                        </Form.Group>


                    </div>
                    <div>
                        <Form.Group>
                            <FloatingLabel controlId="floatingTextarea2" label="내용">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px', width: '48ch' }}
                                    name='content'
                                />
                            </FloatingLabel>
                        </Form.Group>

                    </div>

                    <div style={{ width: '100%', maxWidth: '50ch', marginTop: '1rem' }}>

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>첨부 사진</Form.Label>
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
                            

                        }}

                            />
                        </Form.Group>


                    </div>
                    <div style={{ width: '100%', maxWidth: '50ch', marginTop: '1rem' }}>
                        {/* {FluidExample()} */}
                        <ImageList sx={{ width: 490, height: 450 }} cols={3} rowHeight={164}>
                            {
                                src.map((item, i) => (
                                    <ImageListItem key={item}>
                                        <img
                                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                            alt={i}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </div>
                    <div>
                    
                    <Form.Control type="hidden" name="filesrc" value={JSON.stringify(src)}/>
                    <Form.Control type='hidden' name='author' vlaue={user}/>
                    
                    </div>
                    <div>
                        <Button variant="dark" type='submit'>등록하기</Button>
                    </div>

                </div>
            </Form>

        </div>
    )
}

//여러페이지 만드려면 [dynamic route]
//현재 ul이 뭔지 궁금하면 props/useRouter
//페이지 이동,prefetch 등은 useRouter