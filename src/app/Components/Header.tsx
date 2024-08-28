"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/Services/auth";
import NavButton from "./NavButton";

export const Header = () => {
  const { push } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isAuthenticated();
      setIsLoggedIn(loggedIn);
      setIsAdmin(loggedIn && authService.isAdmin());
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setIsAdmin(false);
      push("/connexion");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-custom-grey py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-3xl md:text-4xl text-custom-pink font-bold text-center font-sans mb-4 lg:mb-0">
          RESTAURANT LE SEOUL
        </h1>
        <div className="flex items-center mb-4 lg:mb-0">
          <img src="logo.svg" alt="logo" className="h-16 w-auto" />
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end items-center gap-4">
          {isAdmin && (
            <>
              <NavButton
                onClick={() => push("/adminCarte")}
                className="text-custom-pink"
              >
                Carte
              </NavButton>
              <NavButton
                onClick={() => push("/adminReservation")}
                className="text-custom-pink"
              >
                Reservation
              </NavButton>
            </>
          )}
          {!isLoggedIn ? (
            <>
              <NavButton
                onClick={() => push("/connexion")}
                className="text-white"
              >
                Connexion
              </NavButton>
              <NavButton
                onClick={() => push("/registration")}
                className="text-white"
              >
                Inscription
              </NavButton>
            </>
          ) : (
            <NavButton onClick={handleLogout} className="text-white">
              Deconnexion
            </NavButton>
          )}

          {isLoggedIn && !isAdmin && (
            <>
              <NavButton onClick={() => push("/")}>Accueil</NavButton>
              <NavButton onClick={() => push("/carte")}>La carte</NavButton>
              <NavButton onClick={() => push("/reservation")}>
                Réservation
              </NavButton>
              <NavButton onClick={() => push("/profil")} className="text-white">
                Profil
              </NavButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
