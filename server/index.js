require('dotenv').config()
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const productRoutes = require('./src/products/routes');
const userRoutes = require("./src/user/routes");
const cartRoutes = require("./src/cart/routes");
const verificationRoutes = require("./src/verifications/routes");
const orderRoutes = require("./src/orders/routes");

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello World!")
})

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ...'); // Add other headers as needed
    next();
});
app.use(bodyParser.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/verifications', verificationRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
