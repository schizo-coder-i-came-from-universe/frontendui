/**
 * @fileoverview Main Application Component
 * @description Root component that sets up the application layout and routing
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
import { AppRouter } from './AppRouter';

/**
 * Main Application Component
 * @component
 * @description The root component of the Faculty Application that provides the main layout
 * structure using AppCanvas and contains the application routing via AppRouter
 * @returns {JSX.Element} The main application component wrapped in AppCanvas
 * @example
 * ```jsx
 * <App />
 * ```
 */
export const App = () => {
    return (
        <AppCanvas>
            <AppRouter />
        </AppCanvas>
    )
}
