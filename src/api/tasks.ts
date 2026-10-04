import axios from "axios";
import type { Task } from "../types/auth";
import { apiClient } from "./client";

export type TasksParams = {
    status : string | null;
    q : string | null;
}

export type TaskCreateParams = {
  title:string;
  description:string;
  status:string;
  due_date:string;
}
export type TaskUpdateParams = {
  status?:string;
}

export async function fetchTasks(params?: TasksParams) {
  const response = await apiClient.get<Task[]>("/tasks/", {params});
  return response.data;
}

export async function createTask(params: TaskCreateParams) {
  const response = await apiClient.post<Task[]>("/tasks/", params);
  return response.data;
}

export async function updateTask(id: number,params?: TaskUpdateParams) {
  const response = await apiClient.patch('/tasks/' + id + '/', params);
  return response.data;
}

export async function deleteTask(id: number) {
  const response = await apiClient.delete('/tasks/' + id + '/');
  return response.data;
}