# Faculty Application Documentation

## Overview

The Faculty Application is a React-based web application designed to handle admission-related processes for faculty management. It provides interfaces for viewing and editing admission records as well as user management functionality.

## Architecture

### Technology Stack

- **Frontend Framework**: React 18.3.1
- **Routing**: React Router 7.0.2
- **Styling**: Bootstrap 5.3.3
- **Build Tool**: Vite 6.0.1
- **State Management**: Apollo Client 3.12.4
- **Package Manager**: npm

### Project Structure

```
apps/app_faculty/
├── src/
│   ├── main.jsx           # Application entry point
│   ├── App.jsx            # Main application component
│   ├── AppRouter.jsx      # Routing configuration
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── assets/            # Static assets
├── public/                # Public assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## Components

### Main Components

#### `App` Component
- **Location**: `src/App.jsx`
- **Purpose**: Root component that provides the main layout structure
- **Dependencies**: 
  - `AppCanvas` from `@hrbolek/uoisfrontend-gql-shared`
  - `AppRouter` (internal)
- **Features**:
  - Wraps the entire application in `AppCanvas` for consistent layout
  - Integrates Bootstrap CSS for styling
  - Contains the main routing logic

#### `AppRouter` Component
- **Location**: `src/AppRouter.jsx`
- **Purpose**: Manages application routing using React Router
- **Dependencies**:
  - `react-router-dom` for routing functionality
  - `AdmissionPage` and `UserPage` from faculty view package
- **Routes**:
  - `/admission/user/view/:id` - User view page
  - `/admission/admission/view/:id` - Admission view page (read-only)
  - `/admission/admission/write/:id` - Admission edit page

### Route Configuration

The application defines three main routes:

1. **User View Route** (`/admission/user/view/:id`)
   - Renders the `UserPage` component
   - Used for viewing user information
   - Accepts a user ID parameter

2. **Admission View Route** (`/admission/admission/view/:id`)
   - Renders the `AdmissionPage` component in read-only mode
   - Used for viewing admission records
   - Accepts an admission ID parameter

3. **Admission Edit Route** (`/admission/admission/write/:id`)
   - Renders the `AdmissionPage` component in edit mode
   - Used for editing admission records
   - Accepts an admission ID parameter

## Dependencies

### Core Dependencies

- **React & React DOM**: Core React library for building the user interface
- **React Router**: Client-side routing for single-page application navigation
- **Bootstrap**: CSS framework for responsive design and components
- **Apollo Client**: GraphQL client for API communication

### Custom Packages

- **@hrbolek/uoisfrontend-gql-shared**: Shared GraphQL components and utilities
- **@schizo-coder-i-came-from-universe/uoisfrontend-faculty_view**: Faculty-specific view components

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build for production with NODE_ENV=production
npm run build:production

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:3000` (or the port shown in terminal)

## Build and Deployment

The application uses Vite for building and bundling:

- **Development**: Hot module replacement for fast development
- **Production**: Optimized bundle with minification and tree-shaking
- **Preview**: Local server to preview production builds

## Code Quality

The project includes:

- **ESLint**: Code linting with React-specific rules
- **React Hooks ESLint Plugin**: Ensures proper hook usage
- **React Refresh**: Fast refresh during development

## API Integration

The application integrates with GraphQL APIs through:

- **Apollo Client**: For GraphQL queries and mutations
- **Shared GQL Components**: Reusable GraphQL-related functionality

## Styling

The application uses:

- **Bootstrap 5.3.3**: For responsive layout and components
- **Custom CSS**: Additional styling in `App.css` and `index.css`
- **CSS Modules**: Component-scoped styling support

## Error Handling

The application implements:

- **React StrictMode**: Enhanced error detection in development
- **React Router Error Boundaries**: Route-level error handling
- **Apollo Client Error Handling**: GraphQL error management

## Performance Considerations

- **Vite**: Fast build tool with efficient hot module replacement
- **React 18**: Automatic batching and concurrent features
- **Tree Shaking**: Removes unused code from production bundles
- **Bootstrap**: Lightweight CSS framework

## Future Enhancements

Potential areas for improvement:

1. **TypeScript Migration**: Add type safety to the codebase
2. **Testing**: Implement unit and integration tests
3. **State Management**: Consider Redux or Zustand for complex state
4. **Error Boundaries**: Add comprehensive error handling
5. **Performance Monitoring**: Add metrics and monitoring
6. **Accessibility**: Improve ARIA compliance and keyboard navigation

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**: Ensure all dependencies are installed
2. **Routing Issues**: Check route configuration in `AppRouter.jsx`
3. **Styling Problems**: Verify Bootstrap CSS is properly imported
4. **Build Failures**: Check for ESLint errors and fix them

### Debug Mode

To enable debug mode:
1. Set `NODE_ENV=development`
2. Use React Developer Tools browser extension
3. Enable Apollo Client Developer Tools

## Contributing

1. Follow the existing code style and patterns
2. Add JSDoc comments for new components
3. Run linting before committing changes
4. Test routes and functionality thoroughly

## License

This project is private and proprietary to the organization.