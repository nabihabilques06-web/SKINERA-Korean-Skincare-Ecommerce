SKINERA - Korean Skincare E-Commerce

A full-stack Korean skincare e-commerce platform developed using React, Vite, Node.js, Express.js and MongoDB.

SKINERA provides customers with a modern skincare shopping experience and administrators with a dedicated dashboard to manage products, customers and orders.

---

1. Features
 Customer Website

- Customer registration and login
- Secure authentication using JWT
- Password hashing using bcrypt
- Browse skincare products
- Product search functionality
- Category-based filtering
- Product sorting
- Detailed product information
- Wishlist management
- Shopping cart management
- Checkout functionality
- Cash on Delivery payment option
- Order creation
- Customer account section
- Order history

*Admin Dashboard

SKINERA includes a separate administrator login and dashboard.

Admin functionalities include:

- Dedicated admin login
- Role-based access authorization
- Admin dashboard overview
- Product management
- Add new products
- Manage existing products
- View registered customers
- View and manage customer orders
- Protected administrator operations

Administrator access is separate from customer access.

*Demo Admin Credentials:* Shared privately with the evaluator for security purposes. Administrator passwords are not published in this public repository.

---

*2. Technology Stack

* Frontend

- React.js
- Vite
- JavaScript
- CSS
- React Router
- Lucide React

* Backend

- Node.js
- Express.js
- REST API

* Database

- MongoDB Atlas
- Mongoose

* Authentication and Security

- JSON Web Tokens (JWT)
- bcryptjs
- Role-based authorization
- Protected routes
- Environment variables

* Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

*3. Project Structure

```text
SKINERA_Ecommerce/
|
|-- public/
|
|-- src/
|   |
|   |-- assets/
|   |
|   |-- components/
|   |   |-- ProductDetails.jsx
|   |
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   |-- main.jsx
|
|-- server/
|   |
|   |-- config/
|   |   |-- db.js
|   |
|   |-- controllers/
|   |   |-- adminController.js
|   |   |-- authController.js
|   |   |-- cartController.js
|   |   |-- orderController.js
|   |   |-- productController.js
|   |   |-- wishlistController.js
|   |
|   |-- middleware/
|   |   |-- adminMiddleware.js
|   |   |-- authMiddleware.js
|   |
|   |-- models/
|   |   |-- Cart.js
|   |   |-- Order.js
|   |   |-- Product.js
|   |   |-- User.js
|   |   |-- Wishlist.js
|   |
|   |-- routes/
|   |   |-- adminRoutes.js
|   |   |-- authRoutes.js
|   |   |-- cartRoutes.js
|   |   |-- orderRoutes.js
|   |   |-- productRoutes.js
|   |   |-- wishlistRoutes.js
|   |
|   |-- utils/
|   |   |-- generateToken.js
|   |
|   |-- package.json
|   |-- server.js
|
|-- index.html
|-- package.json
|-- vite.config.js
|-- .gitignore
|-- README.md
```

---

* 4. Installation and Setup

* Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB Atlas account
- Visual Studio Code
- Git

* Step 1: Clone the Repository

```bash
git clone https://github.com/nabihabilques06-web/SKINERA-Korean-Skincare-Ecommerce.git

cd SKINERA-Korean-Skincare-Ecommerce
```

* Step 2: Install Frontend Dependencies

From the project root directory:

```bash
npm install
```

* Step 3: Install Backend Dependencies

Navigate to the server directory:

```bash
cd server
```

Install the backend dependencies:

```bash
npm install
```

* Step 4: Configure Environment Variables

Create a `.env` file inside the `server` directory.

Add the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your own MongoDB Atlas connection string and secure JWT secret.

**Important:** Never upload `.env` files, database credentials, JWT secrets or administrator passwords to GitHub.

* Step 5: Start the Backend Server

From inside the `server` directory, run:

```bash
npm run dev
```

The backend server runs on:

```text
http://localhost:5000
```

* Step 6: Start the Frontend

Open a second terminal in the project root directory.

Run:

```bash
npm run dev
```

Open the local Vite URL in your browser:

```text
http://localhost:5173
```

The frontend and backend should now be running separately.

---

* 5. API Endpoints

| Endpoint | Description |
|---|---|
| `/api/auth` | Customer authentication |
| `/api/products` | Product operations |
| `/api/cart` | Shopping cart operations |
| `/api/wishlist` | Wishlist operations |
| `/api/orders` | Order management |
| `/api/admin` | Administrator operations |

---

* 6. Authentication and Security

The application incorporates the following security features:

- JWT-based authentication
- Password hashing using bcryptjs
- Authentication middleware
- Admin authorization middleware
- Role-based access control
- Protected administrative operations
- Environment-based configuration for sensitive credentials

---

* 7. Admin Dashboard Access

SKINERA provides a separate administrator login for managing the e-commerce platform.

Administrators can access the dashboard to manage products, view customers and handle customer orders.

Admin demo credentials are provided privately to the evaluator.

Admin passwords and sensitive authentication information are intentionally excluded from this public repository.

---

* 8. Payment Information

The current checkout implementation supports Cash on Delivery (COD).

Online payment gateway integration is not included in the current implementation.

---

* 9. Project Objective

The objective of SKINERA is to develop a complete full-stack e-commerce application that combines a customer-facing shopping platform with a separate administrative management system.

The project demonstrates:

- Frontend development
- Backend API development
- Database integration
- User authentication
- Password security
- Role-based authorization
- E-commerce functionality
- Product and order management

---

* 10. Developer

Nabiha Bilques Begum

B.Tech - Computer Science and Engineering

Internship: Syntecxhub

Project: Week 4 - Full-Stack E-Commerce Website

---

SKINERA - Your skincare journey, beautifully simplified.