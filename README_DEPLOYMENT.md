# Travique - Travel Listing Platform

A full-stack web application for travel listings built with Node.js, Express, MongoDB, and EJS.

## Features
- User authentication and authorization
- CRUD operations for travel listings
- Image uploads with Cloudinary integration
- Reviews and ratings system
- Interactive maps integration
- Responsive design

## Deployment on Render

### Prerequisites
1. MongoDB Atlas account and database
2. Cloudinary account (for image uploads)
3. GitHub repository
4. Render account

### Environment Variables Required
```
ATLASDB_URL=your_mongodb_atlas_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SESSION_SECRET=your_random_session_secret
PORT=8080
```

### Deployment Steps
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Set up environment variables in Render dashboard
4. Deploy!

## Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required environment variables
4. Run the application: `npm start` or `npm run dev`

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating
- Passport.js for authentication
- Cloudinary for image storage
- Bootstrap for styling
