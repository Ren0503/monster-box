import React, { Component } from 'react'
import { connect } from 'react-redux'

import BlogEdit from './BlogEdit'
import BlogBody from './BlogBody'
import Comments from './Comments'
import CommentNew from './CommentNew'
import NotFound from '../../../components/NotFound'
import {
    fetchBlog,
    checkAuthority,
    deleteBlog
} from '../../../actions/blogActions'

class BlogDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beingEdit: false
        }
    }

    componentDidMount() {
        // By default, we set beingEdit as false (Since when the user first click the blog, the blog detail is read, rather than edited)
        this.setState({
            beingEdit: false
        })

        // Get blog id
        const { id } = this.props.match.params

        // Fetch blog detail
        if (!this.props.blog) {
            this.props.fetchBlog(id)
        }

        // Check whether current authenticated user has authority to make change to this blog
        this.props.checkAuthority(id)
    }

    handleEditSuccess() {
        this.setState({
            beingEdit: false
        })
    }

    onEditClick() {
        this.setState({
            beingEdit: true
        })
    }

    onDeleteClick() {
        const { id } = this.props.match.params
        this.props.deleteBlog(id, (path) => {
            this.props.history.push(path)
        })
    }

    renderDeleteConfirmModal() {                // used for delete confirmation
        return (
            <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this post with its comments? <strong>Attention!</strong> This delete operation cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onDeleteClick.bind(this)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderUpdateAndDeleteButton() {
        if(this.props.allowChange) {
            return (
                <div>
                    <button className="btn btn-primary mr-1" onClick={this.onEditClick.bind(this)}>Edit</button>
                    <button className="btn btn-danger" data-toggle="modal" data-target="#deleteConfirmModal">Delete</button>
                </div>
            )
        }
    }

    render() {
        // If there is no post match the given post ID, render NotFound page
        if(!this.props.blog) {
            return <NotFound />
        }

        if(this.state.beingEdit) {
            return (
                <BlogEdit 
                    blog={this.props.blog}
                    onEditSuccess={this.handleEditSuccess.bind(this)}
                    history={this.props.history}
                    state={this.props.history.location.state}
                    action={this.props.history.action}
                />
            )
        }

        return (
            <div className="blog">
                <BlogBody blog={this.props.blog} />
                {this.renderUpdateAndDeleteButton()}

                <Comments blogId={this.props.match.params.id} />
                <CommentNew 
                    blogId={this.props.match.params.id}
                    history={this.props.history}
                    state={this.props.history.location.state}
                    action={this.props.history.action}
                />

                {this.renderDeleteConfirmModal()}
            </div>
        )
    }
}

function mapStateToProps({ blogs, auth }, ownProps) {
    return {
        blog: blogs[ownProps.match.params.id],
        allowChange: auth.allowChange
    }
}

export default connect(mapStateToProps, {
    fetchBlog,
    checkAuthority,
    deleteBlog
})(BlogDetail)