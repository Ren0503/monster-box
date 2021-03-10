import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogs } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns, Row, Col, CardGroup } from 'react-bootstrap'
class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 6
        }
    }

    componentDidMount() {
        const { keyword } = this.props.match.params

        this.props.fetchBlogs(keyword)
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <a href={`/search/${tag}`}>
                <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>
            </a>
        })
    }

    renderBlogSummary(blog) {
        return (
            <Card className="animate__fadeInUp" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={blog.image} />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/blogs/${blog._id}`}>
                            {blog.title}
                        </Link>
                    </Card.Title>
                    <Card.Text>
                        {this.renderTags(blog.categories)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/by/${blog.authorId}`} >
                        <small className="text-muted">{blog.authorName}</small>
                    </Link>
                    <small className="text-muted pl-5">{new Date(blog.time).toLocaleString()}</small>
                </Card.Footer>
            </Card>
        )
    }

    render() {
        return (
            <Container className="text-center">
                <CardColumns>
                    {_.take(_.map(this.props.blogs, blog => {
                        return this.renderBlogSummary(blog)
                    }), this.state.count)}
                </CardColumns>

                <Button className="btn-monster" onClick={() => this.setState({ count: this.state.count + 3 })}>
                    See more
                </Button>

            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.blogs }
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList)
