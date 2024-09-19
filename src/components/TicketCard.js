// src/components/TicketCard.js

import React from 'react';
import '../styles/TicketCard.css'; // Adjust path if necessary

const TicketCard = ({ ticket }) => {
  if (!ticket) return null; // Guard clause

  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Priority: {getPriorityLabel(ticket.priority)}</p>
      <p>Status: {ticket.status}</p>
      <p>Assigned User: {ticket.user}</p>
    </div>
  );
};

// Helper function to convert priority number to a readable label
const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    case 0: return 'No priority';
    default: return 'Unknown priority';
  }
};

export default TicketCard;
