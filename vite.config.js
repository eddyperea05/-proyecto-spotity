import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '747e-2800-e2-7e80-216-8023-2c19-d25f-76d8.ngrok-free.app'
    ]
  }
})
