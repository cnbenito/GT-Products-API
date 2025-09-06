import express from 'express';

const app = express();
const PORT = 3000;  

// Middleware to parse incoming JSON requests
app.use(express.json()); // <-- ADD THIS LINE

let products = 
[
  {"id": 1, "name": "Banana", "price": 10}, 
  {"id": 2, "name": "Apple", "price": 15}, 
  {"id": 3, "name": "Orange", "price": 20}
];

//Endpoint to get all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

//Endpoint to get a product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const searchedProduct = products.find(product => product.id === id);
  console.log(searchedProduct)
  if(!searchedProduct) {
    return res.status(404).json({ message: "Product not found", Note: "Please check the ID and try again." });
  }else {
    return res.status(200).json(searchedProduct);
  }
});

// Endpoint to create a new product
app.post('/products', (req, res) => {
    // Find the highest existing ID to generate a new one
    const newId = Math.max(...products.map(p => p.id)) + 1;

    const newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint to update a product by ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex].name = req.body.name;
    products[productIndex].price = req.body.price;

    res.status(200).json(products[productIndex]);
});

// Endpoint to delete a product by ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));