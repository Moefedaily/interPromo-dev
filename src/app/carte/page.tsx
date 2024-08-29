"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { mealService } from "../Services/meal";
import { Meal } from "../Types/meal";
import { Oval } from "react-loader-spinner";
import Header from "../Components/Header";

const categories = [
  { id: "all", name: "All Meals" },
  { id: "3", name: "Plat" },
  { id: "4", name: "Dessert" },
  { id: "5", name: "Guabao" },
  { id: "6", name: "Bowl" },
  { id: "7", name: "Tapas" },
  { id: "1", name: "Veggie" },
];

const Carte = () => {
  const { push } = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchMeals = async (categories: string[]) => {
    setLoading(true);
    try {
      const data = await mealService.searchMeals(categories);
      console.log("Meal data:", data);
      setMeals(data);
    } catch (err) {
      setError("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (categoryId === "all") {
        return prev.length === categories.length - 1
          ? []
          : categories.slice(1).map((c) => c.id);
      }
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  if (loading)
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

  if (error) return <div>{error}</div>;

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-custom-grey text-white border border-white rounded px-4 py-2 flex items-center justify-between w-48"
            >
              <span>{isDropdownOpen ? "Fermer" : "Filtres"}</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 w-48 py-2 mt-1 bg-custom-grey border border-white rounded-md shadow-xl">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-custom-pink"
                      checked={
                        category.id === "all"
                          ? selectedCategories.length === categories.length - 1
                          : selectedCategories.includes(category.id)
                      }
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span className="ml-2 text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal: Meal) => (
            <div key={meal.id} className="p-4">
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
                  <p className="text-custom-pink">{meal.price}€</p>
                </div>
                <p className="mt-4 text-sm">{meal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Carte;
