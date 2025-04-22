
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalDisplay.innerHTML = "";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="80">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price} UGX</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    cartTotalDisplay.innerHTML = `<h3>Total: ${total} UGX</h3>`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    alert("Checkout process will be added later!");
}

document.addEventListener("DOMContentLoaded", updateCartDisplay);
