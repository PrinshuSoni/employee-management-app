# Employee Management Application

This is a web application built using React, Node.js with Express, and MongoDB. It allows you to manage employee details, including their name, address, email, date of birth, gender, date of joining, marital status, and contact number.

## Features

- Display a table of employee details
- Add new employees with proper validation
- Update and delete existing employee details
- Save employee details in a MongoDB database

## Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- UI Framework: Material-UI
- Form Handling: Formik
- Data Validation: Yup

## Installation and Setup

1. Clone the repository:

```shell
git clone <repository_url>
cd employee-management-app
```

2. Install dependencies:

```shell
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Configure environment variables:

Create a .env file in the server directory.
Specify the MongoDB connection URL in the .env file:

```shell
MONGODB_URI=<mongodb_connection_url>
```

4. Run the application:

```shell
# Start the backend server (from the root directory)
cd server
npm start

# Start the frontend development server (from the root directory)
cd client
npm start
```

The application will be accessible at http://localhost:3000.

## API Routes

- `GET /api/employees`: Get all employees
- `POST /api/employees`: Add a new employee
- `PUT /api/employees/:id`: Update an existing employee by ID
- `DELETE /api/employees/:id`: Delete an employee by ID

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to submit a pull request.
