import React from 'react';


function Leaderboard({ players }) {
  const icons = [
    '🥇', // gold medal for rank 1
    '🥈', // silver medal for rank 2
    '🥉', // bronze medal for rank 3
  ];

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {players.map((player, index) => (
          <li key={player.id}>
            {index <= 2 && <span className="icon">{icons[index]}</span>}
            <span className="rank">{index + 1}.</span>
            <span className="name">{player.name}</span>
            <span className="score">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const players = [
    { id: 1, name: 'Alice', score: 100 },
    { id: 2, name: 'Bob', score: 90 },
    { id: 3, name: 'Charlie', score: 80 },
    { id: 4, name: 'Dave', score: 70 },
    { id: 5, name: 'Eve', score: 60 },
  ];

  return (
    <div className="app">
      <Leaderboard players={players} />
    </div>
  );
}

export default App;
