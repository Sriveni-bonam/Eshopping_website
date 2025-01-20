// Product data array
const product = [
    { id: 1, image: './image/vase1.webp', name: "Gold iron apple shape pot", title: "flower vase pot", oldprice: 2299, price: 1500 },
    { id: 2, image: './image/chair2.webp', name: "Jesse Leather | 1 seating sofa", title: "chair", oldprice: 44000, price: 22000 },
    { id: 3, image: './image/chair1.webp', name: "Shay Coffee Table Set", title: "chair", oldprice: 25000, price: 15000 },
    { id: 4, image: './image/vase2.webp', name: "Half Moon Design Metal Desk Pot (Gold)", title: "flower vase pot", oldprice: 999, price: 449 },
    { id: 5, image: './image/vase3.webp', name: "Preston Iron Grey Desk Pot", title: "flower vase pot", oldprice: 349, price: 249 },
    { id: 6, image: './image/vase4.webp', name: "White Metal Desk Pots", title: "flower vase pot", oldprice: 517, price: 290 },
    { id: 7, image: './image/vase5.webp', name: "Black Metal Hanging Planters", title: "flower vase pot", oldprice: 999, price: 549 },
    { id: 8, image: './image/laptop1.webp', name: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen 12450H", title: "laptop", oldprice: 69790, price: 46990 },
    { id: 9, image: './image/laptop2.webp', name: "Acer Predator Helios Neo 16 Intel Core i7 14th Gen 14700HX", title: "laptop", oldprice: 142999, price: 114990 },
    { id: 10, image: './image/laptop3.webp', name: "Lenovo V14 Intel Core i5 12th Gen 1235U", title: "laptop", oldprice: 37990, price: 47990 },
    { id: 11, image: './image/laptop5.webp', name: "HP Intel Core i5 12th Gen 1235U", title: "laptop", oldprice: 70502, price: 47680 },
    { id: 12, image: './image/laptop4.webp', name: "DELL 15 AMD Ryzen 3 Quad Core 7320U", title: "laptop", oldprice: 47990, price: 37990 },
    { id: 13, image: './image/laptop6.webp', name: "Apple MacBook AIR Apple M2", title: "laptop", oldprice: 99900, price: 74900 },
    { id: 14, image: './image/mouse1.webp', name: "Logitech G102 Light Sync", title: "mouse", oldprice: 1995, price: 1190 },
    { id: 15, image: './image/mouse2.webp', name: "Arctic Fox Breathing Lights and DPI Upto 3600 Wired Optical Gaming Mouse", title: "mouse", oldprice: 599, price: 249 },
    { id: 16, image: './image/clock1.webp', name: "Classic & Modern Multicolour Plastic Wall Clock", title: "clock alarm", oldprice: 1499, price: 799 },
    { id: 17, image: './image/clock2.webp', name: "Octave Roman Black Iron Table Clock", title: "clock alarm", oldprice: 1299, price: 1049 },
    { id: 18, image: './image/clock3.webp', name: "Green Plastic Double Sided 2 Faces Platform Clock", title: "clock alarm", oldprice: 9999, price: 6549 },
    { id: 19, image: './image/tv1.webp', name: "MOTOROLA EnvisionX 127 cm (50 inch) Ultra HD (4K)", title: "tv", oldprice: 49999, price: 32999 },
    { id: 20, image: './image/tv2.webp', name: "SAMSUNG New D Series Brighter Crystal 4K Vision Pro (2024 Edition) ", title: "tv", oldprice: 50990, price: 44990 },
    { id: 21, image: './image/sofa1.webp', name: "Palermo Fabric 3 Seater Sofa", title: "sofa", oldprice: 14999, price: 12999 },
    { id: 22, image: './image/sofa2.webp', name: "Nipul Fabric 3 Seater Sofa", title: "sofa", oldprice: 20990, price: 14990 },
    { id: 23, image: './image/bed1.webp', name: "Cambert Leatherette bed", title: "bed", oldprice: 74999, price: 61299 },
    { id: 24, image: './image/bed2.webp', name: "Takai Queen Size Bed in Wenge Finish", title: "bed", oldprice: 50990, price: 44990 },
];

// Get category and search query from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') ? urlParams.get('category').toLowerCase() : "all";
const searchQuery = urlParams.get('query') ? urlParams.get('query').toLowerCase() : "";

// Filter products based on both category and search query
const filteredProducts = product.filter(item => 
    (category === "all" || item.title.toLowerCase().includes(category)) &&
    item.title.toLowerCase().includes(searchQuery)
);
const displayItem = (items) => {
    const rootElement = document.getElementById('root');
    
    if (items.length === 0) {
        rootElement.innerHTML = "<p>No products found matching your search and category.</p>";
    } else {
        rootElement.innerHTML = items.map((item) => {
            const { image, name, title, oldprice, price, id } = item;
            return `
                <div class="images" id="product-${id}" data-name="product-${id}">
                    <div class="icon-container">
                        <div class="icon-box heart-icon" onclick="toggleWishlist('product-${id}')">
                            <img src="./image/heart.png" class="heart" alt="Heart Icon" />
                        </div>
                        <div class="icon-box eye-icon" data-product-id="${id}">
                            <img src="./image/view.png" class="eye" alt="Eye Icon" />
                        </div>
                    </div>
                    <img src="${image}" alt="product image">
                    <h3>${name}</h3>
                    <div class="prices">
                        <p class="old-price">&#8377;${oldprice}.00</p>
                        <p class="new-price">&#8377;${price}.00</p>
                    </div>
                    <a class="add-cart cart${id}" href="#prod" data-id="${id}">Add to Cart</a>
                </div>

                <!-- Product Preview Card -->
                <div class="products-preview" style="display:none;">
                    <div class="preview" data-target="product-${id}">
                        <i class="fas fa-times"></i>
                        <img src="${image}" alt="${name}">
                        <h3>${name}</h3>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(250)</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolorem.</p>
                        <div class="price">&#8377;${price}</div>
                        <div class="buttons">
                            <a href="#" class="buy">Buy now</a>
                            <a href="#" class="cart">Add to cart</a>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Get the preview container
    let previewContainer = document.querySelector('.products-preview');
    
    // Add event listeners for each eye-icon click
    document.querySelectorAll('.icon-container .eye-icon').forEach(eyeIcon => {
        eyeIcon.onclick = () => {
            let productId = eyeIcon.getAttribute('data-product-id');
            let product = document.querySelector(`#product-${productId}`);
            let name = product.getAttribute('data-name');

            // Find the preview box that corresponds to the clicked product's id
            let previewBox = document.querySelector(`.preview[data-target="product-${productId}"]`);

            // Display the preview container and the corresponding preview box
            previewContainer.style.display = 'flex';
            previewBox.style.display = 'inline-block'; // Make the current preview visible

            // Display the icon overlay on the clicked product's icons
            let iconContainer = product.querySelector('.icon-container');
            iconContainer.style.background = 'rgba(0, 0, 0, 0.5)';
        };
    });

    // Close the preview when the close button is clicked
    document.querySelectorAll('.products-preview .fa-times').forEach(closeIcon => {
        closeIcon.addEventListener('click', () => {
            // Hide the preview container
            previewContainer.style.display = 'none';
            
            // Reset all preview boxes' display to none
            document.querySelectorAll('.preview').forEach(preview => {
                preview.style.display = 'none';
            });

            // Reset the background overlay from the icons
            document.querySelectorAll('.icon-container').forEach(iconContainer => {
                iconContainer.style.background = ''; // Reset the icon container background
            });
        });
    });
};


    // Add event listeners to 'Add to Cart' buttons
    const addCartButtons = document.querySelectorAll('.add-cart');
    addCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const product = items.find(p => p.id == productId);
            cartNumbers(product); // Update the cart count
            totalCost(product);   // Update the total cost
        });
    });

// Display the filtered products
displayItem(filteredProducts);
