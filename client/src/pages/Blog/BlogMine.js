import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogsByUserId } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns } from 'react-bootstrap'

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
                    <Button variant="primary">See More</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{new Date(blog.time).toLocaleString()}</small>
                </Card.Footer>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <Button variant="outline-primary">
                    <Link className="link-without-underline" to='/blogs/new'>Create blogs</Link>
                </Button>

                <div></div>
                
                <CardColumns>
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

export default connect(mapStateToProps, { fetchBlogsByUserId })(BlogMine)