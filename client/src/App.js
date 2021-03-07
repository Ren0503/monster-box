import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import ScrollToTop from './components/ScrollToTop'

import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Authenticated from './pages/Auth/Authenticated'
import Profile from './pages/User/Profile'
import Setting from './pages/User/Setting'
import BlogList from './pages/Blog/BlogList'
import BlogNew from './pages/Blog/BlogNew'
import BlogMine from './pages/Blog/BlogMine'
import BlogDetail from './pages/Blog/BlogDetail'
import BlogAuthor from './pages/Blog/BlogAuthor'

function App() {
    return (
        <Router>
            <div className="site-wrapper">
                <Header />
                    <ScrollToTop>
                        <Switch>
                            <Route exact path='/' component={Welcome} />
                            <Route path='/signin' component={SignIn} />
                            <Route path='/signup' component={SignUp} />
                            <Route path="/profile" component={Authenticated(Profile)} />
                            <Route path="/settings" component={Authenticated(Setting)} />
                            <Route exact path='/blogs' component={BlogList} />
                            <Route path='/blogs/new' component={Authenticated(BlogNew)} />
                            <Route path='/blogs/:id' component={BlogDetail} />
                            <Route path='/my_blogs' component={Authenticated(BlogMine)} />
                            <Route path="/by/:authorId" component={BlogAuthor} />
                            <Route component={NotFound} />
                        </Switch>
                    </ScrollToTop>
                <Footer />
            </div>
        </Router>
    )
}

export default App
