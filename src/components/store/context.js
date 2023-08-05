import {createContext} from "react";

const CartValue = createContext({
    items: [],
    totalPrice: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart:()=>{}
});

export default CartValue;