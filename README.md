# STUDYFLOW 📚⏱️
**Smart Study Techniques, One Flow at a Time**

![StudyFlow Screenshot](./screenshot.png) <!-- Add your screenshot later -->

## 🎯 Project Summary
STUDYFLOW is a digital study companion that helps students optimize their learning sessions through science-backed techniques like Pomodoro and Deep Work. The app provides structured timers, progress tracking, and motivational tools to enhance focus and productivity.

## 🚀 MVP Goals Achieved
| Feature            | Implementation Status |
|--------------------|----------------------|
| Multiple study techniques (Pomodoro, Deep Work, Custom) | ✅ |
| Session logging with feedback | ✅ |
| Study statistics dashboard | ✅ |
| Motivational quotes | ✅ |
| Responsive SPA with client-side routing | ✅ |
| CRUD operations for sessions | ✅ |

## 🛠️ Setup Instructions

### Frontend (React)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/studyflow.git
   cd studyflow
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Backend (json-server)
In a new terminal, navigate to your project:

bash
cd studyflow
Start the mock API server:

bash
npx json-server --watch db.json --port 3001
The API will be available at:

text
http://localhost:3001/sessions
🗺️ Route & Component Overview
App Routes
Route	Page	Description
/	Home	Welcome page with motivational quote
/pomodoro	Pomodoro Timer	25/5 minute focus/break sessions
/deepwork	Deep Work Timer	90/30 minute focused sessions
/custom	Custom Timer	User-defined session lengths
/stats	Statistics	Session history and analytics
Key Components
Component	Description
NavBar	Main navigation between routes
PomodoroTimer	25/5 minute timer implementation
DeepWorkTimer	90/30 minute timer implementation
CustomTimer	Configurable focus/break timer
SessionForm	Form for logging session feedback
StatsPanel	Visual charts of study statistics
SessionCard	Displays individual session details
MusicPlayer	Background music player (Custom page)
🌟 Features
Three Study Modes:

🍅 Pomodoro (25/5)

🧠 Deep Work (90/30)

⚙️ Custom (User-defined)

Session Tracking:

📝 Log focus level and notes

📊 View historical data

📈 Progress visualization

Productivity Boosters:

💬 Motivational quotes

🎵 Focus music integration

🔍 Session search/filter

📚 Technical Requirements Met
Requirement	Status
React SPA with routing	✅
5+ reusable components	✅
3+ routes	✅
Controlled form with POST	✅
GET from backend	✅
Immediate UI updates	✅
Styled components	✅
🎨 Design Approach
UI Library: Plain CSS with CSS Modules

Color Scheme: Blue-focused (calm productivity)

Responsive: Works on mobile & desktop

📦 Project Structure
 ```
text
studyflow/
├── public/
├── src/
│   ├── assets/          # Images & music
│   ├── components/      # Reusable components
│   ├── pages/           # Route components
│   ├── utils/           # Custom hooks
│   └── styles/          # Global styles
├── db.json              # Mock database
└── package.json

 ```
🙏 Credits
Timer logic inspired by Cal Newport's Deep Work

UI patterns from productivity apps like Forest

Icons from React Icons library

text
