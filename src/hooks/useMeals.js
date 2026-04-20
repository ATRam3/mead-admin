import { useEffect, useState } from "react";
import { getMeals } from "../services/mealsService";

export const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    setLoading(true);
    const data = await getMeals();
    setMeals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return { meals, setMeals, loading, refetch: fetchMeals };
};
