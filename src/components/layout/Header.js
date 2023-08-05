import React from "react";
import classes from "./Header.module.css";
import mealsimage from "../store/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {

  return (
    <React.Fragment>
      <>
        <header className={classes.header}>
          <h1>My Meals</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeaderCartButton onclick={props.onShowCart} />
            <button className={classes.Track} onClick={props.onOrder}>
              Orders
            </button>
          </div>
        </header>
        <div className={classes["main-image"]}>
          <img src={mealsimage} alt="Not found" />
        </div>
      </>
    </React.Fragment>
  );
}

export default Header;
