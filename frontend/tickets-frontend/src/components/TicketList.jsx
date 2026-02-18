import TicketCard from "../components/TicketCard";

export default function TicketList({ tickets }) {

    if (tickets.length === 0) {
        return <p>No tickets found.</p>;
    }
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
