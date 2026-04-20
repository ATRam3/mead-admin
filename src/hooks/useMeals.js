import { useEffect, useState } from "react";
import { getMeals } from "../services/mealsService";

export const useMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals().then(setMeals);
  }, []);

  return { meals, setMeals };
};
