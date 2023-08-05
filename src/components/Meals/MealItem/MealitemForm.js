import classes from "./MealItemForm.module.css";
import Input from "../../UI/input";
import { useRef,useState } from "react";

const MealItemForm = (props) => {
  const [isvalid,setisvalid]=useState(true)
  const inputValueRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const inputamount = inputValueRef.current.value //here we are calculating amount
 
   
    if (inputamount.trim().length === 0) {
      setisvalid(false);
      return;
    }
    else {
      //================this function is in MealItem parent==============================
      props.onAddToCart(+inputamount);
    }
 }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        ref={inputValueRef}
      />
      <button>+ Add</button>
      {!isvalid && <p>Please Enter value (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
