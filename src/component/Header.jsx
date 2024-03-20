import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import { CgNotes } from "react-icons/cg";
function Header() {
    
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let navigate=useNavigate();
    let logout=useLogout();
  return (
    <Navbar expand="md" className="bg-body-tertiary" style={{backgroundColor:"#F5F5F5"}}>
    <Container>
      <Navbar.Brand ><h3 className='ml-2' style={{color:'navy'}}><CgNotes color='navy' size={24} className='mb-1 mx-2'/>Notes App</h3> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto mb-1 ">
          <Nav.Link onClick={()=>navigate('/dashboard')}>Home</Nav.Link>
          <Nav.Link onClick={()=>navigate('/create')}>Create Note</Nav.Link>
        </Nav>
        <Nav>
            <Nav.Item><h4>{`${userData.name}`}</h4></Nav.Item>
            &nbsp; &nbsp;
            <Nav.Item onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header