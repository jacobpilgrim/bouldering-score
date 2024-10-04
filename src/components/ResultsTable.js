import React from 'react';
import Tooltip from './Tooltip';

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
              <td>{index + 1}</td> 
              <td>{s.name}</td>
              
              <Tooltip text={ s.tooltip }>
                <td>{s.score}</td>
              </Tooltip>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;