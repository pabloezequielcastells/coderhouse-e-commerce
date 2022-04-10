import ProductsManager from "../models/products-manager.js";

const manager = new ProductsManager();

const getAll = async(req, res) => {
    try {
        res.send(await manager.getAll());
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const get = async(req, res) => {
    try {
        const id = req.params.pid;
        res.send(await manager.get(id));
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const createProduct = async(req, res) => {
    try {
        const product = req.body;
        productValidation(product);
        await manager.create(product);
        res.send(product);
    } catch (error) {
        res.send({ status: "error", message: error });
    }

}

const updateProduct = async(req, res) => {
    try {
        const product = req.body;
        productValidation(product);
        product.id = req.params.pid;
        await manager.update(product);
        res.send(product);
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const deleteProduct = async(req, res) => {
    try {
        await manager.delete(req.params.pid);
        res.send({ status: "success", message: "Product deleted" });
    } catch (error) {
        res.send({ status: "error", message: error });
    }
}

const productValidation = (product) => {
    if (!product.title)
        throw "Product title is required";
    if (!product.description)
        throw "Product description is required";
    if (!product.code)
        throw "Product code is required";
    if (!product.thumbnail)
        throw "Product thumbnail is required";
    if (isNaN(product.price))
        throw "Product price is required";
    if (!product.stock)
        throw "Product stock is required";
}

export default {
    getAll,
    get,
    createProduct,
    updateProduct,
    deleteProduct,
}