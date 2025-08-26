# E-Commerce Store - Simplified Amazon Clone

A full-stack e-commerce web application built with React, Redux, Node.js, Express, and MongoDB.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and profile management
- **Product Browsing**: View products with search, filtering, and pagination
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history, track status
- **Product Reviews**: Rate and review products
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order statuses
- **User Management**: View and manage user accounts
- **Dashboard**: Overview of sales and inventory

## 🛠 Tech Stack

### Frontend
- **React.js** - Component-based UI
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
EC/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
└── package.json            # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EC
   ```

2. **Install dependencies**
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

3. **Environment Setup**
   
   Create a `config.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce_store
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. **Database Setup**
   
   Make sure MongoDB is running. If using local MongoDB:
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Or if using MongoDB Atlas, update the MONGODB_URI in config.env
   ```

5. **Run the Application**
   
   **Option 1: Run both frontend and backend simultaneously**
   ```bash
   # From root directory
   npm run dev
   ```
   
   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Usage

### User Registration & Login
1. Navigate to `/register` to create a new account
2. Use `/login` to sign in with existing credentials
3. JWT tokens are automatically managed

### Shopping Experience
1. Browse products on the home page
2. Use search and filters to find specific items
3. Add products to cart
4. Proceed to checkout
5. Complete order with shipping details

### Admin Panel
1. Login with admin credentials
2. Access `/admin` for dashboard
3. Manage products, orders, and users

## 🔧 Configuration

### MongoDB Connection
Update the `MONGODB_URI` in `server/config.env`:
- Local: `mongodb://localhost:27017/ecommerce_store`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce_store`

### JWT Secret
Generate a strong secret key for JWT:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Cloudinary (Optional)
For image uploads, configure Cloudinary:
1. Create account at cloudinary.com
2. Get API credentials
3. Update config.env with your credentials

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📦 Build & Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Production Deployment
1. Set `NODE_ENV=production` in environment
2. Build frontend: `npm run build`
3. Serve static files from Express
4. Use PM2 or similar for process management

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for authenticated users
- Admin-only routes for sensitive operations
- Input validation and sanitization
- CORS configuration

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  avatar: String,
  phone: String,
  address: Object,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number,
  category: String,
  brand: String,
  rating: Number,
  numReviews: Number,
  reviews: Array,
  featured: Boolean,
  tags: Array
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderItems: Array,
  shippingAddress: Object,
  paymentMethod: String,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  status: String,
  isPaid: Boolean,
  isDelivered: Boolean,
  createdAt: Date
}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Real-time notifications
- Advanced analytics dashboard
- Multi-language support
- Mobile app development
- Advanced search with Elasticsearch
- Email marketing integration
- Inventory management system

---

**Happy Coding! 🎉**
