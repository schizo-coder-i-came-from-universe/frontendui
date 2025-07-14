/**
 * @fileoverview Main entry point for the Faculty Application
 * @description This file bootstraps the React application and renders the main App component
 * within React.StrictMode for better development experience and error detection.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'

/**
 * Initialize and render the Faculty Application
 * @description Creates the root React element and renders the App component
 * wrapped in StrictMode for development best practices
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
