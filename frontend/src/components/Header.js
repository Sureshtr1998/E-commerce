import React from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'
const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler =()=>{
   dispatch(logout())
  }
    return (
<Navbar bg="light" variant='light' collapseOnSelect>
<Container> 
  <LinkContainer to = '/'> 
  <Navbar.Brand className='py-0'><i className='fas fa-home'/> ProShop</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Route render={({history, match}) => <SearchBox match={match} history={history}/>}/>
    <Nav className="ml-auto">    
    <LinkContainer to = '/cart'> 
      <Nav.Link className='py-1.5'>
          <i className='pl-10 fas fa-shopping-cart'></i>
      Cart</Nav.Link>
      </LinkContainer>
      {
      userInfo ? (
        <NavDropdown  title={userInfo.name} id='username'>
        <LinkContainer to ='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
       <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
       </NavDropdown>
      ):
      (
      <LinkContainer to ='/login'>
      <Nav.Link className='py-1.5'>
          <i className='fas fa-user'></i>
      Sign In</Nav.Link>
      </LinkContainer>
      )
      }
      {userInfo && userInfo.isAdmin && (
        <NavDropdown  title='Admin' id='adminmenu'>
        <LinkContainer to ='/admin/userlist'>
        <NavDropdown.Item>Users</NavDropdown.Item>
      </LinkContainer>

      <LinkContainer to ='/admin/productlist'>
        <NavDropdown.Item>Products</NavDropdown.Item>
      </LinkContainer>

      <LinkContainer to ='/admin/orderlist'>
        <NavDropdown.Item>Orders</NavDropdown.Item>
      </LinkContainer>
      
       </NavDropdown>
      )}
        </Nav>
      
  </Navbar.Collapse>
  </Container>
</Navbar>
        
    )
}

export default Header
