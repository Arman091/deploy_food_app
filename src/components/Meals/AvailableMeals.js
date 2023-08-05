import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect,useState } from "react";

const AvailableMeals = () => {
  let [meals, setMeals] = useState([]);
  useEffect(() => {
    let fetchdata = async () => {
      let response = await fetch(
        "https://my-app-d8e22-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      let data = await response.json();
      let Mealsdata = [];
      for (let key in data) {
        Mealsdata.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price:data[key].price
        })
      }
      setMeals(Mealsdata)
    };
    fetchdata();
  }, []);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
