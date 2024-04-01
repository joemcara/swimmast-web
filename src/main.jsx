import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>
)
