"use client"
import React from 'react'
import { useRouter } from 'next/navigation'


export const AdminHeader = () => {
     const { push } = useRouter()
    return (
        
       <header className='max-h-20 w-full bg-custom-grey grid grid-cols-2 gap-1 items-center justify-center '>
        <div className='p-4 flex justify-end items-center max-h-screen'>
            <img src="logo.svg" alt="logo" />
        </div>
        <nav className='text-xl text-custom-pink font-bold flex p-4 justify-end'>
            <button className="bg-gray-100 flex font-normal text-sm border-2 mt-3 border-gray-100 text-custom-grey rounded-md p-1 m-1 justify-center w-1/4" onClick={() => {
                    push('/')
                }}>Carte</button>
            <button className="bg-gray-100 flex font-normal text-sm border-2 mt-3 border-gray-100 text-custom-grey rounded-md p-1 m-1 justify-center w-1/4 ml-6" onClick={() => {
                    push('/')
                }}>Déconnexion</button>
        </nav>
       </header>
    )
}

