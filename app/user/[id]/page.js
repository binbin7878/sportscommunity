'use client'

import * as React from 'react'
import { Nav, Tab, Tabs, Form, Row, Col, Button } from "react-bootstrap"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect,useState } from 'react';
import { Result } from 'postcss';



export default function User() {
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo,setUserInfo]=useState({})
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(()=>{
        fetch('/api/get/userInfo')
        .then((r) => {
            if (r.status == 200) {
                return r.json()

            }else if(r.status==500){
                return r.json()
            } 
            else {
                //서버가 에러코드전송시 실행할코드
            }
        })
        .then((result) => {
            
            console.log(result)
            setUserInfo(result)
            
            
            //성공시 실행할코드
        }).catch((error) => {
            //인터넷문제 등으로 실패시 실행할코드
            console.log(error)
        })

    },[])

    console.log('userinfo',userInfo)
    
    return (
        <>
            <Row className='mb-9'>
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    {/* <Box sx={{ '& > :not(style)': { m: 1 } }}>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="닉네임" variant="standard" fullWidth />
                        </Box>
                    </Box> */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-required" label="닉네임" variant="standard" fullWidth 
                        defaultValue={userInfo.userid+''}/>
                    </Box>

                </Col>
            </Row>
            <Row className='mb-9'>
                <Col xs={12} md={6} lg={4} className="mx-auto">

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Email" variant="standard" fullWidth placeholder='abc@example.com'
                        defaultValue={userInfo.email+''}/>
                    </Box>
                </Col>
            </Row>
            <Row className='mb-9'>
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    {/* <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        영문, 숫자, 특수문자 포함 8자 이상 입력해주세요
                    </Form.Text> */}
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            // defaultValue={userInfo.password+''}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Col>
            </Row>
            <br></br>
            <Row className='mb-9'>
                <Col xs={12} md={6} lg={4} className="mx-auto text-center">

                    <Button variant='dark'>수정하기</Button>
                </Col>
            </Row>
        </>
    )
}