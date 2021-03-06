import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { createBlog } from '../../actions/blogActions'

class BlogNew extends Component {
    handleFormSubmit({ title, categories, description, content, image }) {
        this.props.createBlog({ title, categories, description, content, image }, (path) => {
            this.props.history.push(path)
        }, (path, state) => {
            this.props.history.replace(path, state)
        })
    }

    renderInput = (field) => (
        <fieldset className="form-group">
            <label>{field.label}</label>
            <input
                className="form-control"
                {...field.input}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required ? 'required' : ''}
                disabled={field.disabled ? 'disabled' : ''}
            />
        </fieldset>
    )

    renderTextEditor = (field) => (
        <fieldset className="form-group">
            <label>{field.label}</label>
            <input className="form-control" id="x" type="hidden" name="content" />
            <trix-editor input="x" {...field.input} />
        </fieldset>
    )

    renderAlert() {
        const { state } = this.props.history.location
        const { action } = this.props.history

        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger" role="alert">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <div className="blog">
                {this.renderAlert()}
                <h2 className="mb-5">New Blog</h2>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Field name="title" component={this.renderInput} type="text" label="Title:" placeholder="Enter your title" required={true} />
                    <Field name="description" component={this.renderInput} type="text" label="Description:" placeholder="Enter your title" required={true} />
                    <Field name="categories" component={this.renderInput} type="text" label="Categories:" placeholder="Enter your categories, use ',' to separate them" required={true} />
                    <Field name="image" component={this.renderInput} type="text" label="Image:" placeholder="Enter your title" required={true} />
                    <Field name="content" component={this.renderTextEditor} label="Content:" />
                    <button action="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

BlogNew = reduxForm({
    form: 'blog_new',
})(BlogNew)

export default connect(null, { createBlog })(BlogNew)