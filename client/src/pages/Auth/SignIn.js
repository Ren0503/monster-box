import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { signinUser } from '../../actions/userActions'

class SignIn extends Component {
    // if the user already signed in, navigate to '/blogs'
    componentWillUnmount() {
        if (this.props.authenticated) {
            this.props.history.replace('/blogs')
        }
    }

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password }, (path) => {
            this.props.history.push(path)
        }, (path, state) => {
            this.props.history.replace(path, state)
        })
    }

    renderField = (field) => (
        <fieldset className="form-group">
            { /*<label>{field.label}</label>*/}
            <input className="form-control" placeholder={field.label} {...field.input} type={field.type} required='required' />
        </fieldset>
    )


    renderAlert() {

        const { state } = this.props.history.location;
        const { action } = this.props.history;

        // message: successfully signed up, you can sign in
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-success" role="alert">
                    {`[${state.time}] --- `} <strong>Congratulations!</strong> {state.message}
                </div>
            );
        }

        // message: sign in failed
        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger" role="alert">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    render() {
        // these properties comes from ReduxForm
        const { handleSubmit } = this.props;

        // when do we need .bind(this)?
        return (
            <div className="mt-5 pt-5">
                {this.renderAlert()}
                <form className="form-signin input-field p-4" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <h3>Sign In</h3>
                    <hr />
                    <Field name="email" component={this.renderField} type="email" label="Email" />
                    <Field name="password" component={this.renderField} type="password" label="Password" />
                    <button action="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        )
    }
}

SignIn = reduxForm({
    form: 'signin',
})(SignIn)

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, { signinUser })(SignIn)