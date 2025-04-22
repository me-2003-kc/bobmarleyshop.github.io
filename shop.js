document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');
    const productCards = document.querySelectorAll('.product-card');
    
    // Filter products
    function filterProducts() {
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;
        
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardPrice = parseInt(card.dataset.price);
            
            // Category filter
            const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
            
            // Price filter
            let priceMatch = true;
            if (priceValue === '0-50000') {
                priceMatch = cardPrice <= 50000;
            } else if (priceValue === '50000-100000') {
                priceMatch = cardPrice > 50000 && cardPrice <= 100000;
            } else if (priceValue === '100000') {
                priceMatch = cardPrice > 100000;
            }
            
            // Show/hide based on filters
            if (categoryMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Sort products
    function sortProducts() {
        const sortValue = sortBy.value;
        const productsContainer = document.querySelector('.products-grid');
        const products = Array.from(productCards);
        
        products.sort((a, b) => {
            const aPrice = parseInt(a.dataset.price);
            const bPrice = parseInt(b.dataset.price);
            
            switch (sortValue) {
                case 'price-low':
                    return aPrice - bPrice;
                case 'price-high':
                    return bPrice - aPrice;
                case 'newest':
                
                    return Math.random() - 0.5;
                default: // popular
                    
                    return Math.random() - 0.5;
            }
        });
        
        // Re-append sorted products
        products.forEach(product => {
            productsContainer.appendChild(product);
        });
    }
    
    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', sortProducts);
    
    // Quick view functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Set modal content
            document.getElementById('modal-product-img').src = productImage;
            document.getElementById('modal-product-title').textContent = productName;
            document.getElementById('modal-product-price').textContent = productPrice;
            document.getElementById('modal-product-desc').textContent = `This is a description for ${productName}. In a real application, this would come from your product database.`;
            
            // Show modal
            document.getElementById('quick-view-modal').style.display = 'block';
        }
        
        if (e.target.classList.contains('close-modal') || e.target === document.getElementById('quick-view-modal')) {
            document.getElementById('quick-view-modal').style.display = 'none';
        }
    });
});

// Filter products by category
document.getElementById('category-filter').addEventListener('change', (e) => {
    const category = e.target.value;
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });
  });

  // Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.dataset.id || Math.random().toString(36).substr(2, 9),
            name: productCard.querySelector('h3').textContent,
            price: parseInt(productCard.dataset.price),
            image: productCard.querySelector('img').src
        };
        
        addToCart(product);
    }
});



document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const card = event.target.closest('.product-card');
        const name = card.querySelector('h3').innerText;
        const priceText = card.querySelector('.current-price').innerText;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        const image = card.querySelector('img').src;

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = existingCart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            existingCart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert(`${name} added to cart`);
    });
});
