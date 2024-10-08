const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; 

app.use(cors());
app.use(express.json());

let scores = [];
let finalsScores = [];

class MainScore {
  constructor (name, score, greens, yellows, oranges, reds, blacks) {
    this.id = Date.now()
    this.name = name;
    this.score = score;
    this.greens = greens;
    this.yellows = yellows;
    this.oranges = oranges;
    this.reds = reds;
    this.blacks = blacks;
    this.tooltip = `Greens: ${this.greens}, Yellows: ${this.yellows}, Oranges: ${this.oranges}, Reds: ${this.reds}, Blacks: ${this.blacks}`
  }
  toString() {
    return `Name: ${this.name}, Score: ${this.score}, Greens: ${this.greens}, Yellows: ${this.yellows}, Oranges: ${this.oranges}, Reds: ${this.reds}, Blacks: ${this.blacks}`;
  }
}

class FinalsScore {
  constructor (name, score, tops, highZones, lowZones, attempts, time) {
    this.id = Date.now()
    this.name = name;
    this.score = score;
    this.tops = tops;
    this.highZones = highZones;
    this.lowZones = lowZones;
    this.attempts = attempts;
    this.time = time;
    this.tooltip = `Tops: ${this.tops}, High Zones: ${this.highZones}, Low Zones: ${this.lowZones}, Attempts: ${this.attempts}, Time: ${this.time}`;
  }
  toString() {
    return `Name: ${this.name}, Score: ${this.score}, Tops: ${this.tops}, High Zones: ${this.highZones}, Low Zones: ${this.lowZones}, Attempts: ${this.attempts}, Time: ${this.time}`;
  }
}

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
  
  let newResult = new MainScore(name, score, greens, yellows, oranges, reds, blacks);

  scores.push(newResult);
  scores.sort((a, b) => b.score - a.score);

  res.json(newResult);
  
});

app.post('/calculate-finals-score', (req, res) => {
  const { name, tops, highZones, lowZones, attempts, time } = req.body;

  const points = new Map([
    ["top", 25],
    ["highZone", 10],
    ["lowZone", 5],
    ["attempts", -0.1]
  ]);
  const rounds = 4;
  let score = [];

  for (let i = 0; i < tops; i++) score.push(points.get("top"));
  for (let i = 0; i < highZones; i++) score.push(points.get("highZone"));
  for (let i = 0; i < lowZones; i++) score.push(points.get("lowZone"));

  score = score.slice(0, 4).reduce((a, b) => a + b, 0)

  if (attempts > rounds) {
    score += (attempts-rounds) * -0.1
  }

  let newResult = new FinalsScore(name, score, tops, highZones, lowZones, attempts, time);

  finalsScores.push(newResult);
  finalsScores.sort((a, b) => b.score - a.score);

  res.json(newResult);
  
});

app.get('/scores', (req, res) => {
    res.json(scores || []);
  });

app.get('/finals-scores', (req, res) => {
  res.json(finalsScores || []);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});