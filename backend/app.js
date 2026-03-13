// import the express module
const express = require('express');

// import mongoose module and database connection
const mongoose = require('./config/db');

const application = express();

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

//to use express.json() middleware to present the request body as json
application.use(express.json());

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
        console.error(err);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});
const port = 4000;

// start server
application.listen(port, () => {
    console.log(`Listening on port ${port}`);
});