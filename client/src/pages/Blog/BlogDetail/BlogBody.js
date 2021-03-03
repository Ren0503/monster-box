import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
class BlogBody extends Component {
    renderTags(tags) {
        return tags.map(tag => {
            return <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>;
        })
    }

    render() {
        const { blog } = this.props

        return (
            <div>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                {this.renderTags(blog.categories)}
                <span className="span-with-margin"> • </span>
                <span className="span-with-margin">{blog.authorName}</span>
                <span className="span-with-margin"> • </span>
                <span className="span-with-margin">{new Date(blog.time).toLocaleString()}</span>
                <hr />
                <Image src={blog.image} fluid />
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: blog.content }} />
                <hr />
            </div>
        )
    }
}

export default BlogBody