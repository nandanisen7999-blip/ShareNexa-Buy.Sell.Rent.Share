
// SHARE NEXA JAVASCRIPT

// 1. PRODUCT SEARCH
const searchInput = document.querySelector(
    '#explore input[type="search"]'
);

const categorySelect = document.querySelector(
    '#explore select'
);

const productCards = document.querySelectorAll('.product-card');

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    productCards.forEach(function(card) {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('p').textContent.toLowerCase();

        const matchesSearch =
            productName.includes(searchText) ||
            productDescription.includes(searchText);

        const matchesCategory =
            selectedCategory === 'all categories' ||
            card.dataset.category === selectedCategory;

        card.style.display =
            matchesSearch && matchesCategory ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);


// 2. BUY, RENT AND SELL BUTTONS
document.addEventListener('click', function(event) {
    const button = event.target;

    if (button.tagName !== 'BUTTON') return;

    const card = button.closest('.product-card');

    if (!card) return;

    const productName = card.querySelector('h3').textContent;

    if (button.textContent.trim() === 'Buy') {
        alert('You selected to buy: ' + productName);
    }

    if (button.textContent.trim() === 'Rent') {
        alert('You selected to rent: ' + productName);
    }

    if (button.textContent.trim() === 'Sell') {
        document.querySelector('#sell').scrollIntoView({
            behavior: 'smooth'
        });
    }

    if (button.textContent.trim() === 'Chat with Owner') {
        const message = prompt(
            'Start a conversation about ' + productName
        );

        if (message && message.trim() !== '') {
            alert('Demo message: ' + message);
        }
    }
});


// 3. ADD NEW PRODUCT
const sellForm = document.querySelector('#sell form');
const productContainer = document.querySelector('.product-container');

sellForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputs = sellForm.querySelectorAll('input');
    const productName = inputs[0].value.trim();
    const category = inputs[1].value.trim();
    const buyPrice = inputs[2].value;
    const rentPrice = inputs[3].value;
    const location = inputs[4].value.trim();
    const description = sellForm.querySelector('textarea').value.trim();
    const imageFile = inputs[5].files[0];

    if (!productName || !category || !buyPrice || !rentPrice ||
        !location || !description || !imageFile) {
        alert('Please fill all product details and select a photo.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const newCard = document.createElement('div');
        newCard.className = 'product-card';
        newCard.dataset.category = category.toLowerCase();

        const image = document.createElement('img');
        image.src = reader.result;
        image.alt = productName;

        const heading = document.createElement('h3');
        heading.textContent = productName;

        const desc = document.createElement('p');
        desc.textContent = description;

        const buy = document.createElement('p');
        buy.textContent = 'Buy Price: ₹' + buyPrice;

        const rent = document.createElement('p');
        rent.textContent = 'Rent Price: ₹' + rentPrice + '/day';

        const place = document.createElement('p');
        place.textContent = 'Location: ' + location;

        newCard.append(image, heading, desc, buy, rent, place);

        ['Buy', 'Rent', 'Sell', 'Chat with Owner'].forEach(function(label) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = label;
            newCard.appendChild(btn);
        });

        productContainer.appendChild(newCard);

        alert('Your product has been added!');
        sellForm.reset();
    };

    reader.readAsDataURL(imageFile);
});


// 4. BASIC SIGNUP DEMO
const signupForm = document.querySelector('#signup form');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputs = signupForm.querySelectorAll('input');

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill all signup details.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    localStorage.setItem('shareNexaUser', JSON.stringify({
        name: name,
        email: email,
        password: password
    }));

    alert('Signup successful! Now you can login.');
    signupForm.reset();
});


// 5. BASIC LOGIN DEMO
const loginForm = document.querySelector('#login form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputs = loginForm.querySelectorAll('input');
    const email = inputs[0].value.trim();
    const password = inputs[1].value;

    const savedUser = localStorage.getItem('shareNexaUser');

    if (!savedUser) {
        alert('Please create an account first.');
        return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {
        alert('Welcome to ShareNexa, ' + user.name + '!');
        loginForm.reset();
    } else {
        alert('Incorrect email or password.');
    }
});


// 6. WELCOME MESSAGE
console.log('Welcome to ShareNexa!');
console.log('ShareNexa JavaScript loaded successfully.');
