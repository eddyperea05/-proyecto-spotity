import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useApi from "./hooks/useApi";
import Card from "./components/card";

function App() {
  const [count, setCount] = useState(0);

  const { data, loading, error } = useApi(
    "https://jsonplaceholder.typicode.com/posts/1x"
  );

  const songs = [
    {
      title: "Shape of You",
      description: "Ed Sheeran - ÷ (Divide)",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    },
    {
      title: "Blinding Lights",
      description: "The Weeknd - After Hours",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    },
    {
      title: "Dance Monkey",
      description: "Tones and I - The Kids Are Coming",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5",
    },
  ];

  return (
    <>
      <h1>Vite + React Esta monda</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <h2>Ejemplo de uso de useApi</h2>
      {loading && <p>Cargando datos...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Título: {data.title}</h3>
          <p>Cuerpo: {data.body}</p>
        </div>
      )}
      <div className="cards-container">
      <Card></Card>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
