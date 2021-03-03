import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogs } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns } from 'react-bootstrap'
class BlogList extends Component {
    componentDidMount() {
        this.props.fetchBlogs()
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>;
        })
    }

    renderBlogSummary(blog) {
        return (
            <Card style={{ width: '18rem' }} key={blog._id}>
                <Card.Img variant="top" src={blog.image} />
                <Card.Body>
                    <Card.Title>
                        <Link className="link-without-underline" to={`/blogs/${blog._id}`}>
                            {blog.title}
                        </Link>
                    </Card.Title>
                    <Card.Text>
                        {this.renderTags(blog.categories)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{blog.authorName}</small>
                    <small className="text-muted pl-5">{new Date(blog.time).toLocaleString()}</small>
                </Card.Footer>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <CardColumns >
                    {_.map(this.props.blogs, blog => {
                        return this.renderBlogSummary(blog)
                    })}
                </CardColumns>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.blogs }
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList)
