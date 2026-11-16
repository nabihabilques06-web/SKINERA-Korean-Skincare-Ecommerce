\# SKINÃ‰RA â€” Korean Skincare E-Commerce



A full-stack Korean skincare e-commerce platform developed using React, Vite, Node.js, Express.js and MongoDB.



SKINÃ‰RA provides customers with a modern skincare shopping experience and administrators with a dedicated dashboard to manage products, customers and orders.



\---



\## âœ¨ Features



\### ðŸ›ï¸ Customer Website



\- Customer registration and login

\- Secure authentication using JWT

\- Password hashing using bcrypt

\- Browse skincare products

\- Product search functionality

\- Category-based filtering

\- Product sorting

\- Detailed product information

\- Wishlist management

\- Shopping cart management

\- Checkout functionality

\- Cash on Delivery payment option

\- Order creation

\- Customer account section

\- Order history



\### ðŸ” Admin Dashboard



SKINÃ‰RA includes a separate administrator login and dashboard.



Admin functionalities include:



\- Dedicated admin login

\- Role-based access authorization

\- Admin dashboard overview

\- Product management

\- Add new products

\- Manage existing products

\- View registered customers

\- View and manage customer orders

\- Protected administrator operations



Administrator access is separate from customer access.



\*\*Demo Admin Credentials:\*\* Shared privately with the evaluator for security purposes. Administrator passwords are not published in this public repository.



\---



\## ðŸ› ï¸ Technology Stack



\### Frontend

\- React.js

\- Vite

\- JavaScript

\- CSS

\- React Router

\- Lucide React



\### Backend

\- Node.js

\- Express.js

\- REST API



\### Database

\- MongoDB Atlas

\- Mongoose



\### Authentication and Security

\- JSON Web Tokens (JWT)

\- bcryptjs

\- Role-based authorization

\- Protected routes

\- Environment variables



\### Development Tools

\- Visual Studio Code

\- Git

\- GitHub

\- Postman



\---



\## ðŸ“ Project Structure



```text

SKINERA\_Ecommerce/

â”‚

â”œâ”€â”€ public/

â”‚

â”œâ”€â”€ src/

â”‚   â”œâ”€â”€ assets/

â”‚   â”œâ”€â”€ components/

â”‚   â”‚   â””â”€â”€ ProductDetails.jsx

â”‚   â”œâ”€â”€ App.jsx

â”‚   â”œâ”€â”€ App.css

â”‚   â”œâ”€â”€ index.css

â”‚   â””â”€â”€ main.jsx

â”‚

â”œâ”€â”€ server/

â”‚   â”œâ”€â”€ config/

â”‚   â”‚   â””â”€â”€ db.js

â”‚   â”‚

â”‚   â”œâ”€â”€ controllers/

â”‚   â”‚   â”œâ”€â”€ adminController.js

â”‚   â”‚   â”œâ”€â”€ authController.js

â”‚   â”‚   â”œâ”€â”€ cartController.js

â”‚   â”‚   â”œâ”€â”€ orderController.js

â”‚   â”‚   â”œâ”€â”€ productController.js

â”‚   â”‚   â””â”€â”€ wishlistController.js

â”‚   â”‚

â”‚   â”œâ”€â”€ middleware/

â”‚   â”‚   â”œâ”€â”€ adminMiddleware.js

â”‚   â”‚   â””â”€â”€ authMiddleware.js

â”‚   â”‚

â”‚   â”œâ”€â”€ models/

â”‚   â”‚   â”œâ”€â”€ Cart.js

â”‚   â”‚   â”œâ”€â”€ Order.js

â”‚   â”‚   â”œâ”€â”€ Product.js

â”‚   â”‚   â”œâ”€â”€ User.js

â”‚   â”‚   â””â”€â”€ Wishlist.js

â”‚   â”‚

â”‚   â”œâ”€â”€ routes/

â”‚   â”‚   â”œâ”€â”€ adminRoutes.js

â”‚   â”‚   â”œâ”€â”€ authRoutes.js

â”‚   â”‚   â”œâ”€â”€ cartRoutes.js

â”‚   â”‚   â”œâ”€â”€ orderRoutes.js

â”‚   â”‚   â”œâ”€â”€ productRoutes.js

â”‚   â”‚   â””â”€â”€ wishlistRoutes.js

â”‚   â”‚

â”‚   â”œâ”€â”€ utils/

â”‚   â”‚   â””â”€â”€ generateToken.js

â”‚   â”‚

â”‚   â”œâ”€â”€ package.json

â”‚   â””â”€â”€ server.js

â”‚

â”œâ”€â”€ index.html

â”œâ”€â”€ package.json

â”œâ”€â”€ vite.config.js

â”œâ”€â”€ .gitignore

â””â”€â”€ README.md

```



\---



\## âš™ï¸ Installation and Setup



\### Prerequisites



Install the following before running the project:



\- Node.js

\- npm

\- MongoDB Atlas account

\- Visual Studio Code



\### 1. Clone the Repository



```bash

git clone https://github.com/nabihabilques06-web/SKINERA-Korean-Skincare-Ecommerce.git

cd SKINERA-Korean-Skincare-Ecommerce

```



\### 2. Install Frontend Dependencies



From the project root directory:



```bash

npm install

```



\### 3. Install Backend Dependencies



```bash

cd server

npm install

```



\### 4. Configure Environment Variables



Create a `.env` file inside the `server` directory.



Add the following configuration:



```env

PORT=5000

MONGO\_URI=your\_mongodb\_atlas\_connection\_string

JWT\_SECRET=your\_secure\_jwt\_secret

CLIENT\_URL=http://localhost:5173

```



Replace the placeholder values with your own MongoDB connection string and secure JWT secret.



\*\*Important:\*\* Never upload `.env` files, database credentials, JWT secrets or administrator passwords to GitHub.



\### 5. Start the Backend Server



From the `server` directory:



```bash

npm run dev

```



The backend runs on:



```text

http://localhost:5000

```



\### 6. Start the Frontend



Open a second terminal in the project root directory:



```bash

npm run dev

```



Open the local Vite URL:



```text

http://localhost:5173

```



\---



\## ðŸ”Œ API Endpoints



| Endpoint | Description |

|---|---|

| `/api/auth` | Customer authentication |

| `/api/products` | Product operations |

| `/api/cart` | Shopping cart operations |

| `/api/wishlist` | Wishlist operations |

| `/api/orders` | Order management |

| `/api/admin` | Administrator operations |



\---



\## ðŸ”’ Security Implementation



\- JWT-based authentication

\- Password hashing using bcryptjs

\- Authentication middleware

\- Admin authorization middleware

\- Role-based access control

\- Protected administrative operations

\- Environment-based configuration for sensitive credentials



\---



\## ðŸ’³ Payment Information



The current checkout implementation supports Cash on Delivery (COD).



Online payment gateway integration is not included in the current implementation.



\---



\## ðŸŽ¯ Project Objective



The objective of SKINÃ‰RA is to develop a complete full-stack e-commerce application that combines a customer-facing shopping platform with a separate administrative management system.



The project demonstrates frontend development, backend API development, database integration, authentication, authorization and e-commerce functionality.



\---



\## ðŸ‘©â€ðŸ’» Developer



Nabiha Bilques Begum

B.Tech â€” Computer Science and Engineering



\*\*Internship:\*\* Syntecxhub



\*\*Project:\*\* Week 4 â€” Full-Stack E-Commerce Website



\---



\*SKINÃ‰RA â€” Your skincare journey, beautifully simplified.\*


