"use client"
import React from 'react'
import { useRouter } from 'next/navigation'


export const Header = () => {
     const { push } = useRouter()
    return (
        
       <header className='max-h-20 w-full bg-custom-grey grid grid-cols-3 gap-4 items-center justify-center '>
        <h1 className='w-full text-4xl text-custom-pink font-bold text-center font-sans'>RESTAURANT LE SEOUL</h1>
        <div className='p-4  flex justify-center items-center max-h-screen'>
            <img  src="logo.svg" alt="logo" />
        </div>
        <nav className='w-full text-xl text-custom-pink font-bold text-center flex items-center justify-between p-4'>
            <button onClick={() => {
                    push('/')
                }}>Acceuil</button>
            <button onClick={() => {
                    push('/carte')
                }}>La carte</button>
            <button onClick={() => {
                    push('/reservation')
                }}>Réservation</button>
            <button onClick={() => {
                    push('/connection')
                }}>Connection</button>
        </nav>
       </header>
    )
}

