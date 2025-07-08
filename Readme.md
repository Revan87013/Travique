# 🏡 Travique Technologies

<div align="center">

![Travique Logo](https://img.shields.io/badge/Travique-Your%20Perfect%20Stay-blue?style=for-the-badge&logo=home&logoColor=white)

**A Modern Full-Stack Accommodation Booking Platform**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

---

## 🌟 Overview

**Travique Technologies** is a sophisticated full-stack accommodation booking platform that connects travelers with unique stays worldwide. Built with modern web technologies, it offers a seamless experience for both guests looking for memorable accommodations and hosts wanting to share their spaces.

### ✨ Key Features

- 🔐 **Secure Authentication** - User registration, login, and session management
- 🏠 **Property Management** - Create, edit, and delete accommodation listings
- 🗺️ **Interactive Maps** - Powered by Mapbox for location visualization
- 📸 **Image Upload** - Cloud-based storage with Cloudinary integration
- ⭐ **Review System** - Guest reviews and ratings for properties
- 🔍 **Advanced Search** - Filter by location, category, and preferences
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🛡️ **Security Features** - Data validation and error handling

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object Data Modeling (ODM) library
- **Passport.js** - Authentication middleware

### Frontend
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework for responsive design
- **Font Awesome** - Icon library

### Third-Party Services
- **Mapbox** - Maps and geocoding services
- **Cloudinary** - Cloud-based image and video management
- **Connect-Flash** - Flash messaging

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.0 or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/travique-technologies.git
   cd travique-technologies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Mapbox Configuration
   mapToken=your_mapbox_access_token_here
   
   # Cloudinary Configuration
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   
   # Session Secret
   SECRET=your_session_secret_here
   
   # Environment
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Initialize the database (optional)**
   ```bash
   node init/index.js
   ```

6. **Start the application**
   ```bash
   npm start
   # or
   node app.js
   ```

7. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8080`

---

## 📁 Project Structure

```
travique-technologies/
├── 📁 Controllers/          # Route handlers and business logic
│   ├── listings.js         # Property management logic
│   ├── reviews.js          # Review system logic
│   └── users.js            # User authentication logic
├── 📁 models/              # Database schemas
│   ├── listing.js          # Property model
│   ├── review.js           # Review model
│   └── user.js             # User model
├── 📁 routes/              # API routes
│   ├── listing.js          # Property routes
│   ├── review.js           # Review routes
│   └── user.js             # User routes
├── 📁 views/               # EJS templates
│   ├── 📁 includes/        # Reusable components
│   ├── 📁 layouts/         # Page layouts
│   ├── 📁 listings/        # Property pages
│   └── 📁 user/            # User pages
├── 📁 public/              # Static assets
│   ├── 📁 css/             # Stylesheets
│   ├── 📁 js/              # Client-side JavaScript
│   └── 📁 images/          # Static images
├── 📁 init/                # Database initialization
├── 📁 utils/               # Utility functions
├── app.js                  # Main application file
├── CloudConfig.js          # Cloudinary configuration
└── middleware.js           # Custom middleware
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `mapToken` | Mapbox access token for maps | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUD_API_KEY` | Cloudinary API key | Yes |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes |
| `SECRET` | Session secret key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Getting API Keys

1. **Mapbox**: Sign up at [mapbox.com](https://account.mapbox.com/access-tokens/)
2. **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com/console)

---

## 🎯 Usage

### For Guests
1. **Browse Properties** - Explore available accommodations
2. **Search & Filter** - Find properties by location or category
3. **View Details** - Check property information, photos, and reviews
4. **Book Stays** - Contact hosts for bookings

### For Hosts
1. **Sign Up** - Create a host account
2. **List Property** - Add your accommodation with photos and details
3. **Manage Listings** - Edit or remove your properties
4. **Respond to Reviews** - Engage with guest feedback

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- **Express.js** team for the amazing framework
- **MongoDB** for the flexible database solution
- **Mapbox** for excellent mapping services
- **Cloudinary** for seamless image management
- **Bootstrap** for responsive design components

---

<div align="center">

**Made with ❤️ and ☕**

*Travique Technologies - Where Every Journey Finds Its Perfect Stay*

</div>
