const badgeElm = document.querySelector("nav .user-info .badge");
const shoppingCartIconElm = document.querySelector("nav .user-info i");
const cartsProductsElm = document.querySelector(".user-info .carts-products");
const cartProductElm = document.querySelector(".carts-products .product");
const productsContainerElm = document.querySelector(
  ".shopping-cart .products-container"
);
let products = JSON.parse(localStorage.getItem("products"));
let searchInput = document.querySelector(".shopping-cart input[type='search']");
// invoked function to display product
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
      <i class="far fa-heart"></i>
    </div>
    </div>
    `;
  });
  productsContainerElm.innerHTML = produceUI.join("");
}
drawProductUI(products);
// // to push item name in cart array
let cartproductsName = [];

// to check if there items in localStorage
let cartproductsObj = localStorage.getItem("productInCard")
  ? JSON.parse(localStorage.getItem("productInCard"))
  : [];

//invoked function to keep data in cart menu and number of notification by localStorage
(function cartMenuData() {
  if (cartproductsObj) {
    // console.log(cartproductsObj)
    cartproductsObj.map((item) => {
      cartProductElm.innerHTML += ` <p class="product-name">${item.productName}</p>`;

      // console.log(cartProductElm.children.length);
    });
    badgeElm.style.display = "block";
    badgeElm.innerHTML += cartproductsObj.length;
  }
})();

// add product to cart and using localStorage
function addToCart(id) {
  if (localStorage.getItem("userName")) {
    let choosenProduct = products.find((product) => product.id === id);
    if (cartproductsName.indexOf(choosenProduct.productName) === -1) {
      cartproductsName.push(choosenProduct.productName);
      // console.log(cartproductsName);
      // console.log(cartProductElm.children.length)

      if (cartProductElm.children.length <= cartproductsObj.length) {
        cartProductElm.innerHTML += ` <p class="product-name">${choosenProduct.productName}</p>`;
      }

      // console.log(choosenProduct)
    }
    if (notRepeate(id)) {
      cartproductsObj = [...cartproductsObj, choosenProduct];
    }
    localStorage.setItem("productInCard", JSON.stringify(cartproductsObj));
    badgeElm.style.display = "block";
    badgeElm.innerHTML = cartproductsObj.length;
    // console.log(cartProductElm.childElementCount)
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

function notRepeate(id) {
  let productID = cartproductsObj.map((product) => product.id);
  // console.log(productID);
  if (productID.indexOf(id) === -1) {
    return true;
  } else {
    return false;
  }
}

function saveProductData(id) {
  localStorage.setItem("productID", id);
}

// bug in line 60

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
