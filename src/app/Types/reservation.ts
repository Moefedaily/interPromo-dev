import { Table } from "./table";
import { User } from "./User";

export interface ResForm {
  name: string;
  mail: string;
  phone: string;
  date: string;
  service: "lunch" | "dinner";
  npPeople: number;
  user_id?: number;
  table_ids?: number[];
}
export interface Availability {
  [date: string]: {
    lunch: number;
    dinner: number;
  };
}
export interface Reservation {
  id: number;
  date: string;
  service: string;
  np_people: number;
  status: "pending" | "confirmed" | "cancelled";
  user: User;
  tables: Table[];
}
