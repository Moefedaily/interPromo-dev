"use client"
import { SetStateAction, useState } from 'react';
import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";
import Seoul from "../page";

const reservation = ()  =>{
   const { push } = useRouter()
   const [activeButton, setActiveButton] = useState(null);

  const handleClick = (value: any) => {
    setActiveButton(value);
  };

  const dates = ["1/08", "2/08", "3/08", "4/08", "5/08", "6/08", "7/08"];
  
return (
   <main className='bg-custom-grey min-h-screen  text-white '>
  <Header></Header>
       <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Réservation</h2>
        <input className="bg-custom-grey  border border-white border-2 py-2 px-16 m-4
         rounded-md active:bg-green-500" type="text" id="username" placeholder="Nom" name="username" onClick={handleClick} required></input>
         <input className="bg-custom-grey  border border-white p-2 border-2 py-2  px-16 m-4
         rounded-md active:bg-green-500" type="email" placeholder="Email" id="email" name="email" onClick={handleClick} required></input>
        <input className="bg-custom-grey  border border-white p-2 border-2 py-2  px-16 m-4
         rounded-md active:bg-green-500" type="text" placeholder="Téléphone" id="telephone" onClick={handleClick} name="telephone" required></input>
         <div className="grid grid-cols-4 gap-4 justify-center items-center ">
            {dates.map((date) => (
        <input
          key={date}
          className={`bg-custom-grey border border-white p-2 border-2 py-2 px-4 rounded-md ${activeButton === date ? 'bg-green-500' : ''}`}
          type="button"
          value={date}
          id="date"
          name="date"
          onClick={() => handleClick(date)}
          required
        />
      ))}
         </div>
         
         <input className="bg-custom-grey  border border-white p-2 border-2 py-2  px-16 m-4
         rounded-md" type="text" placeholder="Nombre de personne(s)" id="nbpersonne" name="nbpersonne" required></input>
        <button className="bg-white text-black rounded-md px-8 py-2 m-8" type="submit">Réserver</button>
         <div className="flex items-center justify-center min-h-screen">
      
    </div>
  
      </section>
  </main>
)

}

export default reservation