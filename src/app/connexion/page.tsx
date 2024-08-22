"use client"

import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";


const connexion = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey min-h-screen  text-white '>
    <Header></Header>
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Connexion</h2>
        <input className="bg-custom-grey  border border-white border-2 p-2 m-4
         rounded-md" type="text" id="username" placeholder="Identifient" name="username" required></input>
        <input className="bg-custom-grey  border border-white p-2 border-2 p-2 m-4
         rounded-md" type="password" placeholder="Mot de passe" id="password" name="password" required></input>
        <button className="bg-white text-black rounded-md px-8 py-4 m-8" type="submit">Se connecter</button>
  
      </section>
    </main> 
)

}

export default connexion