"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mealService } from "../Services/meal";
import { CreateMealDto, Meal } from "../Types/meal";
import { Oval } from "react-loader-spinner";
import Header from "../Components/Header";

const AdminCarte = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [newMeal, setNewMeal] = useState<CreateMealDto>({
    name: "",
    description: "",
    price: 0,
    picture: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreationBox, setShowCreationBox] = useState<boolean>(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mealService.getAllMeals();
      setMealList(response);
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
      console.error("Error fetching meals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
  };

  const handleSave = async (meal: Meal | CreateMealDto) => {
    setIsLoading(true);
    setError(null);
    try {
      let updatedMeal;
      const mealToSave = {
        ...meal,
      };
      if ("id" in meal) {
        updatedMeal = await mealService.updateMeal(meal.id, mealToSave);
      } else {
        updatedMeal = await mealService.createMeal(mealToSave);
      }
      await fetchMeals();
      setEditingMeal(null);
      setNewMeal({ name: "", description: "", price: 0, picture: "" });
      setShowCreationBox(false);
    } catch (err) {
      setError("Failed to save meal. Please try again.");
      console.error("Error saving meal:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      setIsLoading(true);
      setError(null);
      try {
        await mealService.deleteMeal(id);
        await fetchMeals();
      } catch (err) {
        setError("Failed to delete meal. Please try again.");
        console.error("Error deleting meal:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#FF8DDC"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#333333"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <main className="bg-custom-grey">
      <Header />
      <div className="flex items-center justify-between m-6">
        <div className="flex-col m-auto flex justify-center items-center pt-6">
          <p className="text-white text-4xl font-bold flex">Carte</p>
          <button
            onClick={() => setShowCreationBox(!showCreationBox)}
            className="bg-custom-pink flex border-2 mt-3 border-custom-pink text-custom-grey rounded-md p-1 m-1 justify-center w-full"
          >
            {showCreationBox ? "Cacher" : "Ajouter un plat"}
          </button>
        </div>
      </div>

      {showCreationBox && (
        <div className="card w-1/5 border-2 rounded-md mx-auto my-auto mb-20 margin-auto flex justify-center items-center flex-col p-10">
          <input
            className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
            placeholder="Nom"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          />
          <input
            className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
            placeholder="Prix"
            type="number"
            value={newMeal.price}
            onChange={(e) =>
              setNewMeal({ ...newMeal, price: parseFloat(e.target.value) })
            }
          />
          <textarea
            className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
            placeholder="Description"
            value={newMeal.description}
            onChange={(e) =>
              setNewMeal({ ...newMeal, description: e.target.value })
            }
          />
          <input
            className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
            placeholder="URL de l'image"
            value={newMeal.picture}
            onChange={(e) =>
              setNewMeal({ ...newMeal, picture: e.target.value })
            }
          />
          <button
            onClick={() => handleSave(newMeal)}
            className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center"
          >
            Ajouter
          </button>
        </div>
      )}

      <div className="cards text-white flex-raw flex flex-wrap content-between justify-center items-center">
        {mealList.map((meal) => (
          <div
            key={meal.id}
            className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2"
          >
            <div className="picture w-4/5 border-2 rounded-md p-1 w-100 m-1">
              <img
                src={meal.picture}
                className="w-full h-auto"
                alt={meal.name}
              />
            </div>

            {editingMeal && editingMeal.id === meal.id ? (
              <>
                <input
                  className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
                  placeholder="Nom"
                  value={editingMeal.name}
                  onChange={(e) =>
                    setEditingMeal({ ...editingMeal, name: e.target.value })
                  }
                />
                <input
                  className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
                  placeholder="Prix"
                  type="number"
                  step="0.01"
                  value={editingMeal.price}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
                <textarea
                  className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
                  placeholder="Description"
                  value={editingMeal.description}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  className="w-4/5 border-2 rounded-md p-1 m-1 text-black"
                  placeholder="URL de l'image"
                  value={editingMeal.picture}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      picture: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <>
                <div className="title w-4/5 border-2 rounded-md p-1 w-100 m-1">
                  <p>Nom</p>
                  <p>{meal.name}</p>
                </div>
                <div className="price w-4/5 border-2 rounded-md p-1 w-100 m-1">
                  <p>Prix</p>
                  <p>{meal.price}€</p>
                </div>
                <div className="description w-4/5 border-2 rounded-md p-1 w-100 m-1">
                  <p>Description</p>
                  <p>{meal.description}</p>
                </div>
              </>
            )}

            <div className="pt-2 w-full flex justify-center items-center flex-col">
              {editingMeal && editingMeal.id === meal.id ? (
                <button
                  onClick={() => handleSave(editingMeal)}
                  className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center"
                >
                  Sauvegarder
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(meal)}
                  className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center"
                >
                  Modifier
                </button>
              )}
              <button
                onClick={() => handleDelete(meal.id)}
                className="bg-gray-400 border-2 flex w-2/4 rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminCarte;
