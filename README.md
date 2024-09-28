
# Bouldering Competition Scoring System

## Project Overview

This project is a web application designed to manage scoring for bouldering competitions. It allows users to record scores for climbers in multiple rounds, including both preliminary and finals rounds. The scoring system follows the rules set by the International Federation of Sport Climbing (IFSC).

## Scoring
### Main Round 
Score calculation based on NIBS Competition Rules

**Main Round Score**
  
  | Colour  | Points |
  |---------|--------|
  | Green   | 5      |
  | Yellow  | 6      |
  | Orange  | 7      |
  | Red     | 8      |
  | Black   | 10     |

At the end of the 2-hour main round, each competitor tallies up their 7 highest individual scores. The total is their overall score. If there is a tie, competitors will be ranked by their split score.

- **Split Score**

  The split score ranks climbers by the number of black problems, then the number of red problems, etc. completed. All problems completed should be marked on the scoresheet as they count towards the split score.

### Finals Round 
Score calculation based on IFSC Rules:

A climber can earn a maximum of 100 points in each round. The scoring breakdown is as follows:

- 25 points for each boulder successfully topped (for a maximum of 100 points if all four boulders are topped).
- For each boulder not topped: 
  - 10 points for reaching the high zone (second checkpoint) 
  - 5 points for reaching the low zone (first checkpoint).
- -0.1 points (a deduction) for each failed attempt to reach a zone or top. Points are only deducted if an athlete later reaches that zone or top.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jacobpilgrim/bouldering-score.git
   cd bouldering-score
2. Install the necessary dependencies:
	```bash
	npm install
3. If using a backend server, ensure it is running:
	```bash
	cd server
	node server.js
4. Start the frontend application:
	```bash
	npm start
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

### Main Round

-   Enter the competitor's name and the number of boulders climbed for each colour.

### Finals

-   Enter the competitor's name and the number of total tops, high zones, low zones, attempts, and time across all four rounds.
    
-   Submit the scores to calculate total points.
    
-   View results in a live-updating results table.
