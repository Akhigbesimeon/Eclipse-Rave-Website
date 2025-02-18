const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 0);
});

let menu = document.querySelector('.navmenu');
let closeBtn = document.querySelector('.close-btn');
let menuBtn = document.querySelector('#menu-icon');

menuBtn.onclick = () => {
    menu.classList.add('open');
}

closeBtn.onclick = () => {
    menu.classList.remove('open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
        menuBtn.classList.remove("bx-x");
        menu.classList.remove("open");
    }
});

// Close menu when clicking a nav link
navlinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove("bx-x");
        menu.classList.remove("open");
    });
});

menuOverlay.onclick = () => {
    menuBtn.classList.remove("bx-x");
    menu.classList.remove("open");
    menuOverlay.classList.remove("active");
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug log

    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const cartClose = document.querySelector('.cart-close');
    let cart = [];

    // Debug check if elements exist
    console.log('Cart sidebar exists:', !!cartSidebar);
    console.log('Cart overlay exists:', !!cartOverlay);

    // Add to cart functionality
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Add cart clicked'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            
            const product = this.closest('.row');
            const productInfo = {
                id: Date.now(),
                image: product.querySelector('img').src,
                name: product.querySelector('.price h4').textContent,
                price: product.querySelector('.price p').textContent,
                quantity: 1
            };
            
            console.log('Product info:', productInfo); // Debug log
            addToCart(productInfo);
        });
    });

    // Close cart
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    function openCart() {
        console.log('Opening cart'); // Debug log
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
    }

    function addToCart(product) {
        console.log('Adding to cart:', product); // Debug log
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(product);
        }
        
        updateCartDisplay();
        openCart();
    }

    function updateCartDisplay() {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <i class='bx bx-trash remove-item'></i>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => {
            const price = parseInt(item.price.replace('RWF ', ''));
            return sum + (price * item.quantity);
        }, 0);
        
        cartTotal.textContent = `RWF ${total}`;
        addCartItemListeners();
    }

    function addCartItemListeners() {
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const id = parseInt(cartItem.dataset.id);
                const item = cart.find(item => item.id === id);
                
                if (e.target.classList.contains('plus')) {
                    item.quantity++;
                } else if (e.target.classList.contains('minus')) {
                    item.quantity = Math.max(0, item.quantity - 1);
                    if (item.quantity === 0) {
                        cart = cart.filter(cartItem => cartItem.id !== id);
                    }
                }
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const id = parseInt(cartItem.dataset.id);
                cart = cart.filter(item => item.id !== id);
                updateCartDisplay();
            });
        });
    }
});
