"use client"

import React from 'react'

import { useRouter } from "next/navigation";
import { AdminHeader } from '../Components/adminHeader/page';



const adminReservation = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey'>
    <AdminHeader></AdminHeader>
        <div className=' flex items-center justify-between m-6'>
            <div className="flex-col m-auto flex justify-center items-center pt-6">
                <p className="text-white text-4xl font-bold flex">Réservations</p>
            </div>
            
        </div>  
        <div className="cards text-white flex-raw flex flex-wrap content-between justify-center items-center">
            <div className="card w-1/5 border-2 rounded-md m-5 margin-auto flex justify-center items-center flex-col p-2">
                <div className="numero w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>N° de réservation</p>
                    <p></p>
                </div>
                <div className="name w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Nom Prénom</p>
                    <p></p>
                </div>
                <div className="mail w-4/5 border-2 rounded-md p-1 w-100 m-1">
                    <p>Mail</p>
                    <p></p>
                </div>
                <div className="tel w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Téléphone</p>
                    <p></p>
                </div>
                <div className="date w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Date de réservation</p>
                    <p></p>
                </div>
                <div className="hour w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Heure de réservation</p>
                    <p></p>
                </div>
                <div className="nb-peop w-4/5  border-2 rounded-md p-1 w-100 m-1">
                    <p>Nombre de personnes</p>
                    <p></p>
                </div>
                
            </div>
        </div>
 
  </main>
)

}

export default adminReservation



