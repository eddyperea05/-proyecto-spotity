import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useApi from './hooks/useApi'

function App() {
  const [count, setCount] = useState(0)

  const { data, loading, error } = useApi('https://jsonplaceholder.typicode.com/posts/1')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
