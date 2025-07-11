import { postData } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('items-carrito');
  const totalPriceEl = document.getElementById('precio-total');
  const nroContadorCarrito = document.getElementById('nro-contador-carrito');

  function renderCart() {
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>No hay elementos en el carrito.</p>';
      totalPriceEl.textContent = '$0.00';
      return;
    }

    // Agrupamos los productos por ID y contamos las cantidades porque no tenemos "quantity" en los items
    const grouped = cart.reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = { ...product, quantity: 0 };
      }
      acc[product.id].quantity++;
      return acc;
    }, {});

    Object.values(grouped).forEach((product) => {
      const item = document.createElement('li');
      item.className = 'bloque-item';
      item.textContent = `${product.name} - $${product.price.toFixed(2)} x ${product.quantity}`;
      cartContainer.appendChild(item);
    });

    // Calculamos el total
    const total = Object.values(grouped).reduce((sum, p) => sum + p.price * p.quantity, 0);
    totalPriceEl.textContent = `$${total.toFixed(2)}`;

    nroContadorCarrito.textContent = `${cart.length}`
  }

  function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
    console.log('Carrito vacío');
  }

  async function confirmCart() {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const grouped = cart.reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = { ...product, quantity: 0 };
      }
      acc[product.id].quantity++;
      return acc;
    }, {});

    const items = Object.values(grouped).map(({ id, name, price, quantity }) => ({
      product_id: id,
      name,
      unit_price: price,
      quantity,
    }));

    const total = items.reduce((sum, p) => sum + p.unit_price * p.quantity, 0);

    try {
      const data = await postData('/sales', {
        items,
        total,
      });
      console.log('Compra confirmada:', data);
      console.log('Ticket generado:\n');
      console.table(cart);
      alert('Gracias por tu compra!');
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al confirmar la compra');
    }
  }

  renderCart();

  document.getElementById('btn-cancel')?.addEventListener('click', clearCart);
  document.getElementById('btn-confirm')?.addEventListener('click', confirmCart);
});
