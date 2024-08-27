"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../Components/header/page";
import { mealService } from "../Services/meal";
import { Meal } from "../Types/meal";

const Carte = () => {
  const { push } = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await mealService.getAllMeals();
        console.log("Meal data:", data);
        setMeals(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meals");
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <section className="flex justify-center items-center m-8">
        <select
          className="bg-custom-grey border border-white p-2 rounded-md"
          id=""
        >
          <option value="" disabled selected>
            Filtres
          </option>
          <option value="">Plat ou dessert</option>
          <option value="">Guabao</option>
          <option value="">Bowls</option>
          <option value="">Tapas</option>
          <option value="">Veggie</option>
        </select>
      </section>
      <section className="flex flex-wrap p-24">
        {meals.map((meal: Meal) => (
          <div key={meal.id} className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div>
              <div className="flex justify-center items-center">
                <img
                  className="shadow-lg size-4/5 min-w-10/12 min-h-60 object-cover shadow-custom-pink rounded-lg"
                  src={meal.picture}
                  alt={meal.name}
                />
              </div>
              <div className="flex space-x-2 justify-between mt-4">
                <h2>{meal.name}</h2>
                <p>{meal.price}€</p>
              </div>
              <p className="mt-4">{meal.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Carte;
