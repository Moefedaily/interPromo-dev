"use client"

import React from 'react'

import { useRouter } from "next/navigation";
import { AdminHeader } from '../Components/adminHeader/page';



const adminCarte = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey'>
    <AdminHeader></AdminHeader>
        <div className=' flex items-center justify-between m-6'>
            <div className="flex-col m-auto flex justify-center items-center pt-6">
                <p className="text-white text-4xl font-bold flex">Carte</p>
                <button className="bg-gray-100 flex border-2 mt-3 border-gray-100 text-custom-grey rounded-md p-1 m-1 justify-center w-full">Ajouter un plat</button>  
            </div>
            
        </div>  
        <div className="cards text-white flex-raw flex flex-wrap content-between justify-center items-center">
            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-3/4  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-3/4  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>

            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-3/4  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
            </div>
            
            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="id w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Id</p>
                    <p></p>
                </div>
                <div className="title w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Titre</p>
                    <p></p>
                </div>
                <div className="price w-3/4 border-2 rounded-md p-1 w-100 m-1">
                    <p>Prix</p>
                    <p></p>
                </div>
                <div className="description w-3/4  border-2 rounded-md p-1 w-100 m-1">
                    <p>Description</p>
                    <p></p>
                </div>
                <div className="pt-2 w-full flex justify-center items-center flex-col">
                    <button className="bg-custom-pink flex w-2/4 border-2 border-custom-pink rounded-md p-1 m-1 text-custom-grey justify-center">Sauvegarder</button>
                    <button className="bg-gray-400 border-2 flex w-2/4 border-gray-400 text-custom-grey rounded-md p-1 m-1 text-custom-grey border-gray-400 justify-center">Supprimer</button>    
                </div>
                
            </div>
        </div>
              
  </main>
)

}

export default adminCarte



