import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { CartAction, cartReducer, CartState } from "./cartReducer";
// import { ShoppingCart } from "../components/ShoppingCart";
// import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
  cartQuantity: number;
};

export interface Action {
  type: string;
  payload: unknown;
}

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}
export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    size: 0,
    total: 0,
  });

  const cartQuantity = cart.items.reduce(
    (quantity, item) => quantity + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
