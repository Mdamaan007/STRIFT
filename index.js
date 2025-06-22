$(function () {
  $(".navSection").load("./header.html");
  $("footer").load("./footer.html");
});

//navbar hamburgar animation
window.onload = function () {
  var menuButton = document.querySelector(".menuButton");
  var resNavbar = document.querySelector(".res_navbar");

  menuButton.addEventListener("click", function () {
    resNavbar.classList.toggle("fade-in");
  });
};

function myfunction() {
  alert("Order placed Successfully");
}

function scrolltosection() {
  document.querySelector(".cat-logo").scrollIntoView({ behavior: "smooth" });
}

function changeMainImage(imageSrc) {
  document.querySelector("#main-img").src = imageSrc;
}

function selectSize(size) {
  document.querySelector("#size-s").classList.remove("selected");
  document.querySelector("#size-m").classList.remove("selected");
  document.querySelector("#size-l").classList.remove("selected");

  document
    .querySelector("#size-" + size.toLowerCase())
    .classList.add("selected");
}

function selectQuantity(quantity) {
  document.querySelector("#quantity-1").classList.remove("selected");
  document.querySelector("#quantity-2").classList.remove("selected");
  document.querySelector("#quantity-3").classList.remove("selected");

  document
    .querySelector("#quantity-" + quantity.toLowerCase())
    .classList.add("selected");
}

// buy btn
function openCheckoutPopup() {
  document.getElementById("checkout-popup").classList.remove("hidden");
}

function closeCheckoutPopup() {
  document.getElementById("checkout-popup").classList.add("hidden");
}

function placeOrder() {
  const form = document.getElementById("billing-form");
  if (!form.checkValidity()) {
    alert("Please fill in all required fields.");
    // form.reportValidity();
    return;
  }

  //   //   // Clear the cart after order placement
  localStorage.removeItem("cart");
  closeCheckoutPopup();
  document.getElementById("order-confirmation").classList.remove("hidden");
}

function closeOrderConfirmation() {
  document.getElementById("order-confirmation").classList.add("hidden");
  window.location.href = "index.html"; // Redirect to home or any other page
}

// window.onload = displayCart;

// Add item to cart and save to localStorage
function addToCart(productId, productName, productPrice) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increment quantity if already present
  } else {
    // Add a new product
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// Render the cart items
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Clear the container
  cartContainer.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    checkoutButton.style.display = "none";
  } else {
    checkoutButton.style.display = "block";

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="item-details">
          <p>${item.name}</p>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item by index
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initialize the cart page
document.addEventListener("DOMContentLoaded", renderCart);

// admin section

function showProduct(value) {
  const sections = document.getElementById("content-section");
  // sections.style.display = "none";
  const productList = document.getElementById("product-list");
  const productCreate = document.getElementById("create-product");
  const productEdit = document.getElementById("edit-product");
  const catList = document.getElementById("category-list");
  const catCreate = document.getElementById("create-category");
  // productList.style.display = "none";
  // productCreate.style.display = "none";
  // productEdit.style.display = "none";

  if (value === "product-list") {
    productList.style.display = "block";
    productCreate.style.display = "none";
    productEdit.style.display = "none";
    catList.style.display = "none";
    catCreate.style.display = "none";
    console.log("product-list");
  }
  if (value === "create-product") {
    productCreate.style.display = "block";
    productList.style.display = "none";
    productEdit.style.display = "none";
    catList.style.display = "none";
    catCreate.style.display = "none";
    console.log("product-cresae");
  }
  if (value === "edit-product") {
    productEdit.style.display = "block";
    productCreate.style.display = "none";
    productList.style.display = "none";
    catList.style.display = "none";
    catCreate.style.display = "none";
    console.log("product-edit");
  }
  // else {
  //   productList.style.display = "none";
  //   productCreate.style.display = "none";
  //   productEdit.style.display = "none";
  // }
  // sections.forEach((section) => section.classList.remove("active"));
}

function showCategory(value) {
  const productList = document.getElementById("product-list");
  const productCreate = document.getElementById("create-product");
  const productEdit = document.getElementById("edit-product");
  const catList = document.getElementById("category-list");
  const catCreate = document.getElementById("create-category");
  if (value === "category-list") {
    catList.style.display = "block";
    productCreate.style.display = "none";
    productList.style.display = "none";
    productEdit.style.display = "none";
    catCreate.style.display = "none";
    console.log("cat-create");
  }
  if (value === "create-category") {
    catCreate.style.display = "block";
    productCreate.style.display = "none";
    productList.style.display = "none";
    productEdit.style.display = "none";
    catList.style.display = "none";
    console.log("cat-create");
  }
}

// for selecting size and colour

// document.addEventListener("DOMContentLoaded", () => {
//   // Arrays to store selected sizes and colors
//   const selectedSizes = [];
//   const selectedColors = [];

//   // Handle size selection
//   document.querySelectorAll(".sizes span").forEach((sizeSpan) => {
//     sizeSpan.addEventListener("click", () => {
//       const size = sizeSpan.textContent;

//       // Toggle selection state
//       if (selectedSizes.includes(size)) {
//         selectedSizes.splice(selectedSizes.indexOf(size), 1);
//         sizeSpan.classList.remove("selected");
//       } else {
//         selectedSizes.push(size);
//         sizeSpan.classList.add("selected");
//       }
//       console.log("Selected Sizes:", selectedSizes);
//     });
//   });

//   // Handle color selection

//   document.querySelectorAll(".colors span").forEach((colorSpan) => {
//     colorSpan.addEventListener("click", () => {
//       const color = colorSpan.textContent;

//       // Toggle selection state
//       if (selectedColors.includes(color)) {
//         selectedColors.splice(selectedColors.indexOf(color), 1);
//         colorSpan.classList.remove("selected");
//       } else {
//         selectedColors.push(color);
//         colorSpan.classList.add("selected");
//       }
//       console.log("Selected Colors:", selectedColors);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Arrays to store selected sizes and colors
  const selectedSizes = [];
  const selectedColors = [];

  // Handle size selection
  document.querySelectorAll(".sizes span").forEach((sizeSpan) => {
    sizeSpan.addEventListener("click", () => {
      const size = sizeSpan.textContent;

      // Toggle selection state
      if (selectedSizes.includes(size)) {
        selectedSizes.splice(selectedSizes.indexOf(size), 1);
        sizeSpan.classList.remove("selected");
      } else {
        selectedSizes.push(size);
        sizeSpan.classList.add("selected");
      }
      console.log("Selected Sizes:", selectedSizes);
    });
  });

  // Handle color selection
  document.querySelectorAll(".colors span").forEach((colorSpan) => {
    colorSpan.addEventListener("click", () => {
      const color = colorSpan.textContent;

      // Toggle selection state
      if (selectedColors.includes(color)) {
        selectedColors.splice(selectedColors.indexOf(color), 1);
        colorSpan.classList.remove("selected");
      } else {
        selectedColors.push(color);
        colorSpan.classList.add("selected");
      }
      console.log("Selected Colors:", selectedColors);
    });
  });

  // Image upload functionality
  const uploadBox = document.querySelector(".upload-box");
  const fileInput = document.getElementById("image-upload");

  uploadBox.addEventListener("click", () => {
    fileInput.click(); // Trigger the hidden file input
  });

  fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    if (files.length > 0) {
      const fileNames = Array.from(files).map((file) => file.name);
      uploadBox.textContent = `Uploaded: ${fileNames.join(", ")}`;
      console.log("Uploaded Files:", files);
    }
  });

  const uploaddBox = document.querySelector(".uploadd-box");
  const fileInputt = document.getElementById("image-upload");

  uploaddBox.addEventListener("click", () => {
    fileInputt.click(); // Trigger the hidden file input
  });

  fileInputt.addEventListener("change", () => {
    const files = fileInputt.files;
    if (files.length > 0) {
      const fileNames = Array.from(files).map((file) => file.name);
      uploaddBox.textContent = `Uploaded: ${fileNames.join(", ")}`;
      console.log("Uploaded Files:", files);
    }
  });
});

///cat-list
const categoriesData = [
  {
    name: "Fashion Categories",
    subCategories: [
      {
        name: "Fashion Men, Women & Kid's",
        image: "https://via.placeholder.com/50/0000FF/FFFFFF?text=FM",
        createdBy: "Seller",
        id: "FS16276",
        stock: "46233",
      },
      {
        name: "Women Hand Bag",
        image: "https://via.placeholder.com/50/FF00FF/FFFFFF?text=HB",
        createdBy: "Admin",
        id: "HB73029",
        stock: "2739",
      },
      {
        name: "Cap and Hat",
        image: "https://via.placeholder.com/50/808080/FFFFFF?text=CH",
        createdBy: "Admin",
        id: "CH4929",
        stock: "1829",
      },
    ],
  },
  {
    name: "Electronics Headphone",
    subCategories: [
      {
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/50/FF0000/FFFFFF?text=WH",
        createdBy: "admin",
        id: "EH23818",
        stock: "1902",
      },
      {
        name: "Gaming Headsets",
        image: "https://via.placeholder.com/50/800000/FFFFFF?text=GH",
        createdBy: "Admin",
        id: "GH73122",
        stock: "873",
      },
    ],
  },
  {
    name: "Foot Wares",
    subCategories: [
      {
        name: "Sneakers",
        image: "https://via.placeholder.com/50/008000/FFFFFF?text=SN",
        createdBy: "Seller",
        id: "FW11009",
        stock: "2733",
      },
      {
        name: "Sandals",
        image: "https://via.placeholder.com/50/00FF00/FFFFFF?text=SA",
        createdBy: "Admin",
        id: "SA39201",
        stock: "1932",
      },
    ],
  },
  {
    name: "Eye Ware & Sunglass",
    subCategories: [
      {
        name: "Sunglasses",
        image: "https://via.placeholder.com/50/FFA500/FFFFFF?text=SG",
        createdBy: "Seller",
        id: "SG45123",
        stock: "3421",
      },
      {
        name: "Reading Glasses",
        image: "https://via.placeholder.com/50/FFD700/FFFFFF?text=RG",
        createdBy: "Admin",
        id: "RG12345",
        stock: "1923",
      },
    ],
  },
];

const categoryBoxes = document.querySelectorAll(".category-box");
const subcategoryContainer = document.getElementById("subcategory-container");
const subcategoryList = document.getElementById("subcategory-list");

categoryBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    const selectedCategory = categoriesData[index];
    subcategoryContainer.style.display = "block";
    subcategoryList.innerHTML = "";

    selectedCategory.subCategories.forEach((subCategory) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td><img src="${subCategory.image}" alt="${subCategory.name}" class="subcategory-img"></td>
      <td>${subCategory.name}</td>
      <td>${subCategory.createdBy}</td>
      <td>${subCategory.id}</td>
      <td>${subCategory.stock}</td>
      <td>
        <span class="action-btn edit">Edit</span>
        <span class="action-btn delete">Delete</span>
      </td>
    `;
      subcategoryList.appendChild(row);
    });
  });
});

// creating category
// Reset Form Functionality
function resetForm() {
  const form = document.getElementById("createCategoryForm");
  form.reset();
  document.getElementById("thumbnailInput").value = "";
  document.getElementById("categoryThumbnail").src =
    "https://via.placeholder.com/200x150";
}

// Thumbnail Preview
document
  .getElementById("thumbnailInput")
  .addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("categoryThumbnail").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Save Category
function saveCategory() {
  alert("Category Created Successfully!");
  resetForm();
}
