"use client"

import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";
import Seoul from "../page";

const réservation = ()  =>{
   const { push } = useRouter()
return (
   <main className='bg-custom-grey'>
  <Header></Header>
      <div className='flex items-center justify-between p-24'>
        <p className="text-color-with">carte</p>
      </div>
  </main>
)

}

export default Seoul