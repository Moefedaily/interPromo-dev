export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
}

export interface CreateMealDto {
  name: string;
  description: string;
  price: number;
  picture: string;
}

export interface UpdateMealDto {
  name?: string;
  description?: string;
  price?: number;
  picture?: string;
}

export interface MealServiceResponse {
  meal: Meal[];
}
