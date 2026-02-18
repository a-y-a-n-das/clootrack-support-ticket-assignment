import { useEffect, useState } from "react";
import { createTicket, classifyTicket } from "../api/ticket.service";
import { useDebounce } from "../api/descriptionDebouncer";

export default function CreateTicket() {
  const [description, setDescription] = useState("");
  const deBouncedDescription = useDebounce(description, 800);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "billing",
    priority: "low",
    status: "open",
  });

  useEffect(() => {
    const categories = ["billing", "technical", "general", "account"];
    const priorities = ["low", "medium", "high"];
    if (deBouncedDescription) {
      console.log("Classifying ticket with description:", deBouncedDescription);
      classifyTicket(deBouncedDescription)
        .then((res) => {
          if (
            categories.includes(res.suggested_category) &&
            priorities.includes(res.suggested_priority)
          ) {
            setFormData((prev) => ({
              ...prev,
              category: res.suggested_category,
              priority: res.suggested_priority,
            }));
          } else {
            console.warn(
              "Received invalid category or priority from classification:",
              res,
            );
          }
        })
        .catch((error) => {
          console.error("Error classifying ticket:", error);
        });
    }
  }, [deBouncedDescription, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const res = createTicket(formData);
    res
      .then(() => {
        alert("Ticket created successfully!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
      });
  };

  return (
    <div className="max-w-[600px] mx-auto p-5">
      <h1 className="mb-5">Create Ticket</h1>
      <form onSubmit={handleSubmit} className="border p-5">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              setDescription(e.target.value);
              handleChange(e);
            }}
            required
            rows="5"
            className="w-full p-2 border"
          />
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

        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            Status:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            disabled
            className="w-full p-2 border"
          />
        </div>

        <button type="submit" className="px-5 py-2 border cursor-pointer">
          Create Ticket
        </button>
      </form>
    </div>
  );
}
