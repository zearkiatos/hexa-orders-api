import mongoose from "mongoose";

const Client: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
  },
  id: {
    type: String,
  },
  name: String,
  lastname: String,
  idNumber: {
    type: String,
  },
});

const Items: mongoose.Schema = new mongoose.Schema({
  id: {
    type: String,
  },
  sku: String,
  barcode: {
    type: String,
  },
  itemNumber: {
    type: String,
  },
  price: Number,
  name: String,
});

const OrderDetails: mongoose.Schema = new mongoose.Schema({
  id: {
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
      type: String
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
