
let tg = window.Telegram.WebApp;
tg.expand();

const products = [
    { id: 1, name: "Nestle yormasi", price: 12000 },
    { id: 2, name: "Agusha pyuresi", price: 10000 },
    { id: 3, name: "Bebi yormasi", price: 15000 },
];

const productContainer = document.getElementById("products");

products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h4>${p.name}</h4><p>${p.price} so'm</p>`;
    productContainer.appendChild(div);
});

document.getElementById("submitBtn").addEventListener("click", () => {
    const order = {
        user: tg.initDataUnsafe.user,
        items: products.map(p => ({ id: p.id, name: p.name }))
    };
    tg.sendData(JSON.stringify(order));
});
