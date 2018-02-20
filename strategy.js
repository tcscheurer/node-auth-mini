const config = require('./config');
const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: '/login'
},
(accessToken,refreshToken,extraParams,profile,done)=>{
    return done(null,profile);
})