Dynamic Poll Dashboard – Chart.js Integration

Project Overview

This project demonstrates how to integrate a non-React library (Chart.js) into a React application using useEffect and useRef. The application allows users to vote for their favorite JavaScript framework and displays the results in a dynamic bar chart that updates in real time.

Features

• Vote for React, Vue, Angular, or Svelte.
• Display poll results using a Chart.js bar chart.
• Update chart data automatically when React state changes.
• Reset all vote counts with a single button.
• Prevent memory leaks and canvas rendering errors using Chart.js cleanup methods.

Technologies Used

• React
• Vite
• Chart.js
• JavaScript
• CSS

Project Structure

chartjs-integration/

├── src/

│   ├── components/

│   │   └── PollChart.jsx

│   ├── App.jsx

│   ├── App.css

│   └── main.jsx

├── package.json

└── README.md

How to Run

1. Create the Vite React project:

   npm create vite@latest chartjs-integration -- --template react

2. Move into the project folder:

   cd chartjs-integration

3. Install dependencies:

   npm install

4. Install Chart.js:

   npm install chart.js

5. Start the development server:

   npm run dev

6. Open the local URL shown in the terminal, usually:

   http://localhost:5173

How It Works

1. React stores the vote counts using useState.
2. useRef is used to access the HTML canvas element and store the Chart.js instance.
3. useEffect creates the Chart.js bar chart when the component loads.
4. When votes change, the existing chart data is updated and chart.update() redraws the chart.
5. The cleanup function destroys the chart instance when the component unmounts, preventing memory leaks and canvas rendering errors.

Test Cases

Normal Cases

1. Vote for React once and verify the React vote count increases by one.
2. Vote for Vue multiple times and verify the chart updates correctly.
3. Click Reset Votes and verify all vote counts return to zero.

Edge Cases

1. Click voting buttons rapidly and verify the chart continues to update correctly.
2. Click Reset Votes multiple times and verify the application remains stable.
3. Refresh or unmount the component and verify no Chart.js canvas errors occur.

Learning Outcomes

• Integrating a non-React JavaScript library into React.
• Managing external libraries with useEffect.
• Using useRef to work with DOM elements and third-party instances.
• Synchronizing React state with Chart.js.
• Implementing cleanup functions to prevent memory leaks and rendering issues.
