// Function to display cart items on the payment page
function displayPaymentDetails() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productContainer = document.getElementById("payment-products-list");
    let totalCost = localStorage.getItem("totalCost");
  
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
              <span class="quantity-value">${item.inCart}</span>
            </div>
            <div class="total">
              <span>&#8377;${item.inCart * item.price}</span>
            </div>
          </div>`;
      });
  
      document.getElementById('total-cost').textContent = "₹" + totalCost;
    }
  }
  
  // Function to handle payment
  document.getElementById('pay-now').addEventListener('click', function () {
    alert("Payment successful! Thank you for your purchase.");
    // Clear cart after payment
    localStorage.clear();
    window.location.href = 'thankyou.html'; // Redirect to a thank you page
  });
  
  // Display cart details on the payment page
  displayPaymentDetails();
  