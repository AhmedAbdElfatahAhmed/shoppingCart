const badgeElm = document.querySelector("nav .user-info .badge");
const shoppingCartIconElm = document.querySelector("nav .user-info i");
const cartsProductsElm = document.querySelector(".user-info .carts-products");
const cartProductElm = document.querySelector(".carts-products .product");
const productsContainerElm = document.querySelector(
  ".shopping-cart .products-container"
);
let products = JSON.parse(localStorage.getItem("products"));
let searchInput = document.querySelector(".shopping-cart input[type='search']");
// function to display product
function drawProductUI(theProducts) {
  let produceUI = theProducts.map((productItem) => {
    return ` <div class="product-item">
    <img src="${productItem.imgUrl}" alt="" />
    <div class="product-info">
      <a href='cartDetalis.html'onclick='saveProductData(${productItem.id})'>${productItem.productName}</a>
      <p>${productItem.description}</p>
      <div>size: <span>${productItem.size}</span></div>
    </div>
    <div class="cart-action">
      <button onclick='addToCart(${productItem.id})'>Add To Cart</button>
      <i onclick='addToFavorites(${productItem.id})' class="far fa-heart"></i>
    </div>
    </div>
    `;
  });
  productsContainerElm.innerHTML = produceUI.join("");
}
drawProductUI(products);

let addedProducts = localStorage.getItem("productInCard")
  ? JSON.parse(localStorage.getItem("productInCard"))
  : [];

//invoked function to keep data in cart menu and number of notification by localStorage
(function cartMenuData() {
  // to check if there items in localStorage
  if (addedProducts) {
    addedProducts.map((item) => {
      cartProductElm.innerHTML += ` <p class="product-name">${item.productName}</p>`;
    });
    badgeElm.style.display = "block";
    badgeElm.innerHTML = addedProducts.length;
  }
})();

// add product to cart
function addToCart(id) {
  if (localStorage.getItem("userName")) {
    let choosenProduct = products.find((product) => product.id === id);
    cartProductElm.innerHTML += ` <p class="product-name">${choosenProduct.productName}</p>`;
    addedProducts = [...addedProducts, choosenProduct];
    localStorage.setItem("productInCard", JSON.stringify(addedProducts));
    badgeElm.style.display = "block";
    badgeElm.innerHTML = addedProducts.length;
  } else {
    location.href = "register.html";
  }
}

// to manage cart menu on clicked it
function openCartMenu() {
  if (cartProductElm.innerHTML !== "") {
    if (cartsProductsElm.style.display == "block") {
      cartsProductsElm.style.display = "none";
    } else {
      cartsProductsElm.style.display = "block";
    }
  }
}

// to open cart menu
shoppingCartIconElm.addEventListener("click", openCartMenu);

function notRepeateInCard(id) {
  let productID = addedProducts.map((product) => product.id);
  if (productID.indexOf(id) === -1) {
    return true;
  } else {
    return false;
  }
}

function saveProductData(id) {
  localStorage.setItem("productID", id);
}

// search by name when key up
searchInput.addEventListener("keyup", () => {
  search(searchInput.value, products);
});

// search function
function search(title, products) {
  let serarchedProduct = products.filter(
    (product) => product.productName.indexOf(title) !== -1
  );
  drawProductUI(serarchedProduct);

  if (searchInput.value === "") {
    drawProductUI(products);
  }
}

let addedFavoritesProds = localStorage.getItem("favoritesProducts")
  ? JSON.parse(localStorage.getItem("favoritesProducts"))
  : [];
function addToFavorites(id) {
  if (localStorage.getItem("userName")) {
    let chossenFavoriteProduct = products.find((item) => item.id === id);
    if (notRepeateInFavorite(id)) {
      addedFavoritesProds = [...addedFavoritesProds, chossenFavoriteProduct];
    }
    localStorage.setItem(
      "favoritesProducts",
      JSON.stringify(addedFavoritesProds)
    );
  } else {
    location.href = "register.html";
  }
}

function notRepeateInFavorite(id) {
  let favoritesProductsID = addedFavoritesProds.map((item) => item.id);
  if (favoritesProductsID.indexOf(id) === -1) {
    return true;
  } else {
    return false;
  }
}

const heartIconElms = document.querySelectorAll(".cart-action i");

(function coloredHeart() {
  heartIconElms.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.target.className = "fas fa-heart";
      e.target.style.color = "red";
    });
  });
})();

// invoked function to Save colored Heart In LocalStorage
(function toSaveColoredHeartInLocalStorage() {
  addedFavoritesProds.forEach((item) => {
    heartIconElms.forEach((icon, index) => {
      if (item.id === index + 1) {
        icon.className = "fas fa-heart";
        icon.style.color = "red";
      }
    });
  });
})();
