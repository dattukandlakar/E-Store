# E-Commerce Store Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Setup
Create `server/config.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce_store
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 3. Start MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in config.env
```

### 4. Run the Application
```bash
# Option 1: Run both simultaneously
npm run dev

# Option 2: Run separately
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Admin User
To create an admin user, first register normally, then manually update the user's role in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Features Implemented
✅ User Authentication (Register/Login)
✅ Product Browsing & Search
✅ Shopping Cart Management
✅ Order Placement & Management
✅ User Profile Management
✅ Responsive Design
✅ Redux State Management
✅ JWT Authentication
✅ MongoDB Integration
✅ Basic Admin Routes

## Features Coming Soon
🔄 Admin Dashboard
🔄 Product Management (CRUD)
🔄 Order Management
🔄 User Management
🔄 Payment Integration
🔄 Image Upload
🔄 Email Notifications

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running
2. **Port Already in Use**: Change PORT in config.env
3. **JWT Errors**: Generate new JWT_SECRET
4. **CORS Issues**: Check backend CORS configuration

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Development Notes
- Frontend uses React 18 with Redux Toolkit
- Backend uses Express.js with Mongoose
- Database: MongoDB with Mongoose ODM
- Authentication: JWT with bcrypt password hashing
- Styling: Custom CSS with utility classes
- Icons: Font Awesome
- Notifications: React Toastify

## Next Steps
1. Implement admin dashboard
2. Add product management
3. Integrate payment gateway
4. Add image upload functionality
5. Implement email notifications
6. Add advanced search and filters
7. Create mobile app
8. Add analytics and reporting
