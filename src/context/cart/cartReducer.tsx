import { Product } from "../../utils/types";

export type CartItemType = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItemType[];
  size: number;
  total: number;
};

// An interface for our actions
export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItemType }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "CLEAR_CART"; payload?: string };

// Our reducer function that uses a switch statement to handle our actions
export function cartReducer(state: CartState, action: CartAction) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      const itemExists = state.items.find(
        (item) => item.product._id === payload.product._id
      );

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.product._id === payload.product._id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      }

      return {
        ...state,
        items: [...state.items, payload],
        size: state.size + 1,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.product._id !== payload),
        size: state.size - 1,
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.product._id === payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.product._id === payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "CLEAR_CART":
      return {
        items: [],
        size: 0,
        total: 0,
      };

    default:
      return state;
  }
}
