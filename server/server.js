const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Employee model
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[0-9]{10}$/.test(value);
      },
      message: 'Invalid contact number',
    },
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

// API routes

// GET /api/employees - Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/employees - Add a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    const validationError = employee.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map((error) => error.message);
      return res.status(400).json({ errors });
    }
    const savedEmployee = await employee.save();
    res.status(201).json({ employee: savedEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/employees/:id - Update an employee by ID
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const validationError = employee.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map((error) => error.message);
      return res.status(400).json({ errors });
    }

    res.json({ employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/employees/:id - Delete an employee by ID
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
