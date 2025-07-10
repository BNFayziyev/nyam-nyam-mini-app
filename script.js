
let tg = window.Telegram.WebApp;
tg.expand();

const products = [
    { id: 1, name: "Nestle yormasi", price: 12000 },
    { id: 2, name: "Agusha pyuresi", price: 10000 },
    { id: 3, name: "Bebi yormasi", price: 15000 },
    { id: 4, name: "Fruto pyuresi", price: 11000 }
];

const cart = [];
const productContainer = document.getElementById("products");
const cartCount = document.getElementById("cartCount");

function renderProducts() {
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h4>${p.name}</h4>
            <p>${p.price} so'm</p>
            <button class="add-btn" onclick="addToCart(${p.id})">➕ Qo'shish</button>
        `;
        productContainer.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    cartCount.textContent = cart.length;
}

function openCart() {
    const order = {
        user: tg.initDataUnsafe.user,
        items: cart
    };
    tg.sendData(JSON.stringify(order));
}

renderProducts();
