let productsDB = [
  {
    id: 1,
    imgUrl: "images/watch.jpg",
    productName: "watch item",
    description: "Lorem ipsum, dolor sit amet consectetur",
    size: "large",
    quantity: 1,
  },
  {
    id: 2,
    imgUrl: "images/shose.jpg",
    productName: "shose item",
    description: "Lorem ipsum, dolor sit amet consectetur",
    size: "medium",
    quantity: 1,
  },
  {
    id: 3,
    imgUrl: "images/laptop.jpeg",
    productName: "laptop item",
    description: "Lorem ipsum, dolor sit amet consectetur",
    size: "large",
    quantity: 1,
  },
  {
    id: 4,
    imgUrl: "images/bag.jpeg",
    productName: "bag item",
    description: "Lorem ipsum, dolor sit amet consectetur",
    size: "small",
    quantity: 1,
  },
];

if (JSON.parse(localStorage.getItem("products")) === null) {
  localStorage.setItem("products", JSON.stringify(productsDB));
}
