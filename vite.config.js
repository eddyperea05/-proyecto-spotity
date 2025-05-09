// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [ react() ],
  server: {
    host: '0.0.0.0',      // escucha en todas las interfaces, incluidas la LAN
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: [
      'miapp.loca.lt'
    ],
    hmr: {
      protocol: 'wss',          // usa WebSocket seguro
      host: 'miapp.loca.lt',    // URL pública de LocalTunnel
      clientPort: 443           // el puerto al que se conecta el navegador (wss://miapp.loca.lt:443)
      // ¡OJO! No pongas aquí `port: 443`, que es lo que causaba el bind fail.
    }
  }
})
