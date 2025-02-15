const express = require('express');
const router = express.Router();
const productData = require('../data/products.json');

// GET all products with optional category filter
router.get('/', (req, res) => {
    try {
        const { category } = req.query;
        
        if (category) {
            const filteredProducts = productData.products.filter(
                product => product.category.toLowerCase() === category.toLowerCase()
            );
            return res.json(filteredProducts);
        }
        
        res.json(productData.products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// GET product by ID
router.get('/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = productData.products.find(p => p.id === productId);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

module.exports = router;