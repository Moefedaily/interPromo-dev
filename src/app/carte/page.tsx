
"use client"

import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";
import Seoul from "../page";

const carte = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey min-h-screen  text-white'>
  <Header></Header>
      <section className="flex justify-center items-center m-8">
        <select className="bg-custom-grey  border border-white p-2
         rounded-md" id="">
          <option value="" disabled selected>Filtres</option>
          <option value="">Plat ou dessert</option>
          <option value="">Guabao</option>
          <option value="">Bowls</option>
          <option value="">Tapas</option>
          <option value="">Veggie</option>
        </select>
      </section>
      <section className="flex flex-wrap  p-24">
        <div className="w-1/4 p-4">
          <div >
            <div className=" flex justify-center items-center ">
             <img className="shadow-lg size-4/5 shadow-custom-pink rounded-lg" src="Guabao_bulgogi.png" alt="" />
            </div>
            <div className="flex space-x-2 justify-between mt-4">
              <h2>Nom du plat</h2>
              <p>8,90€</p>
            </div>
        
            <p className="mt-4">Burger Asiatique à base de brioche de farine de riz, Poulet, Laitue, Carotte Marinée, Oignon Rouge, Mayonnaise Légèrement Pimentée, Cacahuètes, Coriandre</p>
          </div>
        </div>

        <div className="w-1/4 p-4">
          <div >
            <div className=" flex justify-center items-center ">
             <img className="shadow-lg size-4/5 shadow-custom-pink rounded-lg" src="Guabao_bulgogi.png" alt="" />
            </div>
            <div className="flex space-x-2 justify-between mt-4">
              <h2>Nom du plat</h2>
              <p>8,90€</p>
            </div>
        
            <p className="mt-4">Burger Asiatique à base de brioche de farine de riz, Poulet, Laitue, Carotte Marinée, Oignon Rouge, Mayonnaise Légèrement Pimentée, Cacahuètes, Coriandre</p>
          </div>
        </div>
        <div className="w-1/4 p-4">
          <div >
            <div className=" flex justify-center items-center ">
             <img className="shadow-lg size-4/5 shadow-custom-pink rounded-lg" src="Guabao_bulgogi.png" alt="" />
            </div>
            <div className="flex space-x-2 justify-between mt-4">
              <h2>Nom du plat</h2>
              <p>8,90€</p>
            </div>
        
            <p className="mt-4">Burger Asiatique à base de brioche de farine de riz, Poulet, Laitue, Carotte Marinée, Oignon Rouge, Mayonnaise Légèrement Pimentée, Cacahuètes, Coriandre</p>
          </div>
        </div>
        <div className="w-1/4 p-4">
          <div >
            <div className=" flex justify-center items-center ">
             <img className="shadow-lg size-4/5 shadow-custom-pink rounded-lg" src="Guabao_bulgogi.png" alt="" />
            </div>
            <div className="flex space-x-2 justify-between mt-4">
              <h2>Nom du plat</h2>
              <p>8,90€</p>
            </div>
        
            <p className="mt-4">Burger Asiatique à base de brioche de farine de riz, Poulet, Laitue, Carotte Marinée, Oignon Rouge, Mayonnaise Légèrement Pimentée, Cacahuètes, Coriandre</p>
          </div>
        </div>
        <div className="w-1/4 p-4">
          <div >
            <div className=" flex justify-center items-center ">
             <img className="shadow-lg size-4/5 shadow-custom-pink rounded-lg" src="Guabao_bulgogi.png" alt="" />
            </div>
            <div className="flex space-x-2 justify-between mt-4">
              <h2>Nom du plat</h2>
              <p>8,90€</p>
            </div>
        
            <p className="mt-4">Burger Asiatique à base de brioche de farine de riz, Poulet, Laitue, Carotte Marinée, Oignon Rouge, Mayonnaise Légèrement Pimentée, Cacahuètes, Coriandre</p>
          </div>
        </div>
      </section>
  </main>
)

}

export default carte