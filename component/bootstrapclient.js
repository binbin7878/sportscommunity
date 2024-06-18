'use-client'

import { Navbar,Nav,Container } from "react-bootstrap"
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BootStrapNav(){
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}