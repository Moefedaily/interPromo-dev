export interface ResForm {
    name: string;
    mail: string;
    phone: string;
    date: string;
    service: 'lunch' | 'dinner';
    npPeople: number;
    user_id?: number;
  }
  export interface Availability {
    [date: string]: {
      lunch: number;
      dinner: number;
    };
  }  