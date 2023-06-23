const User = require('../models/userModel')
let loggedUser;

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}
exports.getUserOrders = async(req, res) => {
    try {
        const { userId } = req.params; // Extract the userId from the request parameters
        const orders = await Order.find({ userId }); // Query the database for all orders with this userId
        if(!orders || orders.length === 0) { // If no orders are found, return an error message
            return res.status(404).json({message: `No orders found for user ID ${userId}.`});
        }
        res.status(200).json(orders); // Return the found orders
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        
        const user = await User.findOne({email: req.body.email, password: req.body.password})
        //user can't be found in database
        if(!user){
            return res.status(404).json({message: `User cannot be found.`})
        }
        loggedUser = user;
        res.status(200).json({message: `User has successfully logged in.`});
        console.log(loggedUser.isAdmin);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateUser = async(req, res) => {
    try {
        // Get user id from request header
        console.log(req.header('_id'));
        const userId = req.header('_id');

        // Fetch user details from database using id
        const user1 = await User.findById(userId);

        // Check if user exists
        if (!user1) {
            return res.status(404).json({message: "User not found."});
        }

        // Check if user is admin
        if (!user1.isAdmin) {
            return res.status(403).json({message: "Unauthorized. Only admins can access all orders."});
        }
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        //user can't be found in database
        if(!user){
            return res.status(404).json({message: `User ID ${id} cannot be found.`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `User ID ${id} cannot be found.`})
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = exports
