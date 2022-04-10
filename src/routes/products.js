import express from "express";
import isAdmin from "../middlewares/is-admin.js";
import productsController from '../controllers/products-controller.js';

const router = express.Router();

router.get('/:pid', productsController.get);

router.get('/', productsController.getAll);

router.post('/', isAdmin, productsController.createProduct);

router.put('/:pid', isAdmin, productsController.updateProduct);

router.delete('/:pid', isAdmin, productsController.deleteProduct);


export default router;