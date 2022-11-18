import mongoose from "mongoose";

const Client: mongoose.Schema = new mongoose.Schema({
  username: {
    unique: true,
    type: String,
  },
  id: {
    unique: true,
    type: String,
  },
  name: String,
  lastname: String,
  idNumber: {
    unique: true,
    type: String,
  },
});

const Items: mongoose.Schema = new mongoose.Schema({
  id: {
    unique: true,
    type: String,
  },
  sku: String,
  barcode: {
    type: String,
    unique: true,
  },
  itemNumber: {
    type: String,
    unique: true,
  },
  price: Number,
  name: String,
});

const OrderDetails: mongoose.Schema = new mongoose.Schema({
  id: {
    unique: true,
    type: String,
  },
  item: Items,
  quantity: Number,
  subtotal: Number,
});

const Orders = mongoose.model(
  "Order",
  new mongoose.Schema({
    id: {
      unique: true,
      type: String,
    },
    orderNumber: {
      unique: true,
      type: String,
    },
    client: Client,
    orderDetails: [OrderDetails],
    total: Number,
  })
);

export default Orders;
