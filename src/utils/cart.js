// R of CRUD
export function GetCartItems() {
  const cartInLocalStorage = localStorage.getItem("cart");
  return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
}

// U of CRUD
export function UpdateCart(id) {
  const cart = GetCartItems();

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
  const cart = GetCartItems();

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

// D of CRUD
export function RemoveFromCart(id) {
  const cart = GetCartItems();

  const updatedCart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
