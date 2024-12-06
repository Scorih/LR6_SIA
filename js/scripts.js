function loadCatalog(query = '') {
  let apiUrl = query
    ? `https://dummyjson.com/products/search?q=${query}`
    : 'https://dummyjson.com/products?limit=30&skip=9&select=title,description,images,price';
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      let catalog = document.getElementById('catalog');
      catalog.innerHTML = '';
      if (data.products.length === 0) {
        catalog.innerHTML = '<p>Нет результатов для данного запроса.</p>';
        return;
      }
      data.products.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${product.images[0]}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
        `;
        catalog.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
      let catalog = document.getElementById('catalog');
      catalog.innerHTML = '<p>Не удалось загрузить каталог продуктов.</p>';
    });
}
function handleSearch() {
  let searchInput = document.getElementById('search-input').value.trim();
  loadCatalog(searchInput);
}
document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();
  let searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearch);
});