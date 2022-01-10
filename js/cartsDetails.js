const productDetails = document.querySelector(".product-Details");
let products = JSON.parse(localStorage.getItem("products"));
let productIDInLocalStorage = JSON.parse(localStorage.getItem("productID"));

let choosenProductDetails = products.find(
  (product) => product.id === productIDInLocalStorage
);

function showProductDetalils() {
  return `  <img src="${choosenProductDetails.imgUrl}" alt="" />
  <div class="product-info">
    <h3>${choosenProductDetails.productName}</h3>
    <p>${choosenProductDetails.description}</p>
    <div class="size">size: <span>${choosenProductDetails.size}</span></div>
  </div>`;
}

productDetails.innerHTML = showProductDetalils();
