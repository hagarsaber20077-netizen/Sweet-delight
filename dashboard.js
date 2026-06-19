async function getOrders() {
  const res = await fetch("http://localhost:5000/api/orders");
  const data = await res.json();

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  data.data.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.customerName}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.total}</td>
        <td>${order.status}</td>
        <td>
          <button onclick="deleteOrder('${order._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

getOrders();

async function deleteOrder(id) {
  await fetch(`http://localhost:5000/api/orders/${id}`, {
    method: "DELETE"
  });

  getOrders(); 
}
