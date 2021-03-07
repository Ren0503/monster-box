import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchMyBlogs } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns } from 'react-bootstrap'

class BlogMine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 6
        }
    }

    componentDidMount() {
        this.props.fetchMyBlogs()
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>
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
                    <small className="text-muted">{new Date(blog.time).toLocaleString()}</small>
                </Card.Footer>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <Button variant="outline-primary" className="pb-2 mb-3">
                    <Link className="link-without-underline" to='/blogs/new'>Create blogs</Link>
                </Button>
                
                <CardColumns>
                    {_.take(_.map(this.props.blogs, blog => {
                        return this.renderBlogSummary(blog)
                    }), this.state.count)}
                </CardColumns>

                <Button variant="outline-warning" onClick={() => this.setState({ count: this.state.count + 3 })}>
                    See more
                </Button>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.blogs }
}

export default connect(mapStateToProps, { fetchMyBlogs })(BlogMine)