import React from "react";
import { useMeals } from "../hooks/useMeals";

const Meals = () => {
  const { meals } = useMeals();
  return (
    <div>
      <h1>meals</h1>

      {meals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.name?.en}</h2>
          <p>{meal.calories} kcal</p>
        </div>
      ))}
    </div>
  );
};

export default Meals;
