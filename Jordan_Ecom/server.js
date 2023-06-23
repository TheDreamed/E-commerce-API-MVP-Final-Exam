const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Use Routes
app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://spence:hakdog123@dlsud.gd6nsmo.mongodb.net/ecomjordan?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, ()=> {
        console.log(`JordanEcommerce is running on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})
