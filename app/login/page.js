'use client'

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signIn, getProviders } from 'next-auth/react';
import Link from 'next/link';
import { Container, Grid, Box } from '@mui/material';
import { Button } from 'react-bootstrap';





export default function Login() {

    const [hidePassword, setHidePassword] = useState(true);

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }//비밀번호 보이게
    const toggleSetEyes = () => {
        setEyes(!eyes);
    }//눈모양변환
    const [eyes, setEyes] = useState(true)

    let [alert, alertChange] = useState(Alert())

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await fetch('/api/auth/providers');
            const data = await res.json();
            setProviders(data);
        };
        fetchProviders();
    }, []);

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSubmit = async () => {
        // console.log(emailRef.current)
        // console.log(passwordRef.current)

        const result = await signIn("credentials", {
            email: emailRef.current,
            password: passwordRef.current,
            redirect: true,
            callbackUrl: "/",
        });
    }

    const getProviderClass = (providerId) => {
        switch (providerId) {
            case 'kakao':
                return 'kakao';
            case 'naver':
                return 'naver';
            default:
                return '';
        }
    };









    return (
        <div className="page">
            {/* Title Wrap*/}
            <div className="titleWrap">

            </div>

            {/* contentWrap - 이메일 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    아이디
                </div>
                <div className="inputWrap">
                    <input className="input"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                alertChange('')
                                emailRef.current = e.target.value
                            } else {
                                alertChange(Alert())
                            }
                        }} placeholder="아이디"
                        ref={emailRef}
                        id='email'
                        name='email'></input>
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            {alert}

            <div className="contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input className="input" type={hidePassword ? "password" : "text"}
                        id='password'
                        name='password'
                        placeholder="비밀번호"
                        ref={passwordRef}
                        onChange={(e) => {
                            passwordRef.current = e.target.value
                        }}
                    ></input><FontAwesomeIcon icon={eyes ? faEye : faEyeSlash} onClick={() => {
                        toggleHidePassword(false)
                        toggleSetEyes(false)


                    }} />
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            <div className="errorMessageWrap">
                <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>

            </div>

            <br></br>
            <div>
                <button className="bottomButton"
                    onClick={handleSubmit}>
                    로그인</button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                회원이 아니신가요?/<Link href={'/signup'}>회원가입 ㄱㄱ</Link>
            </div>
            <br></br>
            <div className='loginButtonContainer'>
                <Container style={{ marginTop: '2rem' }}>
                    <Grid container spacing={4}  justifyContent={'space-between'}>
                    
                        
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems='center' justifyContent={'flex-start'}>
                                    <Button
                                        className={`provider-button ${getProviderClass('naver')}`}
                                        onClick={() => signIn('naver')}
                                    >
                                        <img src='/btn_naver.svg' alt='Naver logo'/>
                                        <span style={{ marginLeft: '2rem' }}>로그인</span>
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center" justifyContent={'flex-end'}>
                                    <Button
                                        className={`provider-button ${getProviderClass('kakao')}`}
                                        onClick={() => signIn('kakao')}
                                    >
                                        <img src='/btn_kakao.svg' alt='Kakao logo'/>
                                        <span style={{ marginLeft: '2rem' }}>로그인</span>
                                    </Button>
                                </Box>
                            </Grid>
                        
                    
                    </Grid>

                    
                </Container>
            </div>


            {console.log('프로바이더', providers && Object.values(providers))}








        </div>
    )


    function Alert() {
        return (
            <div className="errorMessageWrap">
                <div>아이디를 입력해주세요</div>
            </div>
        )
    }


}

