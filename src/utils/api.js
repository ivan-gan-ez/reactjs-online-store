import axios from "axios";

const API_URL = "http://localhost:6789/products";

export async function getProducts(filter) {
  const response = await axios.get(
    API_URL + (filter === "all" ? "" : "?category=" + filter)
  );
  return response.data;
}
