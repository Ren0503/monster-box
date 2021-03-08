import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBlogsByAuthor } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns } from 'react-bootstrap'

class BlogAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 6
        }
    }

    componentDidMount() {
        // Get blog id
        const { authorId } = this.props.match.params

        this.props.fetchBlogsByAuthor(authorId)
    }

    renderTags(tags) {
        return tags.map(tag => {
            return <Link to={`/search/${tag}`}>
                <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>
            </Link>
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

export default connect(mapStateToProps, { fetchBlogsByAuthor })(BlogAuthor)