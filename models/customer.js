const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

const { collection } = require('../db/dbConnection');

function createCustomer(customer, callback) {
    collection.insertOne(customer, callback);
}
function getAllCustomers(callback) {
    collection.find({}).toArray(callback);
}
function deleteCustomer(customerId, callback) {
    collection.deleteOne({ _id: customerId }, callback);
}
module.exports = { createCustomer, getAllCustomers, deleteCustomer };

