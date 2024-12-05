const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); 

// Crear una nueva categoría
router.post('/', async (req, res) => {

    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Nombre y descripción son requeridos.' });
    }

    const newCategory = new Category({
        name,
        description
    });

    try {
        const savedCategory = await newCategory.save(); 
        res.status(201).json(savedCategory); 
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar categoria.', error: error.message });
    }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); 
        res.status(200).json(categories); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoria no encontrada.' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'Categoria no encontrada.' });
        res.status(200).json({ message: 'Categoria actualizada.', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoria no encontrada.' });
        res.status(200).json({ message: 'Categoria eliminada.', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
