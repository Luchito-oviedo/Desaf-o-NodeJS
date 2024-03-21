import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name!"]
    },
    description: {
        type: String,
        required: [true, "Please provide the product description!"]
    },
    stock: {
        type: Number,
        required: [true, "Please provide the product stock!"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the product price!"]
    }
}, {
    timestamps: true,
    versionKey: false
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel; // Cambia esta línea para exportar ProductModel como predeterminado
