//  Vendor Section
const vendorForm = document.getElementById("vendorForm");
const vendorList = document.getElementById("vendorList");

vendorForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("vendorName").value;
  const contactNumber = document.getElementById("vendorContactNumber").value;
  const location = document.getElementById("vendorLocation").value;
  const shopName = document.getElementById("VendorShopName").value;
  const email = document.getElementById("vendorEmail").value;

  try {
    const response = await fetch("http://localhost:3000/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contactNumber, location, shopName, email }),
    });

    if (response.ok) {
      alert("Vendor added successfully!");
      getVendors();
    } else {
      alert("Failed to add vendor");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function getVendors() {
  try {
    const response = await fetch("http://localhost:3000/vendors");
    const vendors = await response.json();

    vendorList.innerHTML = vendors
      .map(
        (vendor) => `
      <div>
        <h4>${vendor.name}</h4>
        <p>Contact Number: ${vendor.contactNumber}</p>
        <p>Location: ${vendor.location}</p>
        <p>Shop Name: ${vendor.shopName}</p>
        <p>Email: ${vendor.email}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching vendors:", error);
  }
}

//  Rider Section
const riderForm = document.getElementById("riderForm");
const riderList = document.getElementById("riderList");

riderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("riderName").value;
  const contactNumber = document.getElementById("riderContactNumber").value;
  const vehicleType = document.getElementById("riderVehicleType").value;
  const location = document.getElementById("riderLocation").value;
  const available = document.getElementById("riderAvailable").checked;

  try {
    const response = await fetch("http://localhost:3000/riders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contactNumber,
        vehicleType,
        location,
        available,
      }),
    });

    if (response.ok) {
      alert("Rider added successfully!");
      getRiders();
    } else {
      alert("Failed to add rider");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function getRiders() {
  try {
    const response = await fetch("http://localhost:3000/riders");
    const riders = await response.json();

    riderList.innerHTML = riders
      .map(
        (rider) => `
      <div>
        <h4>${rider.name}</h4>
        <p>Contact: ${rider.contactNumber}</p>
        <p>Vehicle: ${rider.vehicleType}</p>
        <p>Location: ${rider.location}</p>
        <p>Available: ${rider.available ? "Yes" : "No"}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching riders:", error);
  }
}

// Customer Section
const customerForm = document.getElementById("customerForm");
const customerList = document.getElementById("customerList");

customerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const contactNumber = document.getElementById("customerContactNumber").value;
  const location = document.getElementById("customerLocation").value;

  try {
    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, contactNumber, location }),
    });

    if (response.ok) {
      alert("Customer added successfully!");
      getCustomers();
    } else {
      alert("Failed to add customer");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function getCustomers() {
  try {
    const response = await fetch("http://localhost:3000/customers");
    const customers = await response.json();

    customerList.innerHTML = customers
      .map(
        (customer) => `
      <div>
        <h4>${customer.name}</h4>
        <p>Email: ${customer.email}</p>
        <p>Contact Number: ${customer.contactNumber}</p>
        <p>Location: ${customer.location}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

// Order Section
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");

// Adding a new order
orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const vendorId = document.getElementById("orderVendorId").value;
  const customerId = document.getElementById("orderCustomerId").value;
  const riderId = document.getElementById("orderRiderId").value || null;
  const items = document.getElementById("orderItems").value;
  const status = document.getElementById("orderStatus").value;
  const deliveryDate = document.getElementById("orderDeliveryDate").value; // New field

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendorId,
        customerId,
        riderId,
        items,
        status,
        deliveryDate,
      }),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      getOrders();
    } else {
      alert("Failed to place order");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Fetching all orders
async function getOrders() {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();

    orderList.innerHTML = orders
      .map(
        (order) => `
      <div>
        <h4>Order ID: ${order.id}</h4>
        <p>Vendor ID: ${order.vendorId}</p>
        <p>Customer ID: ${order.customerId}</p>
        <p>Rider ID: ${order.riderId || "N/A"}</p>
        <p>Items: ${order.items}</p>
        <p>Status: ${order.status}</p>
        <p>Delivery Date: ${
          order.deliveryDate
        }</p> <!-- Display the delivery date -->
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}
