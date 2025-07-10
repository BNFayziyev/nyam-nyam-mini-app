
let tg = window.Telegram.WebApp;
tg.expand();

const products = [
  { id: 1, name: "Bolalar yormasi", brand: "Nestle", price: 12000, image: "https://via.placeholder.com/100", sizes: ["120g", "250g"] },
  { id: 2, name: "Bolalar pyuresi", brand: "Agusha", price: 10000, image: "https://via.placeholder.com/100", sizes: ["90g", "180g"] }
];

const cart = [];

const productsEl = document.getElementById("products");

function renderProducts() {
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" />
      <h4>${p.name}</h4>
      <small>${p.brand}</small>
      <p><b>${p.price} UZS</b></p>
      <select>${p.sizes.map(s => `<option>${s}</option>`).join("")}</select>
      <div class="actions">
        <button class="add-btn" onclick="addToCart(${p.id})">🛒</button>
        <button class="heart-btn">❤️</button>
      </div>
    `;
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const p = products.find(prod => prod.id === id);
  cart.push(p);
  tg.sendData(JSON.stringify({ items: cart }));
}

renderProducts();
