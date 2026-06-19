require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

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
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Seeded ✔️");
    process.exit();
  })
  .catch(err => console.log(err));  
