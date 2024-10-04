import React, { useState, useEffect } from 'react';
import './MainRound.css';
import ResultsTable from '../components/ResultsTable';

function MainRound() {
  const [greensCount, setGreensCount] = useState(0);
  const [yellowsCount, setYellowsCount] = useState(0);
  const [orangesCount, setOrangesCount] = useState(0);
  const [redsCount, setRedsCount] = useState(0);
  const [blacksCount, setBlacksCount] = useState(0);
  const [name, setName] = useState("");
  const [score, setScore] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);


  const fetchScores = async () => {
    try {
      const response = await fetch('http://localhost:3001/scores');
      const data = await response.json();
      const sortedScores = sortScoresWithTieBreaker(data);
      setScores(sortedScores);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const sortScoresWithTieBreaker = (scores) => {
    return scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.blacks !== a.blacks) return b.blacks - a.blacks;
      if (b.reds !== a.reds) return b.reds - a.reds;
      if (b.oranges !== a.oranges) return b.oranges - a.oranges;
      if (b.yellows !== a.yellows) return b.yellows - a.yellows;
      return b.greens - a.greens;
    });
  };

  const calculateScore = async () => {
    try {
      const response = await fetch('http://localhost:3001/calculate-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          greens: greensCount,
          yellows: yellowsCount,
          oranges: orangesCount,
          reds: redsCount,
          blacks: blacksCount,
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
    <div className="MainRound">
      <h3 className="main-title">Main Round</h3>
      
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
            {[ 
              { label: 'Greens', state: greensCount, setState: setGreensCount },
              { label: 'Yellows', state: yellowsCount, setState: setYellowsCount },
              { label: 'Oranges', state: orangesCount, setState: setOrangesCount },
              { label: 'Reds', state: redsCount, setState: setRedsCount },
              { label: 'Blacks', state: blacksCount, setState: setBlacksCount },
            ].map(({ label, state, setState }) => (
              <label key={label}>
                {label} climbed
                <input
                  type="number"
                  value={state}
                  onChange={(e) => setState(parseInt(e.target.value) || 0)}
                />
              </label>
            ))}
          </div>
          
          <button onClick={calculateScore}>Record Score</button>

          {score !== null && <h2>Score: {score}</h2>}
        </div>
      </div>
    </div>
  );
}

export default MainRound;