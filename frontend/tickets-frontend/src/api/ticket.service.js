import { api } from "./axios";

export const getTickets = async (params = {}) => {
  const res = await api.get(`/tickets/`, { params });
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

export const classifyTicket = async (data) => {
  const res = await api.post("/tickets/classify/", { description: data });
  return res.data;
};

export const stats = async () => {
  const res = await api.get("/tickets/stats/");
  return res.data;
};