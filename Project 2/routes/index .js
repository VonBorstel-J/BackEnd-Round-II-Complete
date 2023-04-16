const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const auth = require('http-auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

const connectEnsureLogin = require('connect-ensure-login');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});
router.get('/login', (req, res) => {
  res.render('login', { title: 'login' });
});
router.get('/signUp', (req, res) => {
  res.render('index', { title: 'Home' });
});
router.get('/logged', (req, res) => {
  res.render('index', { title: 'Welcome' });
});
router.get('/logout', (req, res) => {
  res.render('index', { title: 'Welcome' });
});

router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
router.get('/login', 
        (req, res) => res.sendFile('login',
        { root: __dirname })
    );
router.get('/logged',
        connectEnsureLogin.ensureLoggedIn(),
        (req, res) => res.sendFile('logged', { root: __dirname})
    );
router.get('/logout',
        (req, res) => {
            res.render('logout', { title: 'Logout' , root: __dirname });
    });

}));

router.post('/', 
    [
        check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
        check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
        check('username')
        .isLength({ min: 1 })
        .withMessage('Please enter a username'),
        check('password')
        .isLength({ min: 1 })
        .withMessage('Please enter a password'),
    ],
    async (req, res) => {
        //console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const registration = new Registration(req.body);
          //generate salt to hash password
          const salt = await bcrypt.genSalt(10);
          //set user to hashed password
          registration.password = await bcrypt.hash(registration.password, salt);
          registration.save()
            .then(() => {res.render('thankyou');})
            .catch((err) => {
              console.log(err);
              res.send('Sorry! Something went wrong.');
            });
          } else {
            res.render('index', { 
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
             });
          }
          
    }),

router.post('/login', (req,res,next) => {
      passport.authenticate('local',
      (err,user,info) => {
          if (err) {
            console.log("1"); 
            return next(err);
          }
          if (!user) {
            console.log("2");
            return res.redirect('/login?info=' + info);
          }
    
          req.logIn(user, function(err) {
              if (err) {
                console.log("3");
                return next(err);
              }
              console.log("4");
              return res.redirect('/logged');
          });

      }) (req, res, next);

    },
    async (req, res) => {
      const body = req.body;
      const registration = await Registration.findOne({ username: body.username });
      if (registration) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, registration.password);
        if (validPassword) {
          res.status(200).json({ message: "Valid password" });
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
    });

      
module.exports = router;
