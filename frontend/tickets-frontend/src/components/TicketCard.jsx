import { Link } from "react-router-dom";

export default function TicketCard({ ticket }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-lg">{ticket.title}</h2>
      <p className="text-sm text-gray-500">Status: {ticket.status}</p>
      <p className="text-sm text-gray-500">Priority: {ticket.priority}</p>
      <p className="text-sm text-gray-500">Category: {ticket.category}</p>
      <p className="text-sm text-gray-500 mt-2">
        Description:{" "}
        {ticket.description.length > 100
          ? ticket.description.substring(0, 100) + "..."
          : ticket.description}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Created At: {new Date(ticket.created_at).toLocaleString()}
      </p>

      <Link
        to={`/tickets/${ticket.id}`}
        className="text-blue-600 text-sm mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
