const productsRepositories = require('../repositories/products-repositories');
const asyncHandler = require('../middlewares/async-handler');
const CustomError = require('../utils/custom-error');

const getAllProducts = asyncHandler(async (req, res, next) => {
    const result = await productsRepositories.getAllProducts();

    if (result && result.length > 0) return res.status(200).json({ success: true, products: result });

    else return next(new CustomError('Products are not available!', 404));
});

const getSingleProductById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const result = await productsRepositories.getSingleProductById(id);

    if (result && result.length > 0) return res.status(200).json({ success: true, data: result });

    else return next(new CustomError('Product not found!', 404));
});

const createProduct = asyncHandler(async (req, res, next) => {
    const { title, thumbnail, category, rating, stock, brand, weight, description, price } = req.body;

    const result = await productsRepositories.createProduct(title, thumbnail, category, rating, stock, brand, weight, description, price);

    if (result && result.success) return res.status(201).json({ success: true, message: result.message });

    else return next(new CustomError('Failed to create product', 500));
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const product = await productsRepositories.getSingleProductById(id);

    if (product && product.length > 0) {
        const { title, thumbnail, category, rating, stock, brand, weight, description, price } = req.body;

        const result = await productsRepositories.updateProduct(id, title, thumbnail, category, rating, stock, brand, weight, description, price);

        if (result && result.success) return res.status(200).json({ success: true, message: result.message });

        else return next(new CustomError('Failed to update product!', 500));

    } else next(new CustomError("The product doesn't exist!", 404));
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const result = await productsRepositories.getSingleProductById(id);

    if (result && result.length > 0) {
        const result = await productsRepositories.deleteProduct(id);

        if (result && result.success) return res.status(200).json({ success: true, message: result.message });

        else return next(new CustomError('Failed to delete product!', 500));

    } else next(new CustomError("The product doesn't exist!", 404));
});

module.exports = { getAllProducts, getSingleProductById, createProduct, updateProduct, deleteProduct };