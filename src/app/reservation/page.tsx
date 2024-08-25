"use client";
import React, { useState, useEffect } from "react";
import { ResForm, Availability } from "../Types/reservation";
import { reservationService } from "../Services/reservation";
import { Header } from "../Components/header/page";
import { useRouter } from "next/navigation";

const Reservation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ResForm>({
    name: "",
    email: "",
    tel: "",
    date: "",
    service: "lunch",
    npPeople: 1,
  });
  const [availability, setAvailability] = useState<Availability>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reservationService.getAvailability();
      console.log("Availability data:", data);
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setError(
        `Failed to fetch availability: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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

    try {
      const reservationExists =
        await reservationService.checkExistingReservation(
          formattedDate,
          formData.service
        );

      if (reservationExists) {
        setError(
          "You already have a reservation for this date and service. Would you like to modify it instead?"
        );
        return;
      }

      const reservationData: ResForm = {
        ...formData,
        date: formattedDate,
        npPeople: Number(formData.npPeople),
      };

      await reservationService.createReservation(reservationData);
      router.push("/");
    } catch (error) {
      console.error("Error submitting reservation:", error);
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  const isDateAvailable = (date: string): boolean => {
    return (
      availability[date] &&
      (availability[date].lunch > 0 || availability[date].dinner > 0)
    );
  };

  return (
    <main className="bg-custom-grey min-h-screen text-white">
      <Header />
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="text-5xl font-bold m-16">Réservation</h2>
        {isLoading ? (
          <p>Chargement des disponibilités...</p>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error}
            {error.includes("You already have a reservation") ? (
              <button
                className="ml-4 bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => router.push("/modify-reservation")}
              >
                Modifier la réservation existante
              </button>
            ) : (
              <button
                className="ml-4 bg-white text-red-500 px-2 py-1 rounded"
                onClick={fetchAvailability}
              >
                Réessayer
              </button>
            )}
          </div>
        ) : (
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
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="bg-custom-grey border-white border-2 py-2 px-4 m-4 rounded-md w-full"
              type="tel"
              id="tel"
              name="tel"
              placeholder="Téléphone"
              value={formData.tel}
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
                      ${
                        selectedDate === date
                          ? "bg-green-500"
                          : "bg-custom-grey"
                      }
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
            <div className="flex justify-center">
              <button
                className="bg-white text-black rounded-md px-8 py-2 m-8"
                type="submit"
              >
                Réserver
              </button>
            </div>
          </form>
        )}
      </section>
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-custom-grey p-4 rounded-md">
            <h3 className="text-xl mb-4">Choisissez un service</h3>
            <div className="flex justify-center">
              <button
                className={`mx-2 px-4 py-2 rounded-md ${
                  availability[selectedDate!].lunch > 0
                    ? "bg-transparent border border-white"
                    : "bg-gray-400 cursor-not-allowed border border-white text-white"
                }`}
                onClick={() =>
                  availability[selectedDate!].lunch > 0 &&
                  handleServiceSelection("lunch")
                }
                disabled={availability[selectedDate!].lunch === 0}
              >
                Midi ({availability[selectedDate!].lunch})
              </button>
              <button
                className={`mx-2 px-4 py-2 rounded-md ${
                  availability[selectedDate!].dinner > 0
                    ? "bg-transparent border border-white"
                    : "bg-gray-400 cursor-not-allowed border border-white"
                }`}
                onClick={() =>
                  availability[selectedDate!].dinner > 0 &&
                  handleServiceSelection("dinner")
                }
                disabled={availability[selectedDate!].dinner === 0}
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

export default Reservation;
