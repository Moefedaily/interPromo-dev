"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../Components/header/page";
import { authService } from "../Services/auth";
import { User } from "../Types/User";
import { Oval } from "react-loader-spinner";

const Profil = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (!userData) {
          router.push("/connexion");
          return;
        }
        setUser(userData);
        setFormData({
          name: userData.name,
          password: userData.password,
          phone: userData.phone,
        });
      } catch (error) {
        setError("Failed to fetch user data");
        console.error(error);
      }
    };

    fetchUserData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateUserProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError("Failed to update profile");
      console.error(error);
    }
  };

  if (!user) {
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

  return (
    <main className="bg-custom-grey min-h-screen text-gray-600">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Profil Utilisateur
        </h1>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1">
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-800  text-white transition"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p>
                <strong>Nom:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.mail}
              </p>
              <p>
                <strong>Téléphone:</strong> {user.phone}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-800 text-white transition"
              >
                Modifier le profil
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profil;
