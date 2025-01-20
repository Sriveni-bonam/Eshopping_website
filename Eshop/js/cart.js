// Global Variables
let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'sofa',
    tag: 'chair1',
    price: 22000,
    inCart: 0
  },
  {
    name: 'vase',
    tag: 'vase1',
    price: 1500,
    inCart: 0
  },
  {
    name: 'Table',
    tag: 'chair2',
    price: 15000,
    inCart: 0
  },
  {
    name: 'Clock',
    tag: 'clock1',
    price: 799,
    inCart: 0
  },
  {
    name: 'Bed',
    tag: 'bed1',
    price: 72100,
    inCart: 0
  },
  {
    name: 'Chime',
    tag: 'decor1',
    price: 100,
    inCart: 0
  },
  {
    name: 'Sofa',
    tag: 'sofa1',
    price: 12999,
    inCart: 0
  }
];

// Function to update cart numbers in the navbar
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers); // Ensure we get an integer

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.span').textContent = productNumbers + 1; // Update nav cart count
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.span').textContent = 1; // Set to 1 if it's the first item added
  }

  setItems(product); // Update the cart items in localStorage
}

// Function to set product in localStorage for cart items
function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].inCart += 1; // Increment the inCart value
  } else {
    product.inCart = 1; // First product in the cart
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems)); // Save updated cart items to localStorage
}

// Function to load cart numbers from localStorage when the page loads
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.span').textContent = productNumbers; // Display cart number in navbar
  }
}

// Function to update the total cost in localStorage
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

// Event listener for the "Add Cart" buttons
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    let product = products[i]; // Get corresponding product based on index
    cartNumbers(product); // Update cart count in navbar
    totalCost(product);   // Update total cost in localStorage
  });
}

// Function to display cart items in the cart page
function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += 
        `<div class="product">
          <div class="product-info">
            <img src="./image/${item.tag}.webp" alt="${item.name}" />
            <span>${item.name}</span>
          </div>
          <div class="price">
            <span>&#8377;${item.price}</span>
          </div>
          <div class="quantity">
            <ion-icon name="remove-circle-outline" class="decrease" data-tag="${item.tag}"></ion-icon>
            <span class="quantity-value">${item.inCart}</span>
            <ion-icon name="add-circle-outline" class="increase" data-tag="${item.tag}"></ion-icon>
          </div>
          <div class="total">
            <span>&#8377;${item.inCart * item.price}</span>
          </div>
           <div class="delete-product">
            <ion-icon name="trash" class="delete-btn" data-tag="${item.tag}"></ion-icon>
          </div>
        </div>`;
    });

    productContainer.innerHTML += 
      `<div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket total</h4>
        <h4 class="basketTotal">&#8377;${localStorage.getItem("totalCost")}</h4>
      </div>`;
      productContainer.innerHTML += 
      `<div><button id="buy-now">Buy Now</button></div>`;

    attachEventListeners(); // Attach event listeners for buttons

    // Add event listener to the "Buy Now" button
    document.getElementById('buy-now').addEventListener('click', function () {
      window.location.href = 'payment.html'; // Redirect to payment page
    });
  } else {
    productContainer.innerHTML = `<p>Your cart is empty.</p>`;
  }
}

// Function to attach event listeners for +, - and delete buttons
function attachEventListeners() {
  // Handle increase and decrease quantity
  let increaseBtns = document.querySelectorAll('.increase');
  let decreaseBtns = document.querySelectorAll('.decrease');
  let deleteBtns = document.querySelectorAll('.delete-btn');

  increaseBtns.forEach(button => {
    button.addEventListener('click', () => {
      let productTag = button.getAttribute('data-tag');
      updateQuantity(productTag, 1);
    });
  });

  decreaseBtns.forEach(button => {
    button.addEventListener('click', () => {
      let productTag = button.getAttribute('data-tag');
      updateQuantity(productTag, -1);
    });
  });

  deleteBtns.forEach(button => {
    button.addEventListener('click', () => {
      let productTag = button.getAttribute('data-tag');
      deleteItem(productTag);
    });
  });
}

// Function to update quantity and cart number
function updateQuantity(tag, change) {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let product = cartItems[tag];

  // Update quantity
  product.inCart += change;

  if (product.inCart <= 0) {
    deleteItem(tag); // Remove item if quantity reaches 0
  } else {
    cartItems[tag] = product;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    let totalCost = parseInt(localStorage.getItem("totalCost"));
    localStorage.setItem("totalCost", totalCost + (change * product.price));

    // Update cart numbers in localStorage
    let productNumbers = parseInt(localStorage.getItem('cartNumbers')) + change;
    localStorage.setItem('cartNumbers', productNumbers);

    // Update cart number in navbar
    document.querySelector('.span').textContent = productNumbers;

    displayCart(); // Re-render cart
  }
}

// Function to remove item from cart
function deleteItem(tag) {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let product = cartItems[tag];
  
  // Remove item
  delete cartItems[tag];
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  
  let totalCost = parseInt(localStorage.getItem("totalCost"));
  totalCost -= (product.inCart * product.price);
  localStorage.setItem("totalCost", totalCost);

  // Update cart count in localStorage
  let productNumbers = parseInt(localStorage.getItem('cartNumbers')) - product.inCart;
  localStorage.setItem('cartNumbers', productNumbers);
  
  // Update cart number in navbar
  document.querySelector('.span').textContent = productNumbers; 

  displayCart(); // Re-render cart
}

// Initialize cart numbers on page load
onLoadCartNumbers();

// Display cart items on the cart page
displayCart();

// Uncomment this to clear localStorage when testing
// localStorage.clear();
document.getElementById('buy-now').addEventListener('click', function () {
  // Save cart items to localStorage before navigating
  let cartItems = localStorage.getItem('productsInCart');
  localStorage.setItem('orderItems', cartItems); // Store cart items in 'orderItems'
  
  // Redirect to the payment page
  window.location.href = 'payment.html'; // Redirect to payment page
});
// localStorage.clear();