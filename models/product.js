import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';

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
        this.title = json.title;
        this.imageUrl = json.imageUrl;
        this.price = json.price;
        this.description = json.description;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
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