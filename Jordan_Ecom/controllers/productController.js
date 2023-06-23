const Product = require('../models/productModel')

exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getActiveProducts = async(req, res) => {
    try {
        const products = await Product.find({isActive: true});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getSingleProduct = async(req, res) => {
    try {
        const product = await Product.find({name: req.body.name});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getProductById = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}

exports.createProduct = async(req, res) => {
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
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

exports.updateProduct = async(req, res) => {
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
        const product = await Product.findByIdAndUpdate(id, req.body);
        //product can't be found in database
        if(!product){
            return res.status(404).json({message: `Product ID ${id} cannot be found.`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteProduct = async(req, res) => {
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
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Product ID ${id} cannot be found.`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = exports
