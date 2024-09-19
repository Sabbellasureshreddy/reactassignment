// KanbanBoard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketCard from './TicketCard';
import '../styles/KanbanBoard.css'; // Adjust path if necessary

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'title');

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        console.log('API Response:', response.data);  // Log the data
        setTickets(Array.isArray(response.data.tickets) ? response.data.tickets : []);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const handleGroupBy = (criteria) => {
    setGroupBy(criteria);
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  // Sort and group tickets
  const groupedTickets = tickets.reduce((acc, ticket) => {
    let key = groupBy === 'priority' ? `Priority ${ticket.priority || 'Unassigned'}` : ticket[groupBy] || 'Unassigned';
    if (groupBy === 'priority') {
      key = `Priority ${ticket.priority || 'Unassigned'}`;
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sorting tickets within each group
  Object.keys(groupedTickets).forEach(key => {
    groupedTickets[key].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; // Descending order
      } else {
        return a.title.localeCompare(b.title); // Ascending order
      }
    });
  });

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <div className="controls">
        <button onClick={() => handleGroupBy('status')}>Group by Status</button>
        <button onClick={() => handleGroupBy('user')}>Group by User</button>
        <button onClick={() => handleGroupBy('priority')}>Group by Priority</button>
        <button onClick={() => handleSortBy('priority')}>Sort by Priority</button>
        <button onClick={() => handleSortBy('title')}>Sort by Title</button>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).sort((a, b) => {
          if (a === 'Priority Unassigned') return 1;
          if (b === 'Priority Unassigned') return -1;
          return a.localeCompare(b);
        }).map(key => (
          <div className="kanban-column" key={key}>
            <h3>{key}</h3>
            {groupedTickets[key].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
