import express from "express";
import cartsController from '../controllers/carts-controller.js';

const router = express.Router();

router.get('/', cartsController.getAll);

router.get('/:cid/products', cartsController.getCartProducts);

router.post('/', cartsController.createCart);

router.post('/:cid/products', cartsController.addNewProduct);

router.delete('/:cid', cartsController.deleteCart);

router.delete('/:cid/products/:pid', cartsController.deleteCartProduct);

export default router;