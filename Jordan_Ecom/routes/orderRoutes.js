const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/',  orderController.getAllOrders)
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.get('/:id', orderController.getOrdersByUserId)

module.exports = router
