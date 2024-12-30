// components/Ticket.tsx
import React from 'react';

const events = [
  {
    eventName: "Rock Concert 2024",
    date: "April 15, 2024",
    price: 99.99,
    description: "Experience the ultimate rock music extravaganza with top artists!"
  },
  {
    eventName: "Jazz Night Live",
    date: "May 22, 2024",
    price: 59.99,
    description: "Relax and enjoy smooth jazz performances by renowned artists."
  },
  {
    eventName: "Tech Conference 2024",
    date: "June 10, 2024",
    price: 199.99,
    description: "Join the leading innovators and tech enthusiasts for groundbreaking sessions."
  }
];

const Ticket: React.FC = () => {
  const handleBuy = (eventName: string) => {
    alert(`${eventName} ticket purchased!`);
  };

  return (
    <div className="grid gap-6 max-w-4xl mx-auto p-5">
      {events.map((event, index) => (
        <div key={index} className="border rounded-lg shadow-lg p-5 bg-white">
          <h2 className="text-2xl font-bold mb-2">{event.eventName}</h2>
          <p className="text-gray-600 mb-1">{event.date}</p>
          <p className="text-lg font-semibold text-blue-500">${event.price.toFixed(2)}</p>
          <p className="text-gray-700 mt-4">{event.description}</p>
          <button 
            onClick={() => handleBuy(event.eventName)} 
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Ticket
          </button>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
