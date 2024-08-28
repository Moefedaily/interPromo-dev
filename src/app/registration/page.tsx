"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authService } from "../Services/auth";
import Header from "../Components/Header/Header";

const Registration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await authService.register(formData);
      console.log("Registration successful:", response);
      router.push("/connexion");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message ||
            "An error occurred during registration."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Inscription</h2>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            className="bg-custom-grey border-white border-2 py-2 px-16 m-4 rounded-md w-full"
            type="email"
            id="mail"
            name="mail"
            placeholder="Email"
            value={formData.mail}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white border-2 py-2 px-16 m-4 rounded-md w-full"
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white border-2 py-2 px-16 m-4 rounded-md w-full"
            type="text"
            id="name"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white border-2 py-2 px-16 m-4 rounded-md w-full"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-center">
            <button
              className="bg-white text-black rounded-md px-8 py-2 m-8"
              type="submit"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Registration;
