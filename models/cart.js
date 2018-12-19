import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(i => i.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id:id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = Number(cart.totalPrice) + Number(price);
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(c => c.id === id);
            if (product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(i => i.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productQty*productPrice;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb(null);
            } else {
                cb(JSON.parse(fileContent));
            }
        })
    }
}