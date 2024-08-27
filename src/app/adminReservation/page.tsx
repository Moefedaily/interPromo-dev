"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "../Components/adminHeader/page";
import { reservationService } from "../Services/reservation";
import { Reservation, ResForm } from "../Types/reservation";

const AdminReservation = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newStatuses, setNewStatuses] = useState<{
    [key: number]: Reservation["status"];
  }>({});
  const { push } = useRouter();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async (): Promise<void> => {
    try {
      const data = await reservationService.getReservations();
      console.log("Reservation data:", data);
      setReservations(data);
      setLoading(false);
    } catch (error) {
      setError(
        "Error fetching reservations: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
      setLoading(false);
    }
  };

  const handleStatusChange = (id: number, status: Reservation["status"]) => {
    setNewStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const confirmStatusUpdate = async (id: number): Promise<void> => {
    if (!newStatuses[id]) return;

    try {
      await reservationService.updateReservation(id, {
        status: newStatuses[id],
      });
      fetchReservations();
      setNewStatuses((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      setError(
        "Error updating reservation status: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  if (loading)
    return <div className="text-white text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <main className="bg-custom-grey min-h-screen">
      <AdminHeader />
      <div className="flex items-center justify-between m-6">
        <div className="flex-col m-auto flex justify-center items-center pt-6">
          <p className="text-white text-4xl font-bold flex">Réservations</p>
        </div>
      </div>
      <div className="cards text-white flex flex-wrap justify-center items-start">
        {reservations.map((reservation: Reservation) => (
          <div
            key={reservation.id}
            className="card w-64 border-2 rounded-md m-5 flex flex-col p-4"
          >
            <div className="mb-2">
              <p className="font-bold">N° de réservation</p>
              <p>{reservation.id}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Nom</p>
              <p>{`${reservation.user.name}`}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Mail</p>
              <p>{reservation.user.mail}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Téléphone</p>
              <p>{reservation.user.phone}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Date de réservation</p>
              <p>{new Date(reservation.date).toLocaleDateString()}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Heure de réservation</p>
              <p>{reservation.service}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Nombre de personnes</p>
              <p>{reservation.np_people}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Nombre de tables</p>
              <p>{reservation.tables.length}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Statut</p>
              <select
                value={newStatuses[reservation.id] || reservation.status}
                onChange={(e) =>
                  handleStatusChange(
                    reservation.id,
                    e.target.value as Reservation["status"]
                  )
                }
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            {newStatuses[reservation.id] &&
              newStatuses[reservation.id] !== reservation.status && (
                <button
                  onClick={() => confirmStatusUpdate(reservation.id)}
                  className="mt-2 bg-custom-pink  border-custom-pink text-custom-grey hover:bg-gray-400 hover:text-white font-bold py-2 px-4 rounded"
                >
                  Confirmer le changement
                </button>
              )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminReservation;
