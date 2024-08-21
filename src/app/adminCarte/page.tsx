"use client"

import React from 'react'
import { Header } from "../Components/amdinHeader/page";
import { useRouter } from "next/navigation";


const adminCarte = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey'>
  <amdinHeader></adminHeader>
      <div className='flex items-center justify-between p-24'>
        <p className="text-color-with">Carte</p>
      </div>
  </main>
)

}

export default adminCarte



