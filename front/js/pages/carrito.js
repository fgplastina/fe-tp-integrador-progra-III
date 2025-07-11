const carritoContainer = document.getElementById('items-carrito');
const totalSpan = document.getElementById('precio-total');

function renderCarrito() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  carritoContainer.innerHTML = '';

  if (cart.length === 0) {
    carritoContainer.innerHTML = '<p>No hay elementos en el carrito.</p>';
    totalSpan.textContent = '$0.00';
    return;
  }

  let total = 0;

  cart.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <p><strong>${product.name}</strong> - $${product.price.toFixed(2)}</p>
    `;
    carritoContainer.appendChild(item);

    total += product.price;
  });

  totalSpan.textContent = `$${total.toFixed(2)}`;
}

renderCarrito();
