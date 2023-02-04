import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Context = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;

      const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

      const updatedCart = existItem
        ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItems, newItem];

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems: updatedCart }));

      return {
        ...state,
        cart: { cartItems: updatedCart },
      };
    case "CART_REMOVE_ITEM":
      const filteredCart = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems: filteredCart }));

      return {
        ...state,
        cart: { cartItems: filteredCart },
      };
    case "CART_CLEAR_ITEMS":
      return {
        ...state,
        cart: { cartItems: [] },
      };
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      const { fullName, address, city, postalCode, country } = action.payload;

      Cookies.set(
        "cart",
        JSON.stringify({
          ...state.cart,
          shippingAddress: {
            fullName,
            address,
            city,
            postalCode,
            country,
          },
        })
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      Cookies.set(
        "cart",
        JSON.stringify({
          ...state.cart,
          paymentMethod: action.payload,
        })
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
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
