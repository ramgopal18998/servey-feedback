import React from 'react';
import Background from './download.jpg';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center',paddingTop:'100px', height: '600px', backgroundImage:'url(' +  Background  + ')'}}>
      <h1>Emaily!</h1>
      <h3>We provide you your User Experience...</h3>
    </div>
  );
};

export default Landing;
