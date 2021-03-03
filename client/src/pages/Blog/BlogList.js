import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogs } from '../../actions/blogActions'

class BlogList extends Component {
    componentDidMount() {
        this.props.fetchBlogs()
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
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
            <main id="content" className="content" role="main">
                <div className="wraps">
                    <img src="assets/img/shadow.png" className="wrapshadow" />
                    <div className="grid">
                        {_.map(this.props.blogs, blog => {
                            return this.renderBlogSummary(blog)
                        })}
                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.blogs }
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList)
