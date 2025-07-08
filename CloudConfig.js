const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary=require('cloudinary').v2

// Check if all required Cloudinary credentials are available
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUD_API_SECRET;

let storage;

if (cloudName && apiKey && apiSecret && 
    cloudName !== 'your_cloud_name_here' && 
    apiKey !== 'your_api_key_here' && 
    apiSecret !== 'your_api_secret_here') {
    
    // Configure Cloudinary with real credentials
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'travique-dev',
            allowredFormats: ['png', 'jpg', 'jpeg']
        },
    });
    
    console.log('Cloudinary configured successfully');
} else {
    console.warn('Warning: Cloudinary credentials not found. Using local file storage fallback.');
    
    // Fallback to local storage using multer
    const multer = require('multer');
    const path = require('path');
    
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/') // Make sure this directory exists
        },
        filename: function (req, file, cb) {
            // Generate unique filename
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
}

module.exports = { cloudinary, storage }