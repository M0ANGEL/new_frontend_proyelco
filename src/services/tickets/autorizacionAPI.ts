/* eslint-disable @typescript-eslint/no-explicit-any */
import { client_tk } from "../client";
import { ResponseTkTickts, ResponseTkTicktsAutorizacion } from "../types";

//llamar todas las categorias
export const getTkTicketAutorizar = async (): Promise<ResponseTkTickts> => {
  return await client_tk.get("ticket-autorizacion", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//ver de el ticket que necesita autorizar por id
export const getTkTicketAuto = async (id: React.Key): Promise<any> => {
  return await client_tk.get<any>(`ticket-autorizacion/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

//cambiar el estado de el ticket 
export const AutorizarTkTicket = async (data: any, id: any): Promise<any> => {
  return await client_tk.put<any>(`ticket-autorizacion/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};


//historial de tickets
export const getTkAutorizacionHistorial = async (): Promise<ResponseTkTicktsAutorizacion> => {
  return await client_tk.get("tickets-autorizacion-historial", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};


//cambiar el estado de la categoria 
export const ActivarAutorizacion = async ( id: any): Promise<any> => {
  return await client_tk.get<any>(`cancelar-rechazo-autorizacion/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
