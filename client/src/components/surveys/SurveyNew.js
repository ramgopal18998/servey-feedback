//this will contain surveyform and surveyreview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import {reduxForm} from 'redux-form';
import SurveyFormReview from './SurveyFormReview';
class SurveyNew extends Component {
state = {showFormReview: false};
renderContent()
{
  if(this.state.showFormReview)
  {
    return <SurveyFormReview onCancel={()=>this.setState({showFormReview:false})}/>
  }
  //if you are using class then you can get the property by this.props.name and if you use function tehn you can get the property by recieving the property in the function
  return <SurveyForm onSurveySubmit={()=> this.setState({showFormReview:true})}/>//onSurveySubmit will help to toggle. Its a callback Function which will be sent inti surveyForm
}
  render() {
    return (
        <div>
          {this.renderContent()}
        </div>
    );
  }
}
//the values dont get dump if we unmount the surveyForm component but gets dumped if we unmount SurveyNew
export default reduxForm({
  form:'surveyForm'//we say this component is also tied to surveyForm
})(SurveyNew);
