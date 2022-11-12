import mongoose from "mongoose";


const Client:mongoose.Schema = new mongoose.Schema({
  username: {
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

const Items:mongoose.Schema = new mongoose.Schema({
  sku: String,
  barcode: {
    type: String,
    unique: true
  },
  itemNumber: {
    type: String,
    unique: true
  },
  price: Number
});

const OrderDetails:mongoose.Schema = new mongoose.Schema({
  item: Items,
  quantity: Number,
  subTotal: Number
});

const Orders = mongoose.model(
  "Order",
  new mongoose.Schema({
    orderNumber: {
      unique: true,
      type: String,
    },
    client: Client,
    orderDetails: [OrderDetails]
  })
);

export default Orders;
