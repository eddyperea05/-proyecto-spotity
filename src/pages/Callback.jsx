import { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const hash = window.location.hash;
    console.log('🎧 TOKEN:', hash);
  }, []);

  return <h1>Conectando con Spotify...</h1>;
}

export default Callback;
