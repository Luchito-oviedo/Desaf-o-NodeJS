import express from "express";
import { createProducts, updateProducts, deleteProducts, getProduct, getProducts, getProductPrice } from "../controllers/ProductController.js";
import * as productController from "../controllers/ProductController.js"; // Asegúrate de importar el controlador correctamente
import { isAuthenticated, isAdmin } from  "../middleware/auth.js";

const router = express.Router();
// Forma 1
// router.get("/", getProducts)
// router.get("/:id", getProduct)
// router.put("/:id", updateProducts)
// router.post("/", createProducts)
// router.delete("/:id" , deleteProducts ) 

// Obtener todos los productos
router.route('/')
    .get(getProducts)
    .post(isAuthenticated, isAdmin, createProducts);

// Obtener un producto por ID
router.route('/:id')
    .get(getProduct)
    .put(isAuthenticated, isAdmin, updateProducts)
    .delete(isAuthenticated, isAdmin, deleteProducts);

// Obtener el precio de un producto
router.get('/price/:id/:name', getProductPrice);



export default router