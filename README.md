# E-commerce Dashboard

A comprehensive React.js dashboard for managing an e-commerce platform, featuring product management, user management, order tracking, and sales analytics.

## Features

### Dashboard Analytics

- Sales overview and statistics
- Monthly revenue chart
- Recent sales activity
- Key performance indicators (revenue, products, orders, users)

### Product Management

- Browse and search products
- Add new products
- Edit product information
- Delete products
- Track inventory levels

### User Management

- User listing with role-based identification
- Create new user accounts
- Edit user profiles
- Delete users
- Role assignment (admin/customer)

### Order Management

- View all orders with status
- Real-time status updates
- Detailed order information
- Order progress tracking (pending → processing → shipped → delivered)

## Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **UI Library**: Chakra UI v3
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Installation and Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Setup Steps

1. Clone the repository

```bash
git clone <repository-url>
cd ECommerce
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Environment Configuration
   Create a `.env` file in the project root with the following:

```
VITE_API_URL = "http://localhost:7860"
```

_Note: Update the API URL to match your backend server._

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Access the application
   Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
ECommerce/
├── public/              # Static assets
├── src/
│   ├── api/             # API configuration and endpoints
│   ├── components/      # Reusable UI components
│   ├── lib/
│   │   ├── constants/   # Application constants
│   │   ├── hooks/       # Custom React hooks
│   │   └── utils/       # Utility functions
│   ├── pages/           # Main application pages
│   │   ├── Home/        # Dashboard page
│   │   ├── Product/     # Product management
│   │   ├── User/        # User management
│   │   └── Order/       # Order management
│   ├── store/           # Redux store configuration
│   │   └── slices/      # Redux slices for state management
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```
