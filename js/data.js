let productsDB = [
  {
    id: 1,
    imgUrl: "images/watch.jpg",
    productName: "watch item",
    description:
      "A watch is a small clock carried or worn by a person. It makes it easy to see the time",
    size: "small",
    quantity: 1,
  },
  {
    id: 2,
    imgUrl: "images/shose.jpg",
    productName: "shose item",
    description:
      "A shoe is an item of footwear intended to protect and comfort the human foot.",
    size: "large",
    quantity: 1,
  },
  {
    id: 3,
    imgUrl: "images/laptop.jpeg",
    productName: "laptop item",
    description:
      "Laptops are computers that you can take everywhere with you without hassle.",
    size: "medium",
    quantity: 1,
  },
  {
    id: 4,
    imgUrl: "images/bag.jpeg",
    productName: "bag item",
    description:
      "A bag is a kind of soft container. It can hold or carry things.",
    size: "small",
    quantity: 1,
  },
];

if (JSON.parse(localStorage.getItem("products")) === null) {
  localStorage.setItem("products", JSON.stringify(productsDB));
}
