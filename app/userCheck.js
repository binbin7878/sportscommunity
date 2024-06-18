'use client'

import { Modal, Button } from "react-bootstrap"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserCheck() {

    const router = useRouter();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        router.push('/login');
    }

    return (
        <div>
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