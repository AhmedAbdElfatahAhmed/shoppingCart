let favoritesProdsContainer = document.querySelector(
  ".products .products-container"
);

function drawFavoritesProd(products = []) {
  let itemsInLocalStorage = JSON.parse(
    localStorage.getItem("favoritesProducts")
  );
  let favoritesProds = itemsInLocalStorage || products;
  let favoritesProdElm = favoritesProds.map((productItem) => {
    return ` <div class="product-item">
        <img src="${productItem.imgUrl}" alt="" />
        <div class="product-info">
          <a href='cartDetalis.html'onclick='saveProductData(${productItem.id})'>${productItem.productName}</a>
          <p>${productItem.description}</p>
          <div>size: <span>${productItem.size}</span></div>
        </div>
        <div class="cart-action">
          <button onclick='removeFromFavorites(${productItem.id})'>Remove from Favorites</button>
        </div>
        </div>
        `;
  });
  favoritesProdsContainer.innerHTML = favoritesProdElm.join("");
  if (itemsInLocalStorage.length === 0) {
    favoritesProdsContainer.innerHTML =
      "<p class='no-products'>There is No Favorites Products</p>";
  }
}
if (localStorage.getItem("favoritesProducts") != null) {
  drawFavoritesProd();
}
function removeFromFavorites(id) {
  let favoritesProducts = JSON.parse(localStorage.getItem("favoritesProducts"));
  let filteredItem = favoritesProducts.filter((item) => item.id !== id);
  localStorage.setItem("favoritesProducts", JSON.stringify(filteredItem));
  let allProducts = JSON.parse(localStorage.getItem("products"));
  allProducts.map((item) => {
    if (item.id === id) {
      item.liked = false;
      localStorage.setItem("products", JSON.stringify(allProducts));
    }
  });

  drawFavoritesProd(filteredItem);
}
