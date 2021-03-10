import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ScrollToTop from './components/ScrollToTop'

import Authenticated from './guards/Authenticated'

import SignIn from './screens/Auth/SignIn'
import SignUp from './screens/Auth/SignUp'
import Profile from './screens/User/Profile'
import Setting from './screens/User/Setting'
import BlogList from './screens/Blog/BlogList'
import BlogNew from './screens/Blog/BlogNew'
import BlogMine from './screens/Blog/BlogMine'
import BlogDetail from './screens/Blog/BlogDetail'
import BlogAuthor from './screens/Blog/BlogAuthor'
import Contact from './screens/Home/Contact'
import About from './screens/Home/About'

function App() {
    return (
        <Router>
            <div className="site-wrapper">
                <Header />
                    <ScrollToTop>
                        <Switch>
                            <Route exact path='/' component={BlogList} />
                            <Route path='/contact' component={Contact} />
                            <Route path='/about' component={About} />
                            <Route path='/signin' component={SignIn} />
                            <Route path='/signup' component={SignUp} />
                            <Route path="/profile" component={Authenticated(Profile)} />
                            <Route path="/settings" component={Authenticated(Setting)} />
                            <Route exact path="/search/:keyword" component={BlogList} />
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
