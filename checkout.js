document.addEventListener('DOMContentLoaded', function() {
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display order summary
    const orderItems = document.querySelector('.order-items');
    const checkoutTotal = document.getElementById('checkout-total');
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <span>RWF ${itemTotal.toLocaleString()}</span>
        `;
        orderItems.appendChild(itemElement);
    });

    checkoutTotal.textContent = `RWF ${total.toLocaleString()}`;

    // Handle form submission
    const placeOrderBtn = document.querySelector('.place-order-btn');
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!fullName || !email || !phone) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the order to your backend
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear the cart
        window.location.href = 'index.html'; // Redirect to home page
    });
});