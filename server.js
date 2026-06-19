require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const Order = require("./models/Order");
const Product = require("./models/Product");

const app = express();

// ======================
// DATABASE CONNECTION (ONE ONLY)
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ======================
// PRODUCTS (STATIC ARRAY - optional fallback)
// ======================
let products = [
  { id: 1, name: "Brownie", price: 50, category: "Cakes", image: "m1.png" },
  { id: 2, name: "Cupcake", price: 35, category: "Cupcakes", image: "m2.png" },
  { id: 3, name: "Cheesecake", price: 130, category: "Cakes", image: "m3.png" },
  { id: 4, name: "Red Velvet Cake", price: 140, category: "Cakes", image: "m4.png" },
  { id: 5, name: "Chocolate Cake", price: 120, category: "Cakes", image: "m5.png" },
  { id: 6, name: "Cookies", price: 60, category: "Cookies", image: "m6.png" },
  { id: 7, name: "Macarons (Box)", price: 160, category: "Cookies", image: "m7.png" },
  { id: 8, name: "Fruit Tart", price: 110, category: "Tarts", image: "m8.png" },
  { id: 9, name: "Lemon Tart", price: 90, category: "Tarts", image: "m9.png" },
  { id: 10, name: "Tiramisu", price: 150, category: "Desserts", image: "m10.png" },
  { id: 11, name: "Panna Cotta", price: 100, category: "Desserts", image: "m11.png" },
  { id: 12, name: "Lemon Cheesecake", price: 140, category: "Cakes", image: "m12.png" },
  { id: 13, name: "Carrot Cake", price: 120, category: "Cakes", image: "m13.png" },
  { id: 14, name: "Opera Cake", price: 170, category: "Cakes", image: "m14.png" },
  { id: 15, name: "Eclairs", price: 45, category: "Cookies", image: "m15.png" },
  { id: 16, name: "Matcha Cake", price: 120, category: "Cakes", image: "m16.png" },
  { id: 17, name: "Strawberry Shortcake", price: 130, category: "Cakes", image: "m17.png" },
  { id: 18, name: "Chocolate Mousse", price: 95, category: "Desserts", image: "m18.png" },
  { id: 19, name: "Mille Crepe Cake", price: 180, category: "Cakes", image: "m19.png" },
  { id: 20, name: "Black Forest Cake", price: 150, category: "Cakes", image: "m20.png" }
];

const PORT = process.env.PORT || 5000;

// ======================
// ROUTES - PRODUCTS
// ======================
app.get("/api/products", async (req, res) => {
  try {
    const data = await Product.find();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ======================
// ROUTES - ORDERS
// ======================
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, productId, quantity } = req.body;

    if (!customerName || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data"
      });
    }

    const product = await Product.findOne({ id: Number(productId) });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const newOrder = await Order.create({
      customerName,
      product: product.name,
      quantity,
      total: product.price * quantity,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      data: newOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// app.use(express.json());
// let products = [
//     {id: 1, name: "Brownie" , price: 50, category: "Cakes", image: "m1.png"},
//     {id: 2, name: "Cupcake" , price: 35, category: "Cupcakes", image: "m2.png"},
//     {id: 3, name: "Cheesecake" , price: 130, category: "Cakes", image: "m3.png"},
//     {id: 4, name: "Red Valvet Cake" , price: 140, category: "Cakes", image: "m4.png"},
//     {id: 5, name: "Chocolate Cake" , price: 120, category: "Cakes", image: "m5.png"},
//     {id: 6, name: "Cookies" , price: 60, category: "Cookies", image: "m6.png"},
//     {id: 7, name: "Macarons (BoX)" , price: 160, category: "Cookies", image: "m7.png"},
//     {id: 8, name: "Fruit Tart" , price: 110, category: "Tarts", image: "m8.png"},
//     {id: 9, name: "Lemon Tart" , price: 90, category: "Tarts", image: "m9.png"},
//     {id: 10, name: "Tiramisu" , price: 150, category: "Desserts", image: "m10.png"},
//
// ]
// let orders = [];
// app.get("/api/products",(request,response) =>{
//     response.status(200).json({
//         success: true,
//         data: products
//     });
// });

// app.post("/api/products",(request,response) => {
//     const{name,price,category,image} = request.body;
//     if(!name||!price|| !category){
//         return response.status(400).json({
//             success: false,
//             message:"name,price and category are "
//         });
//     }
//     const newProduct = {
//         id: products.length + 1,
//         name,price,category,image
//     };
//     products.push(newProduct);
//     response.status(201).json({success: true,data:newProduct});
// });

// app.get("/api/orders",(request,response) =>{
//     const{customerName, productId,quantity} = request.body;

//     if(!customerName || !productId || !quantity){
//         return response.status(400).json({
//             success: false,
//             message:"customerName, productId and quantity are implemented"
//         });
//     }
//     const product = products.find(p => p.id === productId);
//     if(!product){
//         return response.status(404).json({
//             success: false,
//             message: "this product is not found"
//         });
//     }
//     const newOrder ={
//         id: orders.length +1,
//         customerName,product: product.name,
//         quantity,total: product.price*quantity,
//         status:"pending",
//         date: newDate().toLocaleString('ar-EG')
//     };
//     orders.push(newOrder);
//     response.status(201).json({
//         success: true,
//         message: "your order is done",
//         data: newOrder
//     });
// });
// app.listen(3000,()=>{
//     console.log(`Sweet Delight API running on http://localhost:3000`);
//     console.log(`GET/api/products-show products`);
//     console.log(`POST/api/orders-login new order`);
// })