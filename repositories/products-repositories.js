const productsQueries = require('../queries/products-queries');
const pool = require('../config/database');

const getAllProducts = () => new Promise((resolve, reject) => pool.query(productsQueries.getAllProducts, (error, result) => error ? reject(error) : resolve(result.rows)));

const getSingleProductById = (id) => new Promise((resolve, reject) => pool.query(productsQueries.getSingleProductById, [id], (error, result) => error ? reject(error) : resolve(result.rows)));

const createProduct = (title, thumbnail, category, rating, stock, brand, weight, description, price) => {
    return new Promise((resolve, reject) => {
        pool.query(productsQueries.createProduct, [title, thumbnail, category, rating, stock, brand, weight, description, price], (error, result) => {
            error ? reject(error) : resolve({ success: true, message: "New product created!" });
        });
    });
}

const updateProduct = (id, title, thumbnail, category, rating, stock, brand, weight, description, price) => {
    return new Promise((resolve, reject) => {
        pool.query(productsQueries.updateProduct, [title, thumbnail, category, rating, stock, brand, weight, description, price, id], (error, data) => {
            error ? reject(error) : resolve({ success: true, message: "Product updated!" });
        });
    });
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(productsQueries.deleteProduct, [id], (error, data) => {
            error ? reject(error) : resolve({ success: true, message: "Product deleted!" });
        });
    });
}

module.exports = { getAllProducts, getSingleProductById, createProduct, updateProduct, deleteProduct };