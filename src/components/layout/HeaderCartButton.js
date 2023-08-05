import { useContext } from "react";
import CartIcon from "../Cart/carticon";
import classes from "./Cart.module.css";
import CartValue from "../store/context";


function HeaderCartButton(props) {
  
  const Cartctxt = useContext(CartValue)
  const numberOfCartItems = Cartctxt.items.reduce((accum, curritem) => {
    return accum+curritem.amount
  },0)
 
  return (
    <button className={classes.button} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span >Your Cart</span>
      <span className={classes.badge}>{ numberOfCartItems}</span>
          
    </button>
  );
}
export default HeaderCartButton;
