const express=require('express');
const router=express.Router();
const passport=require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { SaveRedirectUrl } = require('../middleware');
const UserController=require('../Controllers/users');

//Start with SignUp
router.route('/signup')
      .get(UserController.RenderSignUp)
      .post(wrapAsync(UserController.UserSignUp));

//Start with Login
router.route('/login')
      .get(UserController.RenderLogInPage)
      .post(SaveRedirectUrl,
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
        UserController.UserLogIn);

router.post('/login', (req, res, next) => {
    console.log('Login attempt for:', req.body.username);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Login error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Login failed:', info.message);
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('Login session error:', err);
                return next(err);
            }
            console.log('Login successful for:', user.username);
            req.flash('success', 'Welcome back!');
            return res.redirect('/listings');
        });
    })(req, res, next);
});

router.get('/logout',wrapAsync(UserController.UserLogOut));

module.exports=router;