import classes from "./MealItem.module.css";
import MealItemForm from "./MealitemForm";
import { useContext } from "react";
import CartValue from "../../store/context";
const MealItem = (props) => {

  const ctxt = useContext(CartValue);
  const addToCartHandler = (Amount) => {
    ctxt.addItem({
      id: props.id,
      name: props.name,
      amount: Amount,
      price:props.price
   })
 }

  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
