import React from 'react'
import { Link } from 'react-router-dom'
import background from '../assets/background.jpg'

var sectionStyle = {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}  

const Welcome = () => (
    <>
        <header class="main-header " style={sectionStyle}>
            <div class="vertical">
                <div class="main-header-content inner">
                    <h1 class="page-title">Fashion Critiques</h1>
                    <div class="entry-title-divider">
                        <span></span><span></span><span></span>
                    </div>
                    <h2 class="page-description">Thoughts, reviews and ideas since 1999.</h2>
                </div>
            </div>
            <a class="scroll-down icon-arrow-left" href="#content" data-offset="-45"><span class="hidden">Scroll Down</span></a>
        </header>

        { /*Example row of columns*/}
        <div className="row text-justify">
            <div className="col-md-4">
                <h2>Front-end</h2>
                <p>The front-end client is built as a simple-page-application using React and Redux (for middlewares and reducers). Besides, React-Router is used for navigation. Redux-Thunk is used for processing asynchronous requests. Bootstrap 4 is used for page styling.</p>
            </div>
            <div className="col-md-4">
                <h2>Back-end</h2>
                <p>The back-end server is built with Express.js and Node.js in MVC pattern, which provides completed REST APIs for data interaction. Passport.js is used as an authentication middleware in the sever. JSON Web Token (JWT) is used for signing in user and making authenticated requests.</p>
            </div>
            <div className="col-md-4">
                <h2>Database</h2>
                <p>MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Post and Comment). Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).</p>
            </div>
        </div>
    </>
)

export default Welcome