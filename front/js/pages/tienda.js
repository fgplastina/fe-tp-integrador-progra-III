import { fetchData, createElement } from '../utils.js';

const mainSection = document.querySelector('#main .tiles');

let cart = loadCart();

async function init() {
  const products = await fetchData('/products');
  const categories = await fetchData('/categories');
  renderFilters(categories, products);
  renderProducts(products);
  renderCarrito();
  asignarEventosCarrito();
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
    asignarEventosCarrito();
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
          <div class="botones-carrito" data-id=${p.id} data-nombre=${p.nombre} data-precio=${p.precio} data-imagen=${p.image_url}>
            <button class="boton-restar">-</button>
            <button class="boton-sumar">+</button>
          </div>
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

function renderCarrito() {
  let carrito = [];
  const contenedorCarrito = document.getElementById("items-carrito");

  function actualizarCarrito() {
      contenedorCarrito.innerHTML = '';
      carrito.forEach(producto => {
          const item = document.createElement('li');
          item.className = 'bloque-item';
          item.innerHTML = `
          <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
          <button id=${producto.id} class="boton-eliminar">Eliminar</button>
          `;
          contenedorCarrito.appendChild(item);

          const conteo = document.createElement('div');
          conteo.className = 'botonesContadorCarrito';
          conteo.innerHTML = `
          <div class="botonesContadorCarrito">
              <button onclick="restarCantidadCarrito(${producto.id})">-</button>
              <span id="${producto.id}">1</span>
              <button onclick="sumarCantidadCarrito(${producto.id})">+</button>
          </div>
          `;

          item.appendChild(conteo);
      });
  }

  function eliminarProducto(idFruta) {
      carrito = carrito.filter((fruta) => fruta.id !== Number(idFruta));
      mostrarCarrito();
  }


  function almacenarCarritoLocalStorage() {
      const jsonFrutas = JSON.stringify(arrayFrutas);
      localStorage.setItem("frutas", jsonFrutas);

  }

  function recuperarCarritoLocalStorage() {
      const datosFrutasCarrito = localStorage.getItem("frutas");

      if (datosFrutasCarrito) {
          carrito = JSON.parse(datosFrutasCarrito);
          console.log("Se cargaron datos guardados del carrito.");
      } else {
      console.log("No se encontraron datos guardados del carrito");
      }

  }


  function actualizarContadorCarrito() {
      const contadorCarrito = document.getElementById("contador-carrito");
      contenedorCarrito.textContent = carrito.length;
  }

  function sumarAlCarrito() {
      if (!carrito[id]) {
      carrito[id] = { nombre, precio, cantidad: 0 };
      }
      carrito[id].cantidad++;
      cantidadSpan.textContent = carrito[id].cantidad;
      actualizarCarrito();
  }


  function restarCantidadCarrito(id) {
      const contadorCarrito = document.getElementById(id)
      parseInt(contadorCarrito.textContent)--;
  }

  function actualizarPrecioCarrito() {
      const precioTotalCarrito = document.getElementById('precio-total');
      const precioTotal = carrito.reduce((a, c) => a + c, 0)
      precioTotalCarrito.textContent = carrito.length;
  }
}

function asignarEventosCarrito() {
  const productos = document.querySelectorAll('.botones-carrito');

  productos.forEach(producto => {
    const id = producto.dataset.id;
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);

    producto.querySelector('.boton-sumar').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('click en boton +');
    });

    producto.querySelector('.boton-restar').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('click en boton -');
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
