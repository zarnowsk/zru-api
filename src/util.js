const { check } = require('express-validator');

const Product = require('./db/models/Product');
const User = require('./db/models/User');

const createDummyProducts = async () => {
  const product1 = new Product({
    product_id: 1,
    product_name: 'Macbook Pro 17',
  });
  const product2 = new Product({
    product_id: 2,
    product_name: 'Magic Keyboard',
  });
  const product3 = new Product({
    product_id: 3,
    product_name: 'Air Pods Pro',
  });

  await product1.save();
  await product2.save();
  await product3.save();
};

// Validation & sanitization
const orderValidate = [
  check('first_name')
    .trim()
    .exists()
    .isString()
    .isLength({ min: 2 })
    .withMessage('First name must be a string of minimum 2 characters'),
  check('last_name')
    .trim()
    .exists()
    .isString()
    .isLength({ min: 2 })
    .withMessage('First name must be a string of minimum 2 characters'),
  check('phone_number')
    .trim()
    .exists()
    .isString()
    .isLength({ min: 10 })
    .withMessage('First name must be a string of minimum 10 characters'),
  check('product_id')
    .trim()
    .exists()
    .isInt()
    .withMessage('Product ID must be an integer'),
];

module.exports = {
  createDummyProducts,
  orderValidate,
};
