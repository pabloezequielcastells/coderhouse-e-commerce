import ProductsManager from "../models/products-manager.js";
import readFile from "../helpers/file-to-json.js";
import writeFile from "../helpers/json-to-file.js";


export default class CartsManager {

    constructor() {
        this.productsManager = new ProductsManager();
    }

    async initialize() {
        const storteCarts = await readFile('carts.json');
        if (storteCarts) {
            this.carts = storteCarts;
        } else {
            this.carts = [];
        }
    }

    async save() {
        await writeFile('carts.json', this.carts);
    }

    async getCartProducts(cid) {
        await this.initialize();
        let index = this.carts.findIndex(cart => cart.id == cid);
        if (index >= 0) {
            return this.carts[index].products;
        } else {
            throw "Cart not found";
        }
    }

    async createCart() {

        await this.initialize();
        const id = new Date().getTime();
        const cart = {
            id: id,
            products: [],
            timestamp: new Date(),
        };

        this.carts.push(cart);
        await this.save();
        return id;
    }

    async addNewProduct(cid, product) {

        await this.initialize();

        const productExisting = await this.productsManager.get(product.id);
        if (!productExisting) throw 'Product not found';

        const index = this.carts.findIndex(cart => cart.id == cid);
        if (index >= 0) {
            const existingProduct = this.carts[index].products.find(p => p.id == product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                this.carts[index].products.push({
                    id: product.id,
                    quantity: 1,
                });
            }

            await this.save();
            return this.carts[index];
        } else {
            throw "Cart not found";
        }
    }

    async deleteCartProduct(cid, pid) {
        await this.initialize();
        const index = this.carts.findIndex(cart => cart.id == cid);

        if (index >= 0) {
            const productIndex = this.carts[index].products.findIndex(p => p.id == pid);
            if (productIndex >= 0) {
                this.carts[index].products.splice(productIndex, 1);
                await this.save();
            } else {
                throw "Product not found";
            }
        } else {
            throw "Cart not found";
        }
    }

    async deleteCart(cid) {
        await this.initialize();
        const index = this.carts.findIndex(cart => cart.id == cid);
        if (index >= 0) {
            this.carts.splice(index, 1);
            await this.save();
        } else {
            throw "Cart not found";
        }
    }

}