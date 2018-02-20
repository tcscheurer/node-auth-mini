const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');

const app = express();
app.use(session({
    secret: 'sldkjflksadjflkje',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user,done)=>{
    
    done(null,{id: user.id, display: user.dispayName, nickname: user.nickname, email: user.email})
})

passport.deserializeUser((obj,done)=>{
    done(null,obj);
    
})

app.get('/login', passport.authenticate('auth0',
    {
        successRedirect: '/me',
        failureRedirect: '/login',
        failureFlash: true
    })
);


app.get('/me', (req,res)=>{
    if(!req.user){
        res.redirect('/login')
    } else{        
        res.status(200).send(JSON.stringify(req.user,null,10))
    }
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );