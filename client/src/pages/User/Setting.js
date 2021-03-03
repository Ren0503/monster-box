import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { changePassword } from '../../actions/userActions'

class Setting extends Component {
    handleFormSubmit({ oldPassword, newPassword }) {
        // callback: history replace
        this.props.changePassword({ oldPassword, newPassword }, (path, state) => {
            this.props.history.replace(path, state)
        })
    }

    renderField = ({ label, input, type, meta: { touched, error, warning } }) => (
        <fieldset className="form-group">
            <input className="form-control" placeholder={label} {...input} type={type} required='required' />
            { touched && error && <span className="text-danger">{error}</span>}
        </fieldset>
    )

    renderAlert() {
        const { state } = this.props.history.location;
        const { action } = this.props.history;

        if (state && action === 'REPLACE') {
            return (
                <div className={`alert ${state.status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {`[${state.time}] --- `} <strong>{state.status === 'success' ? 'Congratulations!' : 'Oops!'}</strong> {state.message}
                </div>
            );
        }
    }

    render() {
        // these properties comes from ReduxForm
        const { handleSubmit } = this.props

        // when do we need .bind(this)?
        return (
            <div>
                {this.renderAlert()}
                <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <h3>Change Password</h3>
                    <hr />
                    <Field name="oldPassword" component={this.renderField} type="password" label="Old Password" />
                    <Field name="newPassword" component={this.renderField} type="password" label="New Password" />
                    <Field name="newPasswordConfirm" component={this.renderField} type="password" label="New Password Confirm" />
                    <button action="submit" className="btn btn-primary">Change Password</button>
                </form>
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {}

    if(formProps.newPassword !== formProps.newPasswordConfirm) {
        errors.newPasswordConfirm = 'New password must match!'
    }

    return errors
}

Setting = reduxForm({
    form: 'setting',
    validate: validate,
})(Setting)

export default connect(null, { changePassword })(Setting)