import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function PollChart() {
  // canvasRef connects React to the real HTML canvas
  const canvasRef = useRef(null);

  // chartInstanceRef stores the Chart.js chart object
  const chartInstanceRef = useRef(null);

  // votes is React state for the poll numbers
  const [votes, setVotes] = useState({
  React: 1,
  Vue: 2,
  Angular: 1,
  Svelte: 1,
});

  // Get names for chart labels
  const labels = Object.keys(votes);

  // Get numbers for chart data
  const values = Object.values(votes);

  // Add 1 vote when button is clicked
  function handleVote(framework) {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [framework]: prevVotes[framework] + 1,
    }));
  }

  // Reset all votes to zero
  function resetVotes() {
    setVotes({
      React: 0,
      Vue: 0,
      Angular: 0,
      Svelte: 0,
    });
  }

  useEffect(() => {
    // Stop if canvas is not ready
    if (!canvasRef.current) return;

    // Create Chart.js chart only one time
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Votes",
              data: values,
              backgroundColor: ["#61dafb", "#42b883", "#dd0031", "#ff3e00"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    } else {
      // If chart already exists, update the old chart data
      chartInstanceRef.current.data.datasets[0].data = values;

      // Redraw the chart
      chartInstanceRef.current.update();
    }

    // Creating a new Chart() every render without destroying the old chart
    // causes canvas errors because Chart.js keeps old event listeners and canvas references.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [votes]);

  return (
    <section>
      <div className="buttons">
        {labels.map((framework) => (
          <button key={framework} onClick={() => handleVote(framework)}>
            Vote {framework}
          </button>
        ))}
      </div>

      <button className="reset" onClick={resetVotes}>
        Reset Votes
      </button>

      <div className="chart-box">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="results">
        {labels.map((framework) => (
          <p key={framework}>
            {framework}: {votes[framework]} votes
          </p>
        ))}
      </div>
    </section>
  );
}

export default PollChart;