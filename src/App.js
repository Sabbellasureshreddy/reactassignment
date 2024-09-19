import React from 'react';
import KanbanBoard from './components/KandanBoard';
  // Import the KanbanBoard component

function App() {
  return (
    <div className="App">
      <h1>Suresh's Kanban Board</h1>
      <KanbanBoard /> {/* Render the KanbanBoard component */}
    </div>
  );
}

export default App;
