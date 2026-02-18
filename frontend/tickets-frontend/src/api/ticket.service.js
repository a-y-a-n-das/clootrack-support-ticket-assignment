import { api } from "./axios";

export const getTickets = async () => {
  const res = await api.get("/tickets/");
  return res.data;
};

export const getTicketById = async (id) => {
  const res = await api.get(`/tickets/${id}/`);
  return res.data;
};

export const createTicket = async (data) => {
  const res = await api.post("/tickets/", data);
  return res.data;
};

export const updateTicket = async (id, data) => {
  const res = await api.patch(`/tickets/${id}/`, data);
  return res.data;
};
