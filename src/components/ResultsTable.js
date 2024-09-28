import React from 'react';

const ResultsTable = ({ scores }) => {
  return (
    <div className="results-table">
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td> {/* Use index directly instead of scores.indexOf(s) */}
              <td>{s.name}</td>
              <td>{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;