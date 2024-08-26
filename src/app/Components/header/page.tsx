"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { IoClose, IoMenu } from "react-icons/io5";


export const Header = () => {
     const { push } = useRouter()
     function openMenu() {
    document.querySelector(".iconeOpen")?.classList.add("hidden");
    document.querySelector(".iconeClose")?.classList.remove("hidden");
    document.querySelector(".menuBurger")?.classList.remove("hidden");
  }

  function closeMenu() {
    document.querySelector(".iconeOpen")?.classList.remove("hidden");
    document.querySelector(".iconeClose")?.classList.add("hidden");
    document.querySelector(".menuBurger")?.classList.add("hidden");
  }
    return (
        
      <header className='max-h-20 w-full bg-custom-grey grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center'>
        
            <h1 className='w-full text-2xl md:text-3xl lg:text-4xl text-custom-pink font-bold text-center font-sans hidden lg:block'>RESTAURANT LE SEOUL</h1>
  <div className='p-4 flex justify-center items-center max-h-screen hidden lg:block'>
    <img src="logo.svg" alt="logo" />
  </div>
  <nav className='w-full text-lg md:text-xl lg:text-2xl text-custom-pink font-bold text-center flex flex-col md:flex-row items-center justify-between p-4 hidden lg:block'>
    <button className='px-2' onClick={() => { push('/') }}>Accueil</button>
    <button className='px-2' onClick={() => { push('/carte') }}>La carte</button>
    <button className='px-2' onClick={() => { push('/reservation') }}>Réservation</button>
    <button className='px-2' onClick={() => { push('/connexion') }}>Connexion</button>
  </nav>
        
  
  <nav>
    <div className="lg:hidden mx-12 w-full flex justify-between">
          
          <button className="iconeOpen " onClick={() => openMenu()}>
            <IoMenu color="#ffffff" size={60} />
          </button>
          <button className="iconeClose  hidden " onClick={() => closeMenu()}>
            <IoClose color="#ffffff" size={60} />
          </button>
        </div>
      
      <div className="menuBurger hidden bg-custom-grey absolute pb-4 z-10 flex flex-col w-full items-center">
        <button
          onClick={() => push(`/`)}
          className="text-white my-2 px-4 py-2 hover:text-custom-pink lg:hidden border border-white rounded-lg w-fit hover:border-custom-pink"
        >
          Accueil
        </button>
        <button
          onClick={() => push(`/carte`)}
          className="text-white my-2 px-4 py-2 hover:text-custom-pink lg:hidden border border-white rounded-lg w-fit hover:border-custom-pink"
        >
          La Carte
        </button>
        <button
          onClick={() => push(`/reservation`)}
          className="text-white my-2 px-4 py-2 hover:text-custom-pink lg:hidden border border-white rounded-lg w-fit hover:border-custom-pink"
        >
          Réservation
        </button>
        <button
          onClick={() => push(`/connexion`)}
          className="text-white my-2 px-4 py-2 hover:text-custom-pink lg:hidden border border-white rounded-lg w-fit hover:border-custom-pink"
        >
          Connexion
        </button>
      </div>
  </nav>
</header>
    )
}