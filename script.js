// ============================================
// DERALUX - E-Commerce Shopping Cart System
// ============================================

// Product Database
const products = [
    {
        id: 1,
        name: "Dera one",
        description: "A lightweight, flowing dera designed for everyday comfort with an elegant finish.",
        price: 450,
        image: "images/image3.jpeg",
        available: false
    },
    {
        id: 2,
        name: "Dera two",
        description: "Crafted for effortless wear, this dera offers a relaxed fit and timeless silhouette.",
        price: 450,
        image: "images/image4.jpeg",
        available: true
    },
    {
        id: 3,
        name: "Dera three",
        description: "Dera nyepesi na linalotiririka, limeundwa kwa faraja ya kila siku na mvuto wa kipekee",
        price: 450,
        image: "images/image5.jpeg",
        available: true
    },
    {
        id: 4,
        name: "Dera four",
        description: "Dera hili lina muundo mpana unaotoa uhuru wa kuvaa na mwonekano wa heshima.",
        price: 450,
        image: "images/image6.jpeg",
        available: true
    },
    {
        id: 5,
        name: "Dera five",
        description: "Kitambaa laini kinachopumua na kuanguka vizuri—linalofaa kwa matumizi ya nyumbani au matembezi ya kawaida",
        price: 450,
        image: "images/image7.jpeg",
        available: false
    },
    {
        id: 6,
        name: "Dera six",
        description: "Muunganiko wa kisasa na mtindo wa asili wa dera kwa mwanamke wa leo.",
        price: 450,
        image: "images/image8.jpeg",
        available: false
    },
    {
        id: 7,
        name: "Dera seven",
        description: "Limeundwa kukupa faraja siku nzima bila kupoteza uzuri wa mwonekano.",
        price: 450,
        image: "images/image9.jpeg",
        available: true
    },
    {
        id: 8,
        name: "Dera eight",
        description: "Rahisi, maridadi na linalofaa kwa matumizi ya kila siku.",
        price: 450,
        image: "images/image10.jpeg",
        available: true
    },
    {
        id: 9,
        name: "Dera nine",
        description: "Vazi la tabaka mbili linalotoa staili ya heshima kwa hafla au matumizi maalum.",
        price: 450,
        image: "images/image11.jpeg",
        available: false
    },
    {
        id: 10,
        name: "Dera ten",
        description: "Seti kamili ya dera na mtandio inayokupa mwonekano wa heshima na ustaarabu.",
        price: 450,
        image: "images/image12.jpeg",
        available: true
    },
    {
        id: 11,
        name: "Dera eleven",
        description: "Muunganiko wa dera linalotiririka na mtandio  inayokamilisha vazi kwa uzuri.",
        price: 450,
        image: "images/image13.jpeg",
        available: false
    },
    {
        id: 12,
        name: "Dera twelve",
        description: "Muonekano kamili wa heshima, faraja na maridadi kwa mwanamke wa kisasa",
        price: 450,
        image: "images/image9.jpeg",
        available: true
    }
];

// Shopping Cart Array
let cart = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    renderProducts();
    updateCartUI();
});

// Render Products Grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card Element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';

    const availabilityBadge = product.available
        ? '<span class="product-badge badge-available">Available</span>'
        : '<span class="product-badge badge-out-of-stock">Out of Stock</span>';

    const buttonHTML = product.available
        ? `<button class="btn btn-add-cart" onclick="addToCart(${product.id})">
               <i class="bi bi-cart-plus me-1"></i> Add to Cart
           </button>`
        : `<button class="btn btn-add-cart" disabled>
               Out of Stock
           </button>`;

    col.innerHTML = `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${availabilityBadge}
            </div>
            <div class="product-body">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                    ${buttonHTML}
                </div>
            </div>
        </div>
    `;

    return col;
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product || !product.available) {
        alert('This product is not available');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showCartNotification();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Update cart count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();

    // Show/hide empty cart message
    if (cart.length === 0) {
        cartItems.classList.remove('has-items');
        emptyCart.style.display = 'block';
        checkoutBtn.disabled = true;
    } else {
        cartItems.classList.add('has-items');
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;
    }

    // Render cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });
}

// Create Cart Item Element
function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="bi bi-dash"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${item.id})">
            <i class="bi bi-trash fs-5"></i>
        </button>
    `;

    return div;
}

// Show Cart Notification
function showCartNotification() {
    // You can implement a toast notification here
    // For now, we'll just update the UI
    const cartBtn = document.querySelector('.btn-cart');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Build WhatsApp message
    let message = '*DERALUX ORDER*\n\n';
    message += '📦 *Order Details:*\n';
    message += '─────────────────\n';

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × KSh ${item.price.toLocaleString()}\n`;
        message += `   Subtotal: KSh ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += '─────────────────\n';
    message += `💰 *Total: KSh ${total.toLocaleString()}*\n\n`;
    message += 'Please confirm this order and provide payment details.';

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp number (Kenya format: 254119024241)
    const whatsappNumber = '254784307078';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('deralux_cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('deralux_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    }
});

// ============================================
// FLOATING ANNOUNCEMENT CONTROL
// ============================================

// Toggle announcement visibility - Set to true to show, false to hide
const SHOW_ANNOUNCEMENT = true; // Change this to false to hide the announcement

// Initialize announcement on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnnouncement();
});

function initializeAnnouncement() {
    const announcement = document.getElementById('floatingAnnouncement');
    
    // Admin setting takes priority
    // If admin says show it (true), always show it on every refresh
    // If admin says hide it (false), always hide it
    if (SHOW_ANNOUNCEMENT) {
        announcement.classList.remove('hidden');
    } else {
        announcement.classList.add('hidden');
    }
}

// Hide announcement function (only hides temporarily until page refresh)
function hideAnnouncement() {
    const announcement = document.getElementById('floatingAnnouncement');
    announcement.classList.add('hidden');
    
    // Note: This only hides until refresh. If SHOW_ANNOUNCEMENT is true,
    // the announcement will reappear on page refresh
}

// Function to show announcement (can be called from browser console)
function showAnnouncement() {
    const announcement = document.getElementById('floatingAnnouncement');
    announcement.classList.remove('hidden');
}

// Admin function to toggle announcement globally
// To turn ON: Change SHOW_ANNOUNCEMENT to true (announcement reappears on every page load)
// To turn OFF: Change SHOW_ANNOUNCEMENT to false (announcement never shows)

// ============================================
// VIDEO SHOWCASE SECTION CONTROL
// ============================================

// Toggle video section visibility - Set to true to show, false to hide
const SHOW_VIDEO_SECTION = true; // Change this to false to hide the video section

// Initialize video section on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoSection();
});

function initializeVideoSection() {
    const videoSection = document.getElementById('videoShowcase');
    
    if (!videoSection) return;
    
    // Admin setting controls visibility
    if (SHOW_VIDEO_SECTION) {
        videoSection.classList.remove('hidden');
    } else {
        videoSection.classList.add('hidden');
    }
}

// Admin function to toggle video section globally
// To turn ON: Change SHOW_VIDEO_SECTION to true
// To turn OFF: Change SHOW_VIDEO_SECTION to false

