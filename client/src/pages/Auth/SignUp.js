import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { signupUser } from '../../actions/userActions'

class SignUp extends Component {
    componentWillUnmount() {
        if (this.props.authenticated) {
            this.props.history.replace('/blogs')
        }
    }

    handleFormSubmit({ email, password, firstName, lastName }) {
        // Call action creator to sign up the user
        this.props.signupUser({ email, password, firstName, lastName }, (path, state) => {  // callback 1: history push
            this.props.history.push(path, state)
        }, (path, state) => {  // callback 2: history replace
            this.props.history.replace(path, state)
        })
    }

    renderField = ({ label, input, type, meta: { touched, error, warning } }) => (
        <fieldset className="form-group">
            { /*<label>{label}</label>*/}
            <input className="form-control" placeholder={label} {...input} type={type} required='required' />
            { touched && error && <span className="text-danger">{error}</span>}
        </fieldset>
    )

    renderAlert() {
        const { state } = this.props.history.location;
        const { action } = this.props.history;

        // message: sign up failed
        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="mt-5 pt-5">
                {this.renderAlert()}
                <form className="form-signin input-field p-4" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <h3>Sign Up</h3>
                    <hr />
                    <Field name="firstName" component={this.renderField} type="text" label="First Name" />
                    <Field name="lastName" component={this.renderField} type="text" label="Last Name" />
                    <Field name="email" component={this.renderField} type="email" label="Email" />
                    <Field name="password" component={this.renderField} type="password" label="Password" />
                    <Field name="passwordConfirm" component={this.renderField} type="password" label="Confirm Password" />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {}

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Password must match!'
    }

    return errors
}

SignUp = reduxForm({
    form: 'signup',
    validate: validate
})(SignUp)

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, { signupUser })(SignUp)