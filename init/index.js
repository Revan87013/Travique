const mongoose=require('mongoose');
const initdata=require('./data');
const listing=require('../models/listing');
const User=require('../models/user');

const mongoURL='mongodb://127.0.0.1:27017/travique';

main().then(()=>{
    console.log('Connect the DataBase');
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongoURL);
}

const initDb= async()=>{
    await listing.deleteMany({});
    
    // Find an existing user or create a default one
    let defaultUser = await User.findOne();
    if (!defaultUser) {
        // Create a default user if none exists
        defaultUser = new User({
            email: 'demo@travique.com',
            username: 'demo_user'
        });
        await User.register(defaultUser, 'demo123');
        console.log('Created default user for sample listings');
    }
    
    // Assign the existing/created user as owner for all sample listings
    initdata.data = initdata.data.map((obj) => ({
        ...obj, 
        owner: defaultUser._id
    }));
    
    await listing.insertMany(initdata.data);
    console.log('Data was initialised with proper owner assignment');
}

initDb();