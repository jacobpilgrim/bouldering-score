import React, { useState, useEffect } from 'react';
import './FinalRound.css';
import ResultsTable from '../components/ResultsTable';

function FinalRound() {
    const [name, setName] = useState("");
    const [tops, setTops] = useState(0);
    const [highZones, setHighZones] = useState(0);
    const [lowZones, setLowZones] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [time, setTime] = useState("");
    const [score, setScore] = useState(null);
    const [scores, setScores] = useState([]);


    useEffect(() => {
        fetchScores();
      }, []);
    
    
      const fetchScores = async () => {
        try {
          const response = await fetch('http://localhost:3001/finals-scores');
          const data = await response.json();
            const sortedScores = sortFinalsTieBreaker(data);
          setScores(sortedScores);
        } catch (error) {
          console.error('Error fetching scores:', error);
        }
      };

      const sortFinalsTieBreaker = (scores) => {
        return scores.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.time - b.time;
        });
      };

      const calculateScore = async () => {
        try {
          const response = await fetch('http://localhost:3001/calculate-finals-score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              tops: tops,
              highZones: highZones,
              lowZones: lowZones,
              attempts: attempts,
              time: time,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
    
          setScore(data.score);
    
          fetchScores();
    
        } catch (error) {
          console.error('Error:', error);
        }
      };

      return (
        <div className="FinalRound">
          <h3 className="main-title">Final Round</h3>
          
          <div className="content-container">
          
          <ResultsTable scores={scores} />
            
            <div className="score-calculator">
              <h2>Score Calculator</h2>
              <div className="input-container">
                <label>
                    Competitor Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div className="input-container">
                <label>
                    Tops
                    <input
                        type="number"
                        value={tops}
                        onChange={(e) => setTops(parseInt(e.target.value)|| 0)}
                    />
                </label>
            </div>

            <div className="input-container">
                <label>
                    High Zones
                    <input
                        type="number"
                        value={highZones}
                        onChange={(e) => setHighZones(parseInt(e.target.value)|| 0)}
                    />
                </label>
            </div>

            <div className="input-container">
                <label>
                    Low Zones
                    <input
                        type="number"
                        value={lowZones}
                        onChange={(e) => setLowZones(parseInt(e.target.value)|| 0)}
                    />
                </label>
            </div>

            <div className="input-container">
                <label>
                    Attempts
                    <input
                        type="number"
                        value={attempts}
                        onChange={(e) => setAttempts(parseInt(e.target.value) || 0)}
                    />
                </label>
            </div>

            <div className="input-container">
                <label>
                    Total Time
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>
            </div>
              
              <button onClick={calculateScore}>Record Score</button>
    
              {score !== null && <h2>Score: {score}</h2>}
            </div>
          </div>
        </div>
      );



}

export default FinalRound;