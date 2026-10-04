import { apiClient } from "./client";

export interface UserUpdateParams{
    username:string;
    email:string;
}

export async function fetchUser(id: number) {
  const response = await apiClient.get('/users/' + id + '/');
  return response.data;
}

export async function updateUser(id: number,params?: UserUpdateParams) {
  const response = await apiClient.patch('/users/' + id + '/', params);
  return response.data;
}