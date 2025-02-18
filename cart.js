document.addEventListener('DOMContentLoaded', function() {
    const DEBUG = true;
    
    function log(message) {
        if (DEBUG) console.log(message);
    }

    // Get all required elements
    const elements = {
        cartIcon: document.querySelector('.cart-trigger'),
        cartSidebar: document.querySelector('.cart-sidebar'),
        cartOverlay: document.querySelector('.cart-overlay'),
        cartClose: document.querySelector('.close'),
        addCartButtons: document.querySelectorAll('.add-cart'),
        cartItemsContainer: document.querySelector('.cart-items'),
        totalElement: document.querySelector('.total')
    };

    let cartItems = [];

    function createCartItemElement(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>RWF ${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn plus">+</button>
                        <button class="trash-btn">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function updateCartDisplay() {
        elements.cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = createCartItemElement(item);
            elements.cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.minus').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartDisplay();
                }
            });

            cartItem.querySelector('.plus').addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay();
            });

            cartItem.querySelector('.trash-btn').addEventListener('click', () => {
                cartItems = cartItems.filter(i => i !== item);
                updateCartDisplay();
            });
        });

        elements.totalElement.textContent = `Total: RWF ${total.toLocaleString()}`;
    }

    function toggleCart(show = null) {
        const isActive = elements.cartSidebar.classList.contains('active');
        if (show === true || (show === null && !isActive)) {
            elements.cartSidebar.classList.add('active');
            elements.cartOverlay.classList.add('active');
        } else {
            elements.cartSidebar.classList.remove('active');
            elements.cartOverlay.classList.remove('active');
        }
    }

    // Ensure the cart is hidden initially
    elements.cartSidebar.classList.remove('active');
    elements.cartOverlay.classList.remove('active');

    elements.cartClose.addEventListener('click', toggleCart);
    elements.cartOverlay.addEventListener('click', toggleCart);

    elements.addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.row');
            const item = {
                name: productContainer.querySelector('h4').textContent,
                price: parseInt(productContainer.querySelector('p').textContent.replace('RWF ', '').replace(',', '')),
                quantity: 1,
                image: productContainer.querySelector('img').src
            };
            cartItems.push(item);
            updateCartDisplay();
            toggleCart(true);
        });
    });

    if (elements.cartIcon) {
        elements.cartIcon.addEventListener('click', toggleCart);
    }
}); 