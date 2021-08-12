const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const { validationResult } = require('express-validator');

const db = require('./db/mongo');
const Product = require('./db/models/Product');
const Order = require('./db/models/Order');
const User = require('./db/models/User');
const ApiRequest = require('./db/models/ApiRequests');
const { createDummyProducts, orderValidate } = require('./util');

const app = express();

// App setup
app.use(parser.json());
app.use(cors());

// Endpoints
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/requests', async (req, res) => {
  const requests = await ApiRequest.find();
  res.send(requests);
});

app.post('/', orderValidate, async (req, res) => {
  try {
    // Validate input
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new Error(validationErrors.array()[0].msg);
    }

    // Check if product exists
    const products = await Product.find();
    const reqProductId = req.body.product_id;
    const foundProduct = products.find((prd) => prd.product_id == reqProductId);
    if (typeof foundProduct === 'undefined') {
      throw new Error("Requested product doesn't exist");
    }

    // Find/add user
    const reqUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
    };
    User.find(
      { 'first_name': reqUser.first_name, 'last_name': reqUser.last_name },
      async (err, users) => {
        if (err) {
          throw new Error(err);
        } else {
          if (users.length == 0) {
            // Add new user
            const newUser = new User({
              user_id: reqUser.first_name + reqUser.last_name,
              first_name: reqUser.first_name,
              last_name: reqUser.last_name,
              phone_number: reqUser.phone_number,
            });

            await newUser.save();
          }
        }
      }
    );

    // Create new order
    const orderId =
      reqUser.first_name +
      reqUser.last_name +
      Math.floor(1000 + Math.random() * 9000);

    const newOrder = new Order({
      order_id: orderId,
      product_id: req.body.product_id,
      user_id: reqUser.first_name + reqUser.last_name,
    });

    await newOrder.save();

    // Log request
    const newRequest = new ApiRequest({
      request_id: `REQ${Math.floor(1000 + Math.random() * 9000)}`,
      request_date: new Date(),
      status: 200,
      order_id: orderId,
      error: null,
    });

    await newRequest.save();

    // Return success
    return res
      .status(200)
      .json({ msg: `Your order has been placed, order number: ${orderId}` });
  } catch (e) {
    // Log request
    const newRequest = new ApiRequest({
      request_id: `REQ${Math.floor(1000 + Math.random() * 9000)}`,
      request_date: new Date(),
      status: 400,
      order_id: null,
      error: e,
    });

    await newRequest.save();

    // Return failure
    return res
      .status(400)
      .json({ msg: 'Error whilst placing an order', err: e.message });
  }
});

// MAIN

// Start DB
db.connect().then(async () => {
  // Insert dummy data
  await createDummyProducts();

  // Start server
  app.listen(3001, () => {
    console.log('Listening on 3001');
  });
});
