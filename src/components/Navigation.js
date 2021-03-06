import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { SignOut } from '../store/modules/auth/actions/authAction';
import Default from '../assets/default.png'
import './Navigation.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false)

  const currentState = useSelector((state) => state);
  
  const { isAuthenticated, currentUser } = currentState.Auth;

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());



  let imagePreview = (<img className="img_style_nav" src={Default} alt="profile 2"/>);

  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }
  console.log(currentState)
  const userProfile = isAuthenticated ?  `/profile/${currentUser.id}` : ""

  const SignedInLinks = (
              <React.Fragment>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    {currentUser.isAdmin ? (
                        <NavLink to="/createtopic">
                            Create Topic
                        </NavLink>
                    ) : null}

                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {imagePreview}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink to={userProfile}>Profile</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <a onClick={logout}>Logout</a>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </React.Fragment>

            )

  const SignedOutLinks = (
                <React.Fragment>
                  <NavItem style={{marginRight: "20px" }}>
                    <Link to='/login'>Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/registration'>Signup</Link>
                  </NavItem>
                </React.Fragment>
              )


  return (
    <div className="mb-3">
      <Navbar color="light" light expand="md">
        <NavbarBrand className="mx-auto" href="/"><span style={{ fontWeight: "bold"}}>GirlForum</span></NavbarBrand>
        
        <NavbarToggler onClick={() => setIsOpen(!isOpen) } /> 
        <Collapse isOpen={isOpen} navbar> 
          <Nav className="ml-auto" navbar>
            { isAuthenticated ? SignedInLinks: SignedOutLinks }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation
