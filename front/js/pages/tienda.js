import { fetchData, createElement } from '../utils.js';

const mainSection = document.querySelector('#main .tiles');

let cart = loadCart();

async function init() {
  const products = await fetchData('/products');
  const categories = await fetchData('/categories');
  renderFilters(categories, products);
  renderProducts(products);
}


function loadCart() {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} agregado al carrito`);
}

function updateCartCounter() {
  const counter = document.getElementById('cart-counter');
  if (counter) counter.textContent = `🛒 ${cart.length}`;
}

function renderFilters(categories, products) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('category-select-wrapper');

  const select = document.createElement('select');
  select.classList.add('category-select');

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'Todos';
  select.appendChild(allOption);

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });

  select.onchange = () => {
    const selected = select.value;
    if (selected === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category_id === parseInt(selected));
      renderProducts(filtered);
    }
  };

  wrapper.appendChild(select);
  mainSection.before(wrapper);
}

function renderProducts(productList) {
  mainSection.innerHTML = '';

  productList.forEach(p => {
    const article = document.createElement('article');
    article.className = 'style1';

    article.dataset.id = p.id;
    article.dataset.name = p.name;
    article.dataset.price = p.price;

    article.innerHTML = `
      <span class="image"><img src="${p.image_url}" alt="${p.name}" /></span>
      <a href="#!">
        <h2>${p.name}</h2>
        <div class="content">
          <p>$${p.price.toFixed(2)}</p>
        </div>
      </a>
    `;

    article.addEventListener('click', () => {
      const id = parseInt(article.dataset.id);
      const name = article.dataset.name;
      const price = parseFloat(article.dataset.price);
      addToCart(id, name, price);
    });

    mainSection.appendChild(article);
  });
}


document.addEventListener('DOMContentLoaded', init);
