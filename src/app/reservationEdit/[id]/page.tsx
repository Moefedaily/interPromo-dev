"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../Components/header/page";
import { reservationService } from "../../Services/reservation";
import { ResForm, Availability } from "../../Types/reservation";
import { Table } from "@/app/Types/table";
import { Oval } from "react-loader-spinner";

const EditReservation = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState<ResForm>({
    name: "",
    mail: "",
    phone: "",
    date: "",
    service: "lunch",
    npPeople: 1,
  });
  const [initialFormData, setInitialFormData] = useState<ResForm | null>(null);
  const [availability, setAvailability] = useState<Availability>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);

  useEffect(() => {
    fetchReservation();
    fetchAvailability();
  }, [id]);

  const fetchReservation = async () => {
    try {
      const reservation = await reservationService.getReservation(id);
      const formattedReservation = {
        name: reservation.user.name,
        mail: reservation.user.mail,
        phone: reservation.user.phone,
        date: reservation.date.split("T")[0],
        service: reservation.service,
        npPeople: reservation.np_people,
      };
      setFormData(formattedReservation);
      setInitialFormData(formattedReservation);
      setSelectedDate(reservation.date.split("T")[0]);
      setSelectedTables(reservation.tables.map((table: Table) => table.id));
    } catch (error) {
      setError("Failed to fetch reservation details");
    }
  };

  const fetchAvailability = async () => {
    try {
      const data = await reservationService.getAvailability();
      setAvailability(data);
    } catch (error) {
      setError("Failed to fetch availability");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: date });
    setShowServiceModal(true);
  };

  const handleServiceSelection = (service: "lunch" | "dinner") => {
    setFormData({ ...formData, service: service });
    setShowServiceModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const defaultTime = formData.service === "lunch" ? "12:00:00" : "19:00:00";
    const [year, month, day] = formData.date.split("-");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${defaultTime}`;

    const updatedData: Partial<ResForm> & { table_ids?: number[] } = {};
    (Object.keys(formData) as Array<keyof ResForm>).forEach((key) => {
      if (formData[key] !== initialFormData?.[key]) {
        if (key in updatedData) {
          (updatedData as any)[key] = formData[key];
        }
      }
    });
    updatedData.date = formattedDate;
    updatedData.table_ids = selectedTables;

    try {
      await reservationService.updateReservation(id, updatedData);
      router.push("/");
    } catch (error) {
      setError("Failed to update reservation");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await reservationService.deleteReservation(id);
        router.push("/");
      } catch (error) {
        setError("Failed to delete reservation");
      }
    }
  };

  const isDateAvailable = (date: string): boolean => {
    return (
      availability[date] &&
      (availability[date].lunch > 0 || availability[date].dinner > 0)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#FF8DDC"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#333333"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Modifier la Réservation</h2>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            className="bg-custom-grey border-white border-2 py-2 px-4 m-4 rounded-md w-full"
            type="text"
            id="name"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white border-2 py-2 px-4 m-4 rounded-md w-full"
            type="email"
            id="mail"
            name="mail"
            placeholder="Email"
            value={formData.mail}
            onChange={handleInputChange}
            required
          />
          <input
            className="bg-custom-grey border-white border-2 py-2 px-4 m-4 rounded-md w-full"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-4 gap-4 justify-center items-center m-4">
            {Object.keys(availability).length > 0 ? (
              Object.keys(availability).map((date) => (
                <button
                  key={date}
                  type="button"
                  className={`p-2 border-2 py-2 px-4 rounded-md 
                    ${selectedDate === date ? "bg-green-500" : "bg-custom-grey"}
                    ${
                      isDateAvailable(date)
                        ? "border-white"
                        : "bg-gray-400 border border-white cursor-not-allowed"
                    }`}
                  onClick={() =>
                    isDateAvailable(date) && handleDateSelection(date)
                  }
                  disabled={!isDateAvailable(date)}
                >
                  {new Date(date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </button>
              ))
            ) : (
              <p className="col-span-4 text-center">
                Aucune disponibilité trouvée.
              </p>
            )}
          </div>
          <input
            className="bg-custom-grey border-white border-2 py-2 px-4 m-4 rounded-md w-full"
            type="number"
            id="npPeople"
            name="npPeople"
            placeholder="Nombre de personne(s)"
            value={formData.npPeople}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-center space-x-4">
            <button
              className="bg-white text-black rounded-md px-8 py-2 m-8"
              type="submit"
            >
              Modifier
            </button>
            <button
              className="bg-red-500 text-white rounded-md px-8 py-2 m-8"
              type="button"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </form>
      </section>
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-custom-grey p-4 rounded-md">
            <h3 className="text-xl mb-4">Choisissez un service</h3>
            <div className="flex justify-center">
              <button
                className={`mx-2 px-4 py-2 rounded-md ${
                  formData.service === "lunch"
                    ? "bg-green-500"
                    : availability[selectedDate!].lunch > 0
                    ? "bg-transparent border border-white"
                    : "bg-gray-400 cursor-not-allowed border border-white text-white"
                }`}
                onClick={() => handleServiceSelection("lunch")}
                disabled={
                  formData.service !== "lunch" &&
                  availability[selectedDate!].lunch === 0
                }
              >
                Midi ({availability[selectedDate!].lunch})
              </button>
              <button
                className={`mx-2 px-4 py-2 rounded-md ${
                  formData.service === "dinner"
                    ? "bg-green-500"
                    : availability[selectedDate!].dinner > 0
                    ? "bg-transparent border border-white"
                    : "bg-gray-400 cursor-not-allowed border border-white"
                }`}
                onClick={() => handleServiceSelection("dinner")}
                disabled={
                  formData.service !== "dinner" &&
                  availability[selectedDate!].dinner === 0
                }
              >
                Soir ({availability[selectedDate!].dinner})
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditReservation;
