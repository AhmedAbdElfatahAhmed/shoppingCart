const productsContainerElm = document.querySelector(".products-container");
let productsInCard;

function checkProductsInCartDB() {
  productsInCard = localStorage.getItem("productInCard");
  if (productsInCard) {
    let products = JSON.parse(productsInCard);
    drawProductInCart(products);
  }
  if (productsContainerElm.children.length === 0) {
    productsContainerElm.innerHTML = "<p class='no-products'>There Is No Products</p>";
  }
}
checkProductsInCartDB();
function drawProductInCart(items) {
  let produceUI = items.map((productItem) => {
    return ` <div class="product-item">
      <img src="${productItem.imgUrl}" alt="" />
      <div class="product-info">
        <h3>${productItem.productName}</h3>
        <p>${productItem.description}</p>
        <div>size: <span>${productItem.size}</span></div>
      </div>
      <div class="cart-action">
        <button onclick='removeItemFromCart(${productItem.id})'>Remove from Cart</button>
      </div>
      </div>
      `;
  });
  productsContainerElm.innerHTML = produceUI.join("");
}

function removeItemFromCart(id) {
  let products = JSON.parse(productsInCard);
  let filteredProduct = products.filter((product) => product.id != id);
  localStorage.setItem("productInCard", JSON.stringify(filteredProduct));
  drawProductInCart(filteredProduct);
  checkProductsInCartDB();
}
