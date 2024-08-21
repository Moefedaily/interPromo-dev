
"use client"
import { useRouter } from "next/navigation";

import { Header } from "./Components/header/page";


const Seoul = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey min-h-screen'>
  <Header></Header>
      <div className='w-full  text-white'>
        <div className='w-full pt-8'> 
          <h2 className="w-full text-6xl text-center font-bold">Le Séoul</h2>
          
          <h3 className="text-4xl text-center">Street-food Coréenne</h3>
        </div>
       
        <div className="flex justify-center items-center max-h-screen'">
          <img className='w-1/2' src="logo.svg" alt="logo" />
        </div>
        
      </div >
      <div className="text-2xl text-center text-white grid grid-cols-3 gap-4 items-center justify-center ">
        <div>
          <h2 className="p-4">ADRESSE </h2>
          <p>420 Rue de la Street</p>
          <p>38000 Grenoble</p>
        </div>
        <div>
          <h2 className="p-4">HORAIRES</h2>
          <p>Du lundi au dimanche  </p>
          <p>de 11h à 13h le midi et</p>
          <p>de 19h à 21h le soir</p>
        </div>
        <div>
          <h2 className="p-4">CONTACT</h2>
          <p>04 55 66 34 23</p>
          <p>contact@seoul.fr</p>
        </div>
      </div>
  </main>
)

}

export default Seoul