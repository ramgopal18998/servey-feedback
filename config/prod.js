

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID ,
  googleClientSecret:process.env.GOOGLE_CLIENT_SECRETKEY,
  mongoDBUri:process.env.MONGO_URI,
  cookieKey: process.env.COOKIEKEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain:process.env.REDIRECT_DOMAIN
};
