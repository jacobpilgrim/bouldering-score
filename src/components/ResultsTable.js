import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

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
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 250 }}
                overlay={
                  <Tooltip id="tooltip-right">
                    {s.tooltip}
                  </Tooltip>
                }
              >
                <td>{s.score} </td>
              </OverlayTrigger>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;