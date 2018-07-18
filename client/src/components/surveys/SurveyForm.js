//this will show the user for input
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    //the onSurveySubmit function should be used in a place where we can toggle when the form passes all the validation.So the best place is in handleSubmit function
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel<i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next<i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.forEach(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You cant leave it blank.';
    }

  });
  return errors;
}

export default reduxForm({
  //we can also provide the validate function to reduxform so that it will send only if the size of error object is 0
  validate,
  //similar to validate:validate
  form: 'surveyForm',//the form reducer will have this name as a property which shows all the values of the form submitted
  destroyOnUnmount: false
})(SurveyForm);
