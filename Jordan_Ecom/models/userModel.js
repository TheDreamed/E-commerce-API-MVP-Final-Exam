const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter an email.')
                return true
            }
        }
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) throw new Error('Please enter password.')
                return true
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
