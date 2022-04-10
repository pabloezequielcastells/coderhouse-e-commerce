import CartsManager from "../models/carts-manager.js";

const manager = new CartsManager();

const getCartProducts = async(req, res) => {
    try {
        const products = await manager.getCartProducts(req.params.cid);
        res.send(products);
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const createCart = async(req, res) => {
    try {
        const id = await manager.createCart();
        res.send(`${id}`);
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const addNewProduct = async(req, res) => {
    try {
        if (!req.body.id) throw "Product id is required";
        await manager.addNewProduct(req.params.cid, req.body);
        res.send({ status: "success", message: "Product added to cart" });
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const deleteCartProduct = async(req, res) => {
    try {
        await manager.deleteCartProduct(req.params.cid, req.params.pid);
        res.send({ status: "success", message: "Product deleted" });
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const deleteCart = async(req, res) => {
    try {
        await manager.deleteCart(req.params.cid);
        res.send({ status: "success", message: "Cart deleted" });
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

export default {
    getCartProducts,
    createCart,
    addNewProduct,
    deleteCartProduct,
    deleteCart,
}