
"use client"
import { useRouter } from "next/navigation";

import { Header } from "./Components/header/page";


const Seoul = ()  =>{
   const { push } = useRouter()
return (
<main className='bg-custom-grey min-h-screen'>
  <Header></Header>
  <div className='w-full text-white'>
    <div className='w-full lg:pt-8 pt-16'> 
      <h2 className="w-full text-4xl md:text-5xl lg:text-6xl text-center font-bold">Le Séoul</h2>
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-center">Street-food Coréenne</h3>
    </div>
    <div className="flex justify-center items-center max-h-screen">
      <img className='w-3/4 md:w-2/3 lg:w-1/2' src="logo.svg" alt="logo" />
    </div>
  </div>
  <div className="text-lg md:text-xl lg:text-2xl text-center text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
    <div>
      <h2 className="p-4">ADRESSE</h2>
      <p>420 Rue de la Street</p>
      <p>38000 Grenoble</p>
    </div>
    <div>
      <h2 className="p-4">HORAIRES</h2>
      <p>Du lundi au dimanche</p>
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