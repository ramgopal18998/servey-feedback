const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({recipients:false});//We dont require the recipients property
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice/', (req, res) => {
    res.send('Thank you very much for your response!!!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _
      .chain(req.body)
      .map(({ url, email }) => {
        const pathname = new URL(url).pathname;
        const match = p.test(pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }; //we cannot write {choice} because match can return null also
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      //each function will go through each element and update the value instead of fetching into express and save as it will take lpot of time.
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId, //mongo only understand _id not id but mongoose understands both
            recipients: {
              $elemMatch: { email: email, responded: false } //elemMatch will look for the matching element in subdocument
            }
          },
          {
            $inc: { [choice]: 1 }, //increment yes or no by 1
            $set: { 'recipients.$.responded': true }, //it will get into the recipientus and the $ sign will take the recipient that was  picked  by the updateOne.
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    console.log(events);
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      //we have to convert the recipients from array of strings to array of objects
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // we use () to wrap object just to tell interpreter that its shortend representation
      _user: req.user.id,
      dateSent: Date.now()
    });
    //create mailer object;
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
