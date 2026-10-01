# 🏏 Ricket

### Play Cricket. Learn Coding.

Ricket is a cricket-inspired coding game where players solve programming problems to score runs.

Instead of simply checking whether a player's code contains an expected answer, Ricket executes the submitted program against multiple test cases and calculates the score from the actual results.

## 🎯 How It Works

1. Enter player name.
2. Select programming language.
3. Select an IPL team.
4. Select difficulty.
5. Start the match.
6. Solve one coding problem per ball.
7. Submit the program.
8. The backend executes the code in a sandbox.
9. Visible and hidden test cases are executed.
10. Passed test cases determine the runs.
11. Six balls make one over.
12. Three overs complete the match.

## 🏏 Scoring

| Test Cases Passed | Result |
| ----------------- | -----: |
| 100%              | 6 Runs |
| 70–99%            | 4 Runs |
| 40–69%            | 2 Runs |
| 1–39%             | 0 Runs |
| Time Expired      | Wicket |

## 🧠 Example

For a reverse-string question, this is not considered a correct general solution:

```python
print("olleh")
```

It only works for one specific input.

A proper solution:

```python
text = input()
print(text[::-1])
```

is tested with different inputs and receives full runs when all test cases pass.

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Code Execution

* Docker sandbox

### Supported Languages

* Python
* JavaScript
* Java
* C++

## 📂 Architecture

```text
Player
   ↓
Frontend
   ↓
REST API
   ↓
Node.js Backend
   ↓
Question Service
   ↓
Code Judge
   ↓
Docker Sandbox
   ↓
Hidden Test Cases
   ↓
Output Comparison
   ↓
Runs / Wicket
   ↓
Cricket Scoreboard
```

## 🚀 Running the Project

Install Node.js and Docker first.

### Backend

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

Then open `index.html` through a local web server.

## 🔐 Security

Submitted programs are executed inside isolated Docker containers with:

* Network disabled
* Memory limits
* CPU limits
* Process limits
* Execution timeout
* Temporary source files

Never execute untrusted code directly on the host machine.

## 🚀 Future Enhancements

* User authentication
* Leaderboards
* Match history
* More programming languages
* Daily challenges
* Achievements and badges
* Multiplayer coding matches
* Difficulty progression
* AI-powered hints
* Cloud deployment
