const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);