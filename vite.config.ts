import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'
import { configureApiRoutes } from './src/api/routes'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    {
      name: 'configure-server',
      configureServer(server) {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        configureApiRoutes(app)
        
        server.middlewares.use(app)
      },
    },
  ],
})
