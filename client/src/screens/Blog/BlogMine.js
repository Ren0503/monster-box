import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchMyBlogs } from '../../actions/blogActions'
import { Card, Button, Container, CardColumns, Table, Image } from 'react-bootstrap'

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
            return <Link to={`/search/${tag}`}>
                <span className="badge badge-warning span-with-margin" key={tag}>{tag}</span>
            </Link>
        })
    }

    renderBlogSummary(blog) {
        return (
            <tr key={blog._id}>
                <td>
                    {blog._id}
                </td>
                <td>
                    <Image src={blog.image} rounded height="50" />
                </td>
                <td>
                    {blog.title}
                </td>
                <td>
                    {new Date(blog.time).toLocaleString()}
                </td>
                <td>
                    <Link className="link-without-underline" to={`/blogs/${blog._id}`}>
                        <i className="far fa-edit"></i>
                    </Link>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <Container>
                <Button variant="outline-primary" className="pb-2 mb-3">
                    <Link className="link-without-underline" to='/blogs/new'>
                        Create blogs <i className="fas fa-pencil-alt"></i>
                    </Link>
                </Button>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <td>Published At</td>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.take(_.map(this.props.blogs, (blog) => {
                            return this.renderBlogSummary(blog)
                        }), this.state.count)}
                    </tbody>
                </Table>

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