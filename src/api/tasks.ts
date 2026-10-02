import axios from "axios";
import type { Task } from "../types/auth";
import { apiClient } from "./client";

export type TasksParams = {
    status : string | null;
    q : string | null;
}

export async function fetchTasks(params?: TasksParams) {
  const response = await apiClient.get<Task[]>("/tasks/", {params});
  return response.data;
}