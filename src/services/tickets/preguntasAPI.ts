/* eslint-disable @typescript-eslint/no-explicit-any */
import { client_tk } from "../client";
import { ResponseTkPreguntas } from "../types";

//llamar todas las preguntas
export const getTkPreguntas = async (): Promise<ResponseTkPreguntas> => {
  return await client_tk.get("preguntas", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//crear la pregunta
export const crearTkPregunta = async (data: any): Promise<any> => {
  return await client_tk.post<any>("preguntas", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//ver  la pregunta por id
export const getTkPregunta = async (id: React.Key): Promise<any> => {
  return await client_tk.get<any>(`preguntas/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//actualizar la pregunta
export const updateTkPregunta = async (data: any, id: any): Promise<any> => {
  return await client_tk.put<any>(`preguntas/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//cambiar el estado de la pregunta 
export const DeleteTkPregunta = async ( id: any): Promise<any> => {
  return await client_tk.delete<any>(`preguntas/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};