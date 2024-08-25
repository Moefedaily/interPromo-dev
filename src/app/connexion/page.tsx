"use client";
import React, { useState } from "react";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        formData
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message || "An error occurred during login."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Connexion</h2>
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
            placeholder="Identifiant"
            value={formData.mail}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white p-2 border-2 py-2 px-16 m-4 rounded-md w-full"
            type="password"
            placeholder="Mot de passe"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-center">
            <button
              className="bg-white text-black rounded-md px-8 py-2 m-8"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
