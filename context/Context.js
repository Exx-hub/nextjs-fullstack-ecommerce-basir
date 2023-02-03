import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Context = createContext();

const initialState = {
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;

      const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

      const updatedCart = existItem
        ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItems, newItem];

      Cookies.set("cart", JSON.stringify({ cartItems: updatedCart }));

      return {
        cart: { cartItems: updatedCart },
      };
    case "CART_REMOVE_ITEM":
      const filteredCart = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);

      Cookies.set("cart", JSON.stringify({ cartItems: filteredCart }));

      return {
        cart: { cartItems: filteredCart },
      };
    case "CART_CLEAR_ITEMS":
      return {
        cartItems: [],
      };
    default:
      return state;
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default ContextProvider;
