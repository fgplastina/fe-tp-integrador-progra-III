import { fetchData, createElement } from '../utils.js';

const mainSection = document.querySelector('#main .tiles');
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function init() {
  try {
    const products = await fetchData('/products');
    const categories = await fetchData('/categories');
    allProducts = products;
    renderFilters(categories);
    renderProducts(products);
  } catch (err) {
    console.error('Error cargando datos:', err);
  }
}

function renderFilters(categories) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('category-select-wrapper');

  const select = document.createElement('select');
  select.classList.add('category-select');

  // "Todos"
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'Todos';
  select.appendChild(allOption);

  // Resto de las categorías
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });

  // Evento de cambio
  select.addEventListener('change', () => {
    const selected = select.value;
    if (selected === 'all') {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category_id === parseInt(selected));
      renderProducts(filtered);
    }
  });

  wrapper.appendChild(select);
  mainSection.before(wrapper);
}

function renderProducts(products) {
  mainSection.innerHTML = '';

  products.forEach(p => {
    const article = document.createElement('article');
    article.className = 'style1';

    article.innerHTML = `
      <span class="image"><img src="${p.image_url}" alt="${p.name}" /></span>
      <a href="#!">
        <h2>${p.name}</h2>
        <div class="content">
          <p>$${p.price.toFixed(2)}</p>
          <div class="botones-carrito" data-id="${p.id}" data-nombre="${p.name}" data-precio="${p.price}" data-imagen="${p.image_url}">
            <button class="boton-restar">-</button>
            <button class="boton-sumar">+</button>
          </div>
        </div>
      </a>
    `;

    mainSection.appendChild(article);
  });

  asignarEventosCarrito();
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} agregado al carrito`);
  updateCartCounter();
}

function updateCartCounter() {
  const counter = document.getElementById('cart-counter');
  if (counter) {
    counter.textContent = `🛒 ${cart.length}`;
  }
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Producto removido del carrito`);
    updateCartCounter();
  } else {
    alert('Este producto no está en el carrito');
  }
}

function asignarEventosCarrito() {
  const productos = document.querySelectorAll('.botones-carrito');

  productos.forEach(producto => {
    const id = producto.dataset.id;
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);

    const sumarBtn = producto.querySelector('.boton-sumar');
    const restarBtn = producto.querySelector('.boton-restar');

    sumarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCart(id, nombre, precio);
    });

    restarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeFromCart(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
