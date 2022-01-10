let productsInCard = localStorage.getItem("productInCard");
const productsContainerElm = document.querySelector(".products-container");
if (productsInCard) {
  let item = JSON.parse(productsInCard);
  drawProductInCart(item);
}

function drawProductInCart(item) {
  let produceUI = item.map((productItem) => {
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

