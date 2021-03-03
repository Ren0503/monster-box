import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogsByUserId } from '../../actions/blogActions'

class BlogMine extends Component {
    componentDidMount() {
        this.props.fetchBlogsByUserId()
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>
        })
    }

    renderBlogSummary(blog) {
        return (
            <div className="grid-item" key={blog._id}>
                <article className="post">
                    <div className="wrapgriditem">
                        <img className="img-background" src={blog.image} alt="Image" />
                        <header className="post-header">
                            <h2 className="post-title">
                                <Link className="link-without-underline" to={`/blogs/${blog._id}`}>
                                    {blog.title}
                                </Link>
                            </h2>
                        </header>
                        <section class="post-excerpt">
                            <p>
                                {this.renderTags(blog.categories)}
                            </p>
                        </section>
                        <footer className="post-meta">
                            <span className="span-with-margin text-grey"> • </span>
                            <span className="span-with-margin text-grey">{blog.authorName}</span>
                            <span className="span-with-margin text-grey"> • </span>
                            <span className="span-with-margin text-grey">{new Date(blog.time).toLocaleString()}</span>
                        </footer>
                    </div>
                </article>
            </div>
        )
    }

    render() {
        return (
            <>
                <header className="main-header author-head " style={{ backgroundImage: 'url(http://s3.amazonaws.com/caymandemo/wp-content/uploads/sites/10/2015/09/30162427/sep2.jpg)' }}>
                </header>
                <section className="author-profile inner">
                    <figure className="author-image">
                        <span className="hidden">Avatar Picture</span>
                    </figure>
                    <h1 className="author-title">Dashboard</h1>
                    <h2 className="author-bio">The blog combining journalist years of experience stories and culture for among others. Read my blog and you will learn how to become a storyteller.</h2>
                    <div className="author-meta">
                        <span className="author-location icon-location">
                            <Link className="link-without-underline" to='/profile'>Profile</Link>
                        </span>
                        <span className="author-link icon-link">
                            <Link className="link-without-underline" to='/settings'>Change Password</Link>
                        </span>
                        <span className="author-stats"><i className="icon-stats" /> 
                            <Link className="link-without-underline" to='/blogs/new'>Create blogs</Link>
                        </span>
                    </div>
                </section>
                <main id="content" className="content" role="main">
                    <div className="wraps">
                        <div className="grid">
                            {_.map(this.props.blogs, blog => {
                                return this.renderBlogSummary(blog)
                            })}
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.blogs }
}

export default connect(mapStateToProps, { fetchBlogsByUserId })(BlogMine)