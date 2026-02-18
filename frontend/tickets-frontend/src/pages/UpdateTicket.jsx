import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket } from "../api/ticket.service";

export default function UpdateTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    category: "",
    priority: "",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    getTicketById(id)
      .then((data) => {
        setTicket(data);
        setFormData({
          status: data.status,
          category: data.category,
          priority: data.priority,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ticket:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTicket(id, formData)
      .then(() => {
        alert("Ticket updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating ticket:", error);
      });
  };

  if (loading) {
    return <div className="max-w-[600px] mx-auto p-5">Loading...</div>;
  }

  if (!ticket) {
    return <div className="max-w-[600px] mx-auto p-5">Ticket not found</div>;
  }

  return (
    <div className="max-w-[600px] mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <h1>Update Ticket</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border cursor-pointer"
        >
          Home
        </button>
      </div>

      <div className="border p-5 mb-5">
        <h2 className="font-semibold mb-2">Ticket Details</h2>
        <p className="mb-1">
          <strong>Title:</strong> {ticket.title}
        </p>
        <p className="mb-1">
          <strong>Description:</strong> {ticket.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="border p-5">
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="general">General Inquiry</option>
            <option value="account">Account Management</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block mb-1">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!hasChanges}
          className="px-5 py-2 border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
}