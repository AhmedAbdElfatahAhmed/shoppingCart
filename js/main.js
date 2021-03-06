const badgeElm = document.querySelector("nav .user-info .badge");
const shoppingCartIconElm = document.querySelector("nav .user-info i");
const cartsProductsElm = document.querySelector(".user-info .carts-products");
const cartProductElm = document.querySelector(".carts-products .product");
const productsContainerElm = document.querySelector(
  ".shopping-cart .products-container"
);
let products = JSON.parse(localStorage.getItem("products"));
let searchInput = document.querySelector(".shopping-cart input[type='search']");
let FilterBySizeElm = document.querySelector(
  ".shopping-cart .products-filter select"
);
// function to display product
function drawProductUI(theProducts) {
  let produceUI = theProducts.map((productItem) => {
    return ` <div class="product-item ${productItem.byUser && "new-product"}">
    <img src="${productItem.imgUrl}" alt="" />
    <div class="product-info">
      <a href='cartDetalis.html'onclick='saveProductData(${productItem.id})'>${
      productItem.productName
    }</a>
      <p>${productItem.description}</p>
      <div>size: <span>${productItem.size}</span></div>
     <div class="edit-delete-buttons"> ${
       productItem.byUser
         ? "<button onclick='editProduct(" +
           productItem.id +
           ")' class='edit-product-info'>Edit</button>"
         : ""
     }
     ${
       productItem.byUser
         ? "<button onclick='deleteProduct(" +
           productItem.id +
           ")' class='delete-product-info'>Delete</button>"
         : ""
     }
     </div>
    </div>
    <div class="cart-action">
      <button onclick='addToCart(${productItem.id})'>Add To Cart</button>
      <i style="color:${
        productItem.liked ? "green" : ""
      }" onclick='addToFavorites(${productItem.id})' class="${
      productItem.liked ? "fas fa-heart" : "far fa-heart"
    }" ></i>
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
      cartProductElm.innerHTML += ` <p class="product-name">${item.productName} <span class="item-quantity">${item.quantity}</span></p>`;
    });
    badgeElm.style.display = "block";
    badgeElm.innerHTML = addedProducts.length;
  }
})();

// add product to cart
function addToCart(id) {
  if (localStorage.getItem("userName")) {
    let choosenProduct = products.find((product) => product.id === id);
    let isproductInCart = addedProducts.some(
      (item) => item.id === choosenProduct.id
    );
    if (isproductInCart) {
      addedProducts = addedProducts.map((item) => {
        if (item.id === choosenProduct.id) item.quantity += 1;
        return item;
      });
    } else {
      addedProducts.push(choosenProduct);
    }
    cartProductElm.innerHTML = "";
    addedProducts.forEach((item) => {
      cartProductElm.innerHTML += ` <p class="product-name">${item.productName} <span class="item-quantity">${item.quantity}</span></p>`;
    });
    // if (getUniqueArr(id)) {
    //   addedProducts = [...addedProducts, choosenProduct];
    // }
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

// function getUniqueArr(id) {
//   let productID = addedProducts.map((product) => product.id);
//   if (productID.indexOf(id) === -1) {
//     return true;
//   } else {
//     return false;
//   }
// }

function saveProductData(id) {
  localStorage.setItem("productID", id);
}
const heartIconElms = document.querySelectorAll(".cart-action i");
// search by name when key up
searchInput.addEventListener("keyup", () => {
  search(searchInput.value.trim(), products);
});

// search function
function search(title, products) {
  let serarchedProduct = products.filter(
    (product) =>
      product.productName.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductUI(serarchedProduct);

  if (searchInput.value === "") {
    drawProductUI(products);
    location.reload();
  }
}

let addedFavoritesProds = localStorage.getItem("favoritesProducts")
  ? JSON.parse(localStorage.getItem("favoritesProducts"))
  : [];
function addToFavorites(id) {
  if (localStorage.getItem("userName")) {
    let chossenFavoriteProduct = products.find((item) => item.id === id);
    chossenFavoriteProduct.liked = true;
    heartIconElms[chossenFavoriteProduct.id - 1].className = "fas fa-heart";
    heartIconElms[chossenFavoriteProduct.id - 1].style.color = "green";
    addFavoritesToOriginalProducts(chossenFavoriteProduct, products);
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

// to save favorites products in localStorage
function addFavoritesToOriginalProducts(target, arr) {
  let itemsId = arr.map((item) => item.id);
  if (target.liked) {
    itemsId.forEach((itemId) => {
      if (itemId === target.id) {
        arr[itemId - 1].liked = true;
        localStorage.setItem("products", JSON.stringify(arr));
      }
    });
  }
}

// filter products By size
FilterBySizeElm.addEventListener("change", getProductsFilterBySize);
function getProductsFilterBySize() {
  if (FilterBySizeElm.value === "all") {
    drawProductUI(products);
    location.reload();
  } else {
    let selectedProduct = products.filter(
      (item) => item.size === FilterBySizeElm.value
    );
    drawProductUI(selectedProduct);
  }
}

function editProduct(id) {
  location.href = "updateProducts.html";
  localStorage.setItem("editProductID", id);
}

function deleteProduct(id) {
  let targetProduct = products.find((item) => item.id === id);
  let targetProductIndex = products.indexOf(targetProduct);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      products.splice(targetProductIndex, 1);
      localStorage.setItem("products", JSON.stringify(products));
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      location.reload();
    }
  });
}
