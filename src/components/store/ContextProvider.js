import CartValue from "./context";
import React from "react";
import { useReducer } from "react";

const defaultState = {
  items: [],
  totalPrice: 0,
};

//whole reducer function give new state (state,action)=>newState
const reducerFuntion = (state, action) => {
  if (action.type === "ADD") {
    const newPriceAdded =
      state.totalPrice + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex]; //will store element equel to action item

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; //also used in context
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems, //======this object value will be assigned to defaultstate
      totalPrice: newPriceAdded,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const totalPrice = state.totalPrice - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalPrice: totalPrice,
    };
  }
  if (action.type === "CLEAR") {
    return defaultState;
  }
  return defaultState;
};

// COMPONENT CODE STARTS HERE
const ContextProvider = (props) => {
  const [stateSnap, dispatch] = useReducer(reducerFuntion, defaultState);
  const AddItemHandler = (item) => {
    dispatch({ type: "ADD", item: item }); // defining here we are sending item and action to reducer function
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => [dispatch({ type: "CLEAR" })];
  // ============================================cart context provider====================
  // ============== import cartvalue CONTEXT from COntext and pass it as value
  const cartValue = {
    items: stateSnap.items,
    totalPrice: stateSnap.totalPrice,
    addItem: AddItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartValue.Provider value={cartValue}>{props.children}</CartValue.Provider>
  );
};

export default ContextProvider;
