import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
                <>
                    <li className="nav-item">
                        <Link to="/my_blogs">My Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" onClick={this.props.signoutUser}>Sign out</Link>
                    </li>
                </>
            )
        } else {
            // show a link to sign in or sign up
            return (
                <>
                    <li className="nav-item" key={1}>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item" key={2}>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </>

            )
        }
    }

    render() {
        return (
            <nav className="main-nav overlay clearfix">
                <a class="blog-logo" href="/">
                </a>
                <ul id="menu">
                    <li class="nav-home nav-current" role="presentation">
                        <Link to="/">Home</Link>
                    </li>
                    <li class="nav-home nav-current" role="presentation">
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    {this.renderLinks()}
                    <span class="socialheader">
                        <a href="#"><span class='symbol'>circletwitterbird</span></a>
                        <a href="#"><span class='symbol'>circlefacebook</span></a>
                        <a href="#"><span class='symbol'>circlegoogleplus</span></a>
                        <a href="mailto:wowthemesnet@gmail.com"><span class='symbol'>circleemail</span></a>
                    </span>
                </ul>
            </nav>
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