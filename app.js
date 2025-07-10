if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express=require('express');
const mongoose=require('mongoose');
const helmet = require('helmet'); // Add this line
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const listroute=require('./routes/listing');
const reviewroute=require('./routes/review');
const session=require('express-session');
const MongoStore = require('connect-mongo'); // Add this line
const flash=require('connect-flash');
const passport=require('passport');
const User=require('./models/user.js');
const LocalStrategy=require('passport-local');
const userRoute=require('./routes/user.js');


app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

const sessionOptions={
    secret: process.env.SESSION_SECRET || 'mysecretcode',
    resave:false,
    saveUninitialized:false, // Changed from true to false for better security
    store: MongoStore.create({
        mongoUrl: process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/travique',
        touchAfter: 24 * 60 * 60 // time period in seconds for session updates
    }),
    cookie:{
        expires:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production' // Only use secure cookies in production
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "https://api.mapbox.com", "https://events.mapbox.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://api.mapbox.com", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://api.mapbox.com"],
            workerSrc: ["'self'", "blob:"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        }
    }
}));

main().then(()=>{
    console.log('Connect the DataBase');
}).catch((err)=>{
    console.log(err);
});

async function main() {
    const dbUrl = process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/travique';
    await mongoose.connect(dbUrl);
};

const PORT = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.curruser=req.user;
    next();
});

//User Route
app.use('/',userRoute);

//Listing Route
app.use('/listings/',listroute);

//Review Route
app.use('/listings/:id/review/',reviewroute);

//Error Validation
app.all('*',(req,res,next)=>{
    const err = {
        message: 'Page Not Found',
        status: 404
    };
    res.render('listings/error.ejs', {err});
});

app.use((err,req,res,next)=>{
    let{status=404,message='Validation Error'}=err;
    if(err.kind==='ObjectId'){
        res.status(status).send('Invalid URL');
    }
    else {
        // Fixed: This else block was incomplete
        res.status(status).render('listings/error.ejs',{err});
    }
});

app.listen(PORT,(req,res)=>{
    console.log(`App is Listening at port ${PORT}`);
});