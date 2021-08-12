# ZRU ORDER API

This simple NodeJS API allows for placement of orders into a temporary Mongo DB. Built with Express, the server accepts HTTP requests and provides appropriate response.

## Installation

Download the package and install all dependencies.

```bash
npm install
```

## Usage

1) Run the following command to start the server locally:

```bash
npm start
```

2) If succesful, a message will appear in the console advising of listening port. Use one of the following commands inside a terminal to access the server:

- Place an order
```bash
curl -X POST -H 'Content-Type: application/json' -d '{"first_name": "Name", "last_name": "LName", "phone_number": "1234567899", "product_id": "3"}' http://localhost:3001/
```
- Retrieve orders
```bash
curl http://localhost:3001/orders
```
- Retrieve requests log
```bash
curl http://localhost:3001/requests
```
- Retrieve products
```bash
curl http://localhost:3001/products
```
- Retrieve users
```bash
curl http://localhost:3001/users
```

## Misc.

Total time spent on building the server: ~2hrs
Challanges: My first time working with 'express-validator' package. Interesting capabilities and more sanitization options available for future use.
