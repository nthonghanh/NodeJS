import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';
import Cart from './cart';

const p = path.join(rootDir, 'data', 'product.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.imageUrl = json.imageUrl;
        this.price = json.price;
        this.description = json.description;
    }

    save() {
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updateProducts = [...products];
                updateProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updateProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const updateProducts = products.filter(prod => prod.id !== id);
            const product = products.find(prod => prod.id === id);
            fs.writeFile(p, JSON.stringify(updateProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });            
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(i => i.id === id);
            cb(product);
        })
    }
}