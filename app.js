const express = require('express');
const app = express();
const PORT = 5000;

let products = require('./products.json');

app.use(express.json());

let cart = [];

app.get('/api/products', (request, response) => {
    const resObj = {
        products: products
    }

    response.json(resObj)
});

app.post('/api/add/:id', (request, response) => {
    const id = request.params.id;

    for(let i = 0; i < products.length; i++) {
        if (id === products[i].serial) {
            cart.push(products[i])
        }
    }

    response.json(cart);
});

app.delete('/api/remove/:id', (request, response) => {
    const id = request.params.id;

    const remainingProducts = cart.filter((product) => {
        return Number(id) !== Number(product.serial);
    })

    cart = remainingProducts;

    response.json(cart);


});


app.listen(PORT, () => {
    console.log(`Servern är up and running på port: ${PORT}`)
})