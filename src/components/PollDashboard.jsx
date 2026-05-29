import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function PollDashboard() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const initialVotes = {
    React: 0,
    Vue: 0,
    Angular: 0,
    Svelte: 0,
  };

  const [votes, setVotes] = useState(initialVotes);

  const labels = Object.keys(votes);
  const data = Object.values(votes);

  const voteFor = (framework) => {
    setVotes((prev) => ({
      ...prev,
      [framework]: prev[framework] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes(initialVotes);
  };

  useEffect(() => {
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Votes",
              data,
              backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
            },
          },
        },
      });
    } else {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.update();
    }

    // Recreating Chart.js on every render without destroying the old instance can reuse the same canvas and cause rendering errors.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, data]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Dynamic Poll Dashboard</h1>
      <p>Vote for your favorite JavaScript framework.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        {Object.keys(votes).map((framework) => (
          <button
            key={framework}
            onClick={() => voteFor(framework)}
            style={{ padding: "10px 16px", cursor: "pointer" }}
          >
            Vote {framework}
          </button>
        ))}
      </div>

      <button
        onClick={resetVotes}
        style={{
          padding: "10px 18px",
          cursor: "pointer",
          background: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: 6,
          marginBottom: 24,
        }}
      >
        Reset Votes
      </button>

      <div style={{ height: 400, background: "#fff", padding: 16 }}>
        <canvas ref={canvasRef} />
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>Current votes:</strong>
        <ul>
          {Object.entries(votes).map(([framework, count]) => (
            <li key={framework}>
              {framework}: {count} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}