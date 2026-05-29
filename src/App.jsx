import PollChart from "./components/PollChart";
import "./App.css";

function App() {
  return (
    <main className="app">
      <h1>Dynamic Poll Dashboard</h1>
      <p>Vote for your favorite JavaScript framework.</p>

      <PollChart />
    </main>
  );
}

export default App;