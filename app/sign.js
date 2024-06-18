'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function Sign() {
    const [hidePassword, setHidePassword] = useState(true);    
    const [eyes, setEyes] = useState(true);
    const [signup, signConfirm] = useState('');
    const [signEmail, signConfirmEmail] = useState('');
    const [id, setId] = useState('');  // 아이디 상태
    const [email, setEmail] = useState('');  // 이메일 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인 상태
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지
    const [buttonState, setButtonState] = useState(0);

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }; // 비밀번호 보이게
    const toggleSetEyes = () => {
        setEyes(!eyes);
    }; // 눈모양변환

    useEffect(() => {
        if (id.length === 0) {
            signConfirm('아이디를 입력해주세요');
        } else {
            signConfirm('');
        }
    }, [id]);

    useEffect(() => {
        if (email.length === 0) {
            signConfirmEmail('이메일을 입력해주세요');
        } else {
            signConfirmEmail('');
        }
    }, [email]);

    useEffect(() => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.length === 0) {
            setPasswordError('비밀번호를 입력해주세요');
        } else if (!passwordRegex.test(password)) {
            setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요');
        } else if (password !== passwordConfirm) {
            setPasswordError('비밀번호가 일치하지 않습니다');
        } else {
            setPasswordError('사용 가능한 비밀번호입니다.');
        }
    }, [password, passwordConfirm]);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleIdDuplicateCheck = (e) => {
        e.preventDefault();
        fetch('/api/post/duplicate', {
            method: 'POST',
            body: JSON.stringify({ id }),  // JSON 형식으로 보내기
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((r) => r.json())
        .then((result) => {
            if (result === '아이디 중복') {
                signConfirm('아이디가 중복됩니다.');
            } else if (result === '가입 가능') {
                signConfirm('사용 가능한 아이디입니다.');
                setButtonState((prevState) => prevState + 1);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailDuplicateCheck = (e) => {
        e.preventDefault();
        fetch('/api/post/duplicateEmail', {
            method: 'POST',
            body: JSON.stringify({ email }),  // JSON 형식으로 보내기
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((r) => r.json())
        .then((result) => {
            if (result === '이메일 중복') {
                signConfirmEmail('이메일이 중복됩니다.');
            } else if (result === '가입 가능') {
                signConfirmEmail('사용 가능한 이메일입니다.');
                setButtonState((prevState) => prevState + 1);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <div className="page">
            {/* Title Wrap */}
            <div className="titleWrap">
                회원가입
            </div>

            {/* contentWrap - 아이디 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    아이디
                </div>
                <div className="inputWrap">
                    <input className="input"
                        onChange={handleIdChange} placeholder="아이디" name='id' value={id}></input>
                    <div className='buttondiv'>
                        <Button variant='dark'
                            onClick={handleIdDuplicateCheck} className='buttonDupConfirm'>중복확인</Button>
                    </div>
                </div>
                <div className="errorMessageWrapID">
                    <div style={{ color: signup === '사용 가능한 아이디입니다.' ? 'green' : 'red' }}>{signup}</div>
                </div>
            </div>

            {/* contentWrap - 이메일 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    이메일
                </div>
                <div className="inputWrap">
                    <input className="input"
                        onChange={handleEmailChange} value={email} placeholder="이메일" name='email'></input>
                    <div className='buttondiv'>
                        <Button variant='dark'
                            onClick={handleEmailDuplicateCheck} className='buttonDupConfirm'>중복확인</Button>
                    </div>
                </div>
                <div className="errorMessageWrapEmail">
                    <div style={{ color: signEmail === '사용 가능한 이메일입니다.' ? 'green' : 'red' }}>{signEmail}</div>
                </div>
            </div>

            {/* contentWrap - 비밀번호 입력 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input className="input" type={hidePassword ? "password" : "text"}
                        onChange={handlePasswordChange} placeholder="비밀번호" name='password' value={password}></input>
                    <FontAwesomeIcon icon={eyes ? faEye : faEyeSlash} onClick={() => {
                        toggleHidePassword();
                        toggleSetEyes();
                    }} />
                </div>
                {/* <div className="errorMessageWrap">
                    <div style={{ color: passwordError === '사용 가능한 비밀번호입니다.' ? 'green' : 'red' }}>{passwordError}</div>
                </div> */}
            </div>

            {/* contentWrap - 비밀번호 확인 */}
            <div className="contentWrap">
                <div className="inputTitle">
                    비밀번호 확인
                </div>
                <div className="inputWrap">
                    <input className="input" type={hidePassword ? "password" : "text"}
                        onChange={handlePasswordConfirmChange} placeholder="비밀번호 확인" name='passwordconfirm' value={passwordConfirm}></input>
                    <FontAwesomeIcon icon={eyes ? faEye : faEyeSlash} onClick={() => {
                        toggleHidePassword();
                        toggleSetEyes();
                    }} />
                </div>
                <div className="errorMessageWrap">
                    <div style={{ color: passwordError === '사용 가능한 비밀번호입니다.' ? 'green' : 'red' }}>{passwordError}</div>
                </div>
            </div>

            <Button variant="dark" type='submit' style={{ marginTop: '2rem' }} disabled={passwordError !== '사용 가능한 비밀번호입니다.'}>
                회원가입
            </Button>
        </div>
    );
}
