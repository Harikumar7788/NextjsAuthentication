import React from "react";
import Ticket from "../../components/ui/Ticket";

export default function TicketsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>
      <Ticket />
    </div>
  );
}
