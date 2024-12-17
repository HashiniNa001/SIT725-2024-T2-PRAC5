const Customer = require('../models/customer');

const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const result = await customer.save();
        res.status(201).json({ message: 'Customer created successfully', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Error creating customer', error: err.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ message: 'Customers retrieved successfully', data: customers });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer retrieved successfully', data: customer });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customer', error: err.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer updated successfully', data: customer });
    } catch (err) {
        res.status(500).json({ message: 'Error updating customer', error: err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting customer', error: err.message });
    }
};

module.exports = { 
    createCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomer, 
    deleteCustomer 
};
