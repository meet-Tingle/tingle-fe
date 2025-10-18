import tingleLogo from "./assets/tingle.svg";
import PWABadge from "./PWABadge.tsx";

function App() {
  return (
    <>
      <div>
        <img src={tingleLogo} className="logo tingle" alt="Tingle logo" />
      </div>
      <h1>TINGLE</h1>
      <p className="description">
        Tingle is a platform for university students to find and connect with
        other students.
      </p>
      <PWABadge />
    </>
  );
}

export default App;
