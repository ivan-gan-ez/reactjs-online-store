// U of CRUD
export function UpdateCart(id) {
  const cartInLocalStorage = localStorage.getItem("cart");
  const cart = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];

  const updatedCart = cart.map((item) => {
    if (item._id === id) {
      item.quantity += 1;
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

// C of CRUD
export function AddToCart(id, name, description, price, category) {
  const cartInLocalStorage = localStorage.getItem("cart");
  const cart = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];

  const updatedCart = [
    ...cart,
    {
      _id: id,
      name: name,
      description: description,
      price: price,
      quantity: 1,
      category: category,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

// // R of CRUD
// export function GetCartItems() {}

// D of CRUD
export function RemoveFromCart(id) {
  const cartInLocalStorage = localStorage.getItem("cart");
  const cart = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];

  const updatedCart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
