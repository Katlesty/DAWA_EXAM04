const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 0  
    }
});

module.exports = mongoose.model('Producto', ProductSchema);
