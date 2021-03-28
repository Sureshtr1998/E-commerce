import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
    return (
        <>
           <Navbar bg="dark" variant='dark' collapseOnSelect>
<Container> 
  <LinkContainer to = '/'> 
  <Navbar.Brand className='py-0'>ProShop</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to = '/cart'> 
      <Nav.Link className='py-0'>
          <i className='pl-10 fas fa-shopping-cart'></i>
      Cart</Nav.Link>
      </LinkContainer>
      <LinkContainer to ='/login'>
      <Nav.Link className='py-0'>
          <i className='fas fa-user'></i>
      Sign In</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}

export default Header
