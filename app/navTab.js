'use client'

import { Nav, Tab, Tabs } from "react-bootstrap"
import MainPost from "./mainpost"
import Soccer from "./soccer/page"
import { useState, useEffect } from "react"
import { Result } from "postcss"


const NavTab = ({ onSelectTab, selectedTab }) => {
  return (
    
    <Nav fill variant="tabs" activeKey={selectedTab} onSelect={onSelectTab} style={{margin:'3rem'}}>
      <Nav.Item>
        <Nav.Link eventKey='soccer'>Soccer ⚽</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="baseball">Baseball ⚾</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="basketball">Basketball 🏀</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="freeboard" >
          자유게시판 🗽
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavTab;

// export default function NavTab(){
//   return(
//     <Nav fill variant="tabs" defaultActiveKey="/home">
//     <Nav.Item>
//       <Nav.Link href="/home">Active</Nav.Link>
//     </Nav.Item>
//     <Nav.Item>
//       <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
//     </Nav.Item>
//     <Nav.Item>
//       <Nav.Link eventKey="link-2">Link</Nav.Link>
//     </Nav.Item>
//     <Nav.Item>
//       <Nav.Link eventKey="disabled" disabled>
//         Disabled
//       </Nav.Link>
//     </Nav.Item>
//   </Nav>
//   )
// }




    

    //     <Tabs
    //   defaultActiveKey="profile"
    //   id="fill-tab-example"
    //   className="mb-3"

    //   fill
    // >
    //   <Tab eventKey="Soccer" title="Soccer ⚽" style={{color:'black'}}
    //   onClick={()=>{}} 
    //   >


    //   </Tab>
    //   <Tab eventKey="Baseball" title="Baseball ⚾" style={{color:'black'}}>
    //     Tab content for Profile
    //   </Tab>
    //   <Tab eventKey="Basketball" title="Basketball 🏀" style={{color:'black'}}>
    //     Tab content for Loooonger Tab
    //   </Tab>
    //   <Tab eventKey="board" title="자유게시판 🗽" style={{color:'black'}}>
    //     Tab content for Contact
    //   </Tab>
    // </Tabs>




    // <Nav justify variant="tabs" defaultActiveKey="/">
    //     <Nav.Item>
    //         <Nav.Link eventKey="/soccer" style={{color:'black'}}>Soccer ⚽</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //         <Nav.Link eventKey="/baseball" style={{color:'black'}}>Baseball ⚾</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //         <Nav.Link eventKey="/basketball" style={{color:'black'}}>Basketball 🏀</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //         <Nav.Link eventKey="/board" style={{color:'black'}}>
    //             자유게시판 🗽
    //         </Nav.Link>
    //     </Nav.Item>
    // </Nav>
