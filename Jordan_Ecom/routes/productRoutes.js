const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts)
router.get('/active', productController.getActiveProducts)
router.get('/single', productController.getSingleProduct)
router.get('/:id', productController.getProductById)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
