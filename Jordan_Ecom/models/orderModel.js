const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('User ID is required')
                return true
            }
        }
    },
    products: {
        type: [Object]
    },
    firstItemOrderQuantity: {
        type: Number,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter quantity amount.')
                return true
            }
        }
    },
    firstItemPriceAmount: {
        type: Number,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter total amount.')
                return true
            }
        }
    },
    secondItemOrderQuantity: {
        type: Number,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter quantity amount.')
                return true
            }
        }
    },
    secondItemPriceAmount: {
        type: Number,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter total amount.')
                return true
            }
        }
    },
    purchasedOn: {
        type: Date,
        default: () => Date.now()
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

orderSchema.virtual('subtotal').get(function() {
    return this.firstItemPriceAmount + this.secondItemPriceAmount;
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
