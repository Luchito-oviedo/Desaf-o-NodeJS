import ProductModel  from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    // Get all products from the database and return them as a response to the client
    try {
        const products = await ProductModel.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)
        if (!product) {
            return res.status(404).json(`Product with ID: ${id} not found`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProducts = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error creating new product" + error.message })
    }
}

export const updateProducts = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error update product" + error.message })
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json(`Product with ID: ${id} not found`)
        }
        res.status(200).json("Product eliminado exitosamente")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductPrice = async (req, res) => {
    try {
        const { id, name } = req.params;
        
        // Buscar el producto por su nombre
        const product = await ProductModel.findOne({ name: name });
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let price = product.price; // Precio base por defecto

        // Lógica para determinar precios especiales para usuarios específicos o marcas
        if (id === 'cliente_especial' && product.brand === 'Nike') {
            price = 150; // Precio especial para cliente especial y marca Nike
        } else if (id === 'otro_cliente_especial' && product.brand === 'Adidas') {
            price = 120; // Precio especial para otro cliente especial y marca Adidas
        }

        // Devolver el precio del producto
        res.json({ price });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
