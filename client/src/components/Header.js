import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown, Image, Container } from 'react-bootstrap'
import { verifyJwt, signoutUser } from '../actions/userActions'
import logo from '../assets/logo.jpg'

class Header extends Component {
    componentWillUnmount() {
        if (this.props.authenticated && !this.props.user) {
            this.props.verifyJwt()          // fetch username
        }
    }

    renderLinks() {
        if (this.props.authenticated) {
            // show a dropdown menu for authenticated user
            return (
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/my_blogs">My Blogs</NavDropdown.Item>
                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link to="/" onClick={this.props.signoutUser}>Sign out</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            // show a link to sign in or sign up
            return (
                <>
                    <Nav.Link href="/signin">Sign in</Nav.Link>
                    <Nav.Link eventKey={2} href="/signup">
                        Sign Up
                    </Nav.Link>
                </>

            )
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <Image src={logo} roundedCircle height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            {this.renderLinks()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.username,
    }
}

export default connect(mapStateToProps, { verifyJwt, signoutUser })(Header)