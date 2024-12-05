const express = require('express');
const router = express.Router();
const Producto = require('../models/Product');

// Obtener todos los productos
router.get('/', (req, res) => {
    Producto.find().populate('category')
    .then(products => res.json(products)).catch(err => res.status(400).json('Error: ' + err));
});

// Crear producto
router.post('/', (req, res) => {
    const { name, description, price, category, quantity } = req.body;
    
    // Crear el nuevo producto
    const newProduct = new Producto({
      name,
      description,
      price,
      category, 
      quantity  
    });
  
    newProduct.save()
      .then(() => res.json('Producto creado exitosamente!'))
      .catch((err) => res.status(400).json('Error al crear producto: ' + err));
  });

// Actualizar producto
router.put('/:id', (req, res) => {
    Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.json('Producto actualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Eliminar producto
router.delete('/:id', (req, res) => {
    Producto.findByIdAndDelete(req.params.id)
        .then(() => res.json('Producto eliminado!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
