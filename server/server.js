const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; 

app.use(cors());
app.use(express.json());

let scores = [];

app.post('/calculate-score', (req, res) => {
  const { name, greens, yellows, oranges, reds, blacks } = req.body;

  const points = new Map([
    ["green", 5],
    ["yellow", 6],
    ["orange", 7],
    ["red", 8],
    ["black", 10],
  ]);

  let climbs = [];

  for (let i = 0; i < blacks; i++) climbs.push(points.get("black"));
  for (let i = 0; i < reds; i++) climbs.push(points.get("red"));
  for (let i = 0; i < oranges; i++) climbs.push(points.get("orange"));
  for (let i = 0; i < yellows; i++) climbs.push(points.get("yellow"));
  for (let i = 0; i < greens; i++) climbs.push(points.get("green"));

  const score = climbs.slice(0, 7).reduce((a, b) => a + b, 0)
  
  const newResult = { id: Date.now(), name, score, greens, yellows, oranges, reds, blacks };
  scores.push(newResult);
  scores.sort((a, b) => b.score - a.score);

  res.json(newResult);
  
});

app.get('/scores', (req, res) => {
    res.json(scores || []);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});