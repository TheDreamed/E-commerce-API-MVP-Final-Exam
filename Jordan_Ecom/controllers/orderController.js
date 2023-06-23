const Order = require('../models/orderModel')
const User = require('../models/userModel')

exports.getAllOrders = async(req, res) => {
    try {
        // Get user id from request header
        console.log(req.header('_id'));
        const userId = req.header('_id');

        // Fetch user details from database using id
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        // Check if user is admin
        if (!user.isAdmin) {
            return res.status(403).json({message: "Unauthorized. Only admins can access all orders."});
        }

        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

exports.createOrder = async(req, res) => {
    try {
        const order = await Order.create(req.body)
        res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

exports.updateOrder = async(req, res) => {
    try {
        // Get user id from request header
        console.log(req.header('_id'));
        const userId = req.header('_id');

        // Fetch user details from database using id
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        // Check if user is admin
        if (!user.isAdmin) {
            return res.status(403).json({message: "Unauthorized. Only admins can access all orders."});
        }
        
        const {id} = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true});
        if(!order){
            return res.status(404).json({message: `Order ID ${id} cannot be found.`})
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getOrdersByUserId = async(req, res) => {
    try {
        const { id } = req.params; // Extract the order id from the request parameters
        const order = await Order.findById(id); // Query the database for the order with this id
        if(!order) { // If no order is found, return an error message
            return res.status(404).json({message: `Order with ID ${id} not found.`});
        }
        res.status(200).json(order); // Return the found order
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = exports
