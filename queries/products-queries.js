const getAllProducts = "SELECT * FROM products ORDER BY id";
const getSingleProductById = "SELECT * FROM products WHERE id = $1";

const createProduct =   `INSERT INTO products(title, thumbnail, category, rating, stock, brand, weight, description, price)
                            VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

const updateProduct =   `UPDATE products SET
                            title = $1, thumbnail = $2, category = $3, rating = $4, stock = $5, brand = $6, weight = $7, description = $8, price = $9
                            WHERE id = $10`;

const deleteProduct = `DELETE FROM products WHERE id = $1`;

module.exports = { getAllProducts, getSingleProductById, createProduct, updateProduct, deleteProduct };