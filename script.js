const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let currentProductId = null;

function openOrder(id, name, price) {
  currentProductId = id;

  document.getElementById("productName").value = name;
  document.getElementById("price").value = price;
  document.getElementById("quantity").value = 1;
  document.getElementById("total").textContent = price;
  document.getElementById("orderModal").style.display = "flex";
}

async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();

    if (data.success) {
      console.log("✅ Products loaded successfully:", data.data);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function toggleMore() {
  let moreText = document.getElementById("more");
  let btn = document.getElementById("btn");
  let dots = document.getElementById("dots");

  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    dots.style.display = "none";
    btn.innerHTML = "Read Less";
  } else {
    moreText.style.display = "none";
    dots.style.display = "inline";
    btn.innerHTML = "Read More";
  }
}

function more_img() {
  let imgs = document.getElementById("more-img");
  let btn = document.getElementById("btn-img");

  imgs.classList.toggle("show");

  if (imgs.classList.contains("show")) {
    btn.innerHTML = "View Less";
  } else {
    btn.innerHTML = "View More";
  }
}

const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");

quantity.addEventListener("input", () => {
  total.textContent = Number(price.value) * Number(quantity.value);
});

document.getElementById("orderForm").addEventListener("submit", async function (e) {

  e.preventDefault();

  const order = {
    customerName: document.getElementById("customerName").value.trim(),
    productId: Number(currentProductId),
    quantity: Number(document.getElementById("quantity").value)
  };

  try {

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();

    if (data.success) {

      alert("✅ Order Placed Successfully!");

      document.getElementById("orderModal").style.display = "none";

      document.getElementById("orderForm").reset();

      total.textContent = "0";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);
    alert("❌ Server Connection Error");

  }

});

function closeOrder(){
    document.getElementById("orderModal").style.display="none";
    document.getElementById("orderForm").reset();
    document.getElementById("total").textContent="0";
}
const modal = document.getElementById("orderModal");
window.onclick = function(e){
    if(e.target === modal){
        closeOrder();
    }
}

}
