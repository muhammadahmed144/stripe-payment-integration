# 💳 Stripe Payment Integration

A full-stack payment integration application built with React.js, Node.js, Express.js, MongoDB, and Stripe.

This project demonstrates a complete e-commerce payment workflow including product management, Stripe Checkout, payment verification, order creation, order tracking, and Stripe webhook handling.

---

## 🚀 Features

### 🔐 Authentication & User Management
- Secure user authentication
- Protected routes
- User-specific orders

### 🛍️ Product Management
- Fetch products from the backend
- Product listing
- Product details
- Product image management
- Cloudinary integration

### 💳 Stripe Payments
- Stripe Checkout integration
- Secure payment processing
- Stripe Checkout Session creation
- Payment verification
- Successful payment handling
- Cancelled payment handling

### 📦 Order Management
- Create orders after successful payment
- Store payment information
- View user orders
- View individual order details
- Track payment status

### 🔔 Stripe Webhooks
- Stripe webhook integration
- Handle Stripe payment events
- Update order/payment status from webhook events

### 🎨 Frontend
- Responsive React UI
- React Router
- Axios API integration
- Toast notifications
- Framer Motion animations
- Lucide React icons
- Mobile responsive navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- React Hot Toast
- Stripe.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Stripe
- Cloudinary
- dotenv

### Tools

- Git
- GitHub
- Postman
- Vercel

---

## 📂 Project Structure

```text
Payment Integration/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
└── README.md
