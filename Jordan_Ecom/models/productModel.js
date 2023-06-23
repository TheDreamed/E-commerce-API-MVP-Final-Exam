const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter a name.')
                return true
            }
        }
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter a price')
                return true
            }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: () => Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

//replace find commands for Product for the soft-deleting to work
productSchema.pre('find', function() {
    this.where({ isDeleted: false });
});

productSchema.pre('findOne', function() {
    this.where({ isDeleted: false });
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product
