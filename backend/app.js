// import the express module
const express = require('express');

// import mongoose module and database connection
const mongoose = require('./config/db');

const application = express();

// parse JSON bodies
application.use(express.json());

// Define Employee schema
const employeeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// test route
application.get('/', (req, res) => {
    res.send('Testing the backend!');
});

// GET route to get all employees
application.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// POST request handler to add a new employee to the database
application.post('/add-employees', async (req, res) => {
    console.log(req.body);
    try {
        const newEmployee = new Employee({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        await newEmployee.save();
        console.log("1 record inserted");
        const response = {
            status: 'success',
            message: 'Employee added successfully',
        };
        res.status(200).json(response);
    } catch (err) {
        console.error('Failed to add employee:', err);
        res.status(500).json({
            error: 'Failed to add employee',
            detail: err.message
        });
    }
});
// POST request handler to login an employee which comes to this route /login
application.post('/login', async (req, res) => {
    console.log('Login request body:', req.body);

    // basic validation
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    try {
        const employee = await Employee.findOne({ email: email.trim(), password });

        if (!employee) {
            console.log('Login failed: no matching employee');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log('Login successful for:', email);
        res.status(200).json({ message: 'Login successful', employee });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Failed to login', detail: err.message });
    }
});
const port = 4000;

// start server
application.listen(port, () => {
    console.log(`Listening on port ${port}`);
});