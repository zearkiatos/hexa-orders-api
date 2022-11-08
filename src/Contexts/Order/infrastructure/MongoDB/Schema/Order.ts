import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Clients = new Schema();

const Orders = mongoose.model(
  "Order",
  new Schema({
    orderNumber: {
        unique: true,
        type: String
    },
    mealId: {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
    userId: String,
  })
);

export default Orders;
