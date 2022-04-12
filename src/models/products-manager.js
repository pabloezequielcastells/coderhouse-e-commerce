import readFile from "../helpers/file-to-json.js";
import writeFile from "../helpers/json-to-file.js";

export default class ProductsManager {


    constructor() {}

    async initialize() {
        const storteProducts = await readFile('products.json');
        if (storteProducts) {
            this.products = storteProducts;
        } else {
            this.products = [];
        }
    }

    async save() {
        await writeFile('products.json', this.products);
    }

    async getAll() {
        if (!this.products) await this.initialize();
        return this.products;
    }

    async get(id) {
        if (!this.products) await this.initialize();
        let index = this.products.findIndex(producto => producto.id == id);
        if (index >= 0) {
            return this.products[index];
        } else {
            throw 'Product not found';
        }
    }

    async create(product) {
        if (!this.products) await this.initialize();
        product.id = new Date().getTime();
        product.timestamp = new Date();
        this.products.push(product);
        await this.save();
        return product;
    }

    async update(product) {
        if (!this.products) await this.initialize();
        let index = this.products.findIndex(p => p.id == product.id);
        if (index >= 0) {
            product.timestamp = new Date();
            this.products[index] = product;
            await this.save();
            return product;
        } else {
            throw 'Product not found';
        }
    }

    async delete(id) {
        if (!this.products) await this.initialize();
        let index = this.products.findIndex(p => p.id == id);
        if (index >= 0) {
            this.products.splice(index, 1);
            await this.save();
            return true;
        } else {
            throw 'Product not found';
        }
    }

}