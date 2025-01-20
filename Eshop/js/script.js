// JavaScript for typed text effect in search input
const searchInput = document.querySelector('.nav_input');
const texts = [
  "Mobiles",
  "Washing machines",
  "Tvs",
  "Flower vases",
  "Clocks",
  "Tables"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
let typingInterval;
let deletingInterval;

// Function to simulate typing text in the placeholder
function typeText() {
  if (document.activeElement === searchInput) return; // Stop typing if the input is focused

  const currentText = texts[currentTextIndex];

  if (currentCharIndex < currentText.length) {
    searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex + 1));
    currentCharIndex++;
    typingInterval = setTimeout(typeText, 100); // Typing speed (in milliseconds)
  } else {
    // Once the text is fully typed, wait before starting to erase it
    setTimeout(deleteText, 1000); // Pause before deleting (1 second)
  }
}

// Function to simulate deleting text in the placeholder
function deleteText() {
  const currentText = texts[currentTextIndex];
  
  if (currentCharIndex > 0) {
    searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex - 1));
    currentCharIndex--;
    deletingInterval = setTimeout(deleteText, 50); // Deleting speed (in milliseconds)
  } else {
    // Move to the next text
    currentTextIndex = (currentTextIndex + 1) % texts.length; // Cycle through the texts
    typeText(); // Start typing the next text
  }
}

// Stop typing when the user focuses on the input field
searchInput.addEventListener('focus', () => {
  clearTimeout(typingInterval);
  clearTimeout(deletingInterval);
});

// Start typing the first text when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  typeText(); // Start typing the first text as a placeholder
});

// Resume typing when the input field is unfocused and empty
searchInput.addEventListener('blur', () => {
  if (searchInput.value === '') { // Only resume typing if the field is empty
    typeText(); // Resume typing if the field is empty after blur
  }
});

// Swiper initialization
const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 5000,  // Delay between slides in milliseconds
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
});

document.addEventListener("DOMContentLoaded", function() {
  // Ensure wishlist is properly initialized to an empty array if not already set in localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Get the wishlist counter element
  let wishlistCountElement = document.querySelector('#wishlist-count');

  // Initialize the counter (it should be 0 initially if no items are in the wishlist)
  updateWishlistCount();

  // Function to toggle wishlist and update heart icon and wishlist count
  function toggleWishlist(productId) {
    const heartIcon = document.querySelector(`#${productId} .heart`); // Get the heart icon for the product

    if (!heartIcon) {
      console.error("Heart icon not found for product", productId);
      return;
    }

    // Check if the product is already in the wishlist
    if (wishlist.includes(productId)) {
      // Remove from wishlist
      wishlist = wishlist.filter(item => item !== productId);
      heartIcon.src = './image/heart.png';  // Change to default heart icon
    } else {
      // Add to wishlist
      wishlist.push(productId);
      heartIcon.src = './image/red_heart.png';  // Change to red heart icon
    }

    // Save the updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update the wishlist count in the navbar
    updateWishlistCount();
  }

  // Update wishlist count in the navbar
  function updateWishlistCount() {
    // Update the wishlist count displayed in the navbar
    wishlistCountElement.textContent = wishlist.length;
  }

  // On page load, check which products are in the wishlist and update heart icons to red for added items
  wishlist.forEach(productId => {
    const heartIcon = document.querySelector(`#${productId} .heart`);
    if (heartIcon) {
      heartIcon.src = './image/red_heart.png';  // Red heart icon for added items
    }
  });

  // Placeholder function for the eye button click (could open product details)
  function viewProduct(productId) {
    console.log("View product:", productId);  // Debugging line
    // Add logic to show product details in a modal or redirect to the product page
  }

  // Expose functions for global access
  window.toggleWishlist = toggleWishlist;
  window.viewProduct = viewProduct;
});


let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

// Add event listeners for eye-icon click
document.querySelectorAll('.icon-container .eye-icon').forEach(eyeIcon => {
  eyeIcon.onclick = () => {
    // Get the parent product id or data-name
    let product = eyeIcon.closest('.images');
    let name = product.getAttribute('data-name');

    // Display the preview container
    preveiwContainer.style.display = 'flex';

    // Show the matching preview box by adding the 'active' class
    previewBox.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name === target) {
        preview.classList.add('active');
      } else {
        preview.classList.remove('active');
      }
    });

    // Display the icon overlay
    let iconContainer = product.querySelector('.icon-container');
    iconContainer.style.background = 'rgba(0, 0, 0, 0.5)';  // Adding background overlay on icons
  };
});

// Close the preview when the close button is clicked
previewBox.forEach(close => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';

    // Remove the background overlay from icons when preview is closed
    document.querySelectorAll('.icon-container').forEach(iconContainer => {
      iconContainer.style.background = '';  // Reset the icon container background
    });
  };
});
