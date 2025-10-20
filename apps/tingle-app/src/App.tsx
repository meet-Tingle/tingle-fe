import { Text } from "@tingle/ui";
import tingleLogo from "./assets/tingle.svg";
import PWABadge from "./PWABadge.tsx";

function App() {
  return (
    <>
      <div>
        <img src={tingleLogo} className="logo tingle" alt="Tingle logo" />
      </div>
      <h1>TINGLE</h1>
      <Text variant="body">
        Tingle is a matching platform based on university student verification
        for university students to find and connect with other students.
      </Text>
      <br />
      <Text variant="caption">Built with React + Vite + PWA</Text>
      <PWABadge />
    </>
  );
}

export default App;
