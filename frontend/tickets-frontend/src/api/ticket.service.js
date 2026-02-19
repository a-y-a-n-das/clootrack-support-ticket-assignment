import { api } from "./axios";

export const getTickets = async (params = {}) => {
  const res = await api.get(`/tickets/`, { params });
  return res.data;
};

export const getTicketById = async (id) => {
  if (!id) {
    throw new Error("Ticket ID is required to fetch ticket details.");
  }
  try {
    const res = await api.get(`/tickets/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    throw error;
  }
};

export const createTicket = async (data) => {
  if (
    !data.description ||
    data.description.trim() === "" ||
    !data.title ||
    data.title.trim() === ""
  ) {
    throw new Error("Description and title are required to create a ticket.");
  }

  try {
    const res = await api.post("/tickets/", data);
    return res.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export const updateTicket = async (id, data) => {
  if (!id) {
    throw new Error("Ticket ID is required for updating a ticket.");
  }

  //type checking for fields

  const statusOptions = ["open", "in_progress", "closed", "resolved"];
  const categoryOptions = ["billing", "technical", "general", "account"];
  const priorityOptions = ["low", "medium", "high"];

  if (data.status && !statusOptions.includes(data.status)) {
    throw new Error(
      `Invalid status value. Allowed values are: ${statusOptions.join(", ")}`,
    );
  }
  if (data.category && !categoryOptions.includes(data.category)) {
    throw new Error(
      `Invalid category value. Allowed values are: ${categoryOptions.join(", ")}`,
    );
  }
  if (data.priority && !priorityOptions.includes(data.priority)) {
    throw new Error(
      `Invalid priority value. Allowed values are: ${priorityOptions.join(", ")}`,
    );
  }
  try {
    const res = await api.patch(`/tickets/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
};

export const classifyTicket = async (data) => {
  if (!data || data.trim() === "") {
    throw new Error("Description is required for ticket classification.");
  }
  const res = await api.post("/tickets/classify/", { description: data });
  return res.data;
};

export const stats = async () => {
  const res = await api.get("/tickets/stats/");
  return res.data;
};
