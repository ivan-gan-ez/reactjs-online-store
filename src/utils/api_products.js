import axios from "axios";

const API_URL = "http://localhost:6789/";

export async function getProducts(filter, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (filter === "all" ? "" : "&category=" + filter)
  );
  return response.data;
}

export async function getProduct() {}

export async function addProduct(name, description, price, category) {
  const response = await axios.post(API_URL + "products", {
    name: name,
    description: description,
    price: price,
    category: category,
  });
  return response.data;
}

export async function updateProduct() {}

export async function deleteProduct() {}
