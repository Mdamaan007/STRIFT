// fire base config
const firebaseConfig = {
  apiKey: "REPLACED_FOR_SECURITY",
  authDomain: "REPLACED",
  projectId: "REPLACED",
  storageBucket: "REPLACED",
  messagingSenderId: "REPLACED",
  appId: "REPLACED",
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// // Reference to the database
const contactFormDB = firebase.database().ref("billing-form");

// // Function to save messages to Firebase
const saveMessages = (name, email, address, phone, paymentMethod) => {
  const newContactForm = contactFormDB.push(); // Create a new reference
  newContactForm
    .set({
      name: name,
      email: email,
      address: address,
      phone: phone,
      paymentMethod: paymentMethod,
    })
    .then(() => {
      console.log("Data saved successfully!");
      document.querySelector(".alert").style.display = "block"; // Show success alert
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none"; // Hide alert after 3 seconds
      }, 3000);
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
};

// // Function to get the value of an input element
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// // Submit form event listener
document.getElementById("billing-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent default form submission

  //   // Get values from the form
  const name = getElementVal("name");
  const email = getElementVal("email");
  const address = getElementVal("address");
  const phone = getElementVal("phone");
  const paymentMethod = getElementVal("payment-method");

  //   // Save data to Firebase
  saveMessages(name, email, address, phone, paymentMethod);

  //   // Reset the form
  document.getElementById("billing-form").reset();
}

// ... (previous code)

// Submit form event listener
document.getElementById("billing-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent default form submission

  // Get values from the form
  const name = getElementVal("name");
  const email = getElementVal("email");
  const address = getElementVal("address");
  const phone = getElementVal("phone");
  const paymentMethod = getElementVal("payment-method");

  // Save data to Firebase
  saveMessages(name, email, address, phone, paymentMethod);

  // Reset the form
  document.getElementById("billing-form").reset();

  // Hide the billing form popup and show the order confirmation popup
  hideCheckoutPopup();
  showOrderConfirmation();
}

// ... (previous code)

// Function to hide the billing form popup
function hideCheckoutPopup() {
  document.getElementById("checkout-popup").style.display = "none";
}

// Function to show the order confirmation popup
function showOrderConfirmation() {
  document.getElementById("order-confirmation").style.display = "block";
}

// Sample cart data
// Simulates products added to the cart
// Replace this with `localStorage.getItem('cart')` in production
const cartData = JSON.parse(localStorage.getItem("cart")) || [
  { id: 1, name: "Product A", price: 900, quantity: 1 },
  { id: 2, name: "Product B", price: 300, quantity: 2 },
];

// Render the cart items
function renderCart() {
  const cartItemsContainer = document.getElementById("#cart-items");
  const totalPriceElement = document.getElementById("#total-price");

  // Clear previous cart items
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  if (cartData.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cartData.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div>
        <p><strong>${item.name}</strong></p>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeItem(index) {
  cartData.splice(index, 1); // Remove the item from the cart
  localStorage.setItem("cart", JSON.stringify(cartData)); // Save the updated cart
  renderCart(); // Re-render the cart
}

// Initialize the cart page
document.addEventListener("DOMContentLoaded", renderCart);
