import { fetchData, createElement } from '../utils.js';

const mainSection = document.querySelector('#main .tiles');

async function init() {
  const products = await fetchData('/products');
  const categories = await fetchData('/categories');
  renderFilters(categories, products);
  renderProducts(products);
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
    article.innerHTML = `
      <span class="image"><img src="${p.image_url}" alt="${p.name}" /></span>
      <a href="generic.html">
        <h2>${p.name}</h2>
        <div class="content">
          <p>$${p.price.toFixed(2)}</p>
        </div>
      </a>
    `;
    mainSection.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', init);
