import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../api/ticket.service";
import TicketList from "../components/TicketList";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-4 mb-6">
          <Link
            to="/tickets/create"
            className="px-4 py-2 border cursor-pointer inline-block"
          >
            Create New Ticket
          </Link>
          <Link
            to="/stats"
            className="px-4 py-2 border cursor-pointer inline-block"
          >
            Stats
          </Link>
        </div>
      </div>
      <TicketList tickets={tickets} />
    </div>
  );
}
