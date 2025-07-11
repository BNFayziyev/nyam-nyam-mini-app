
let tg = window.Telegram.WebApp;
tg.expand();

const products = [
  { id: 1, name: "Nutrilon", brand: "AP", price: 249000, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fchado.uz%2Fproducts%2Fnutricia-nutrilon-ar-premium-sukhaia-smies-0-mies-400-gh%3F_pos%3D27%26_fid%3D4a1e1cfe7%26_ss%3Dc%26srsltid%3DAfmBOoprxDglP2F9oZiRphHKNf8ZBsUPs3ziM5SV--PbOxLZkFiXv1BI&psig=AOvVaw3mNZ4ii-EoI-nipB4UYcaj&ust=1752268503115000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiUzo2bs44DFQAAAAAdAAAAABAL", sizes: ["120g", "250g"] },
  { id: 2, name: "Nutrilon", brand: "ПРЕ", price: 249000, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fchado.uz%2Fproducts%2Fnutricia-nutrilon-ar-premium-sukhaia-smies-0-mies-400-gh%3Fvariant%3D41049389531193%26country%3DUZ%26currency%3DUZS%26srsltid%3DAfmBOooibtp5WGFzeVDBU8h3hZmvaXxfFFT0FV53XIBGwYM0TehGbCN2&psig=AOvVaw3mNZ4ii-EoI-nipB4UYcaj&ust=1752268503115000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiUzo2bs44DFQAAAAAdAAAAABAV", sizes: ["90g", "180g"] }
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
