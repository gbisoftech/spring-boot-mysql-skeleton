# Staff Hub Frontend

This is the frontend application for the Staff Hub project, built with React and TypeScript.

## Quick Setup

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Configure environment**

Create a `.env` file in the project root:

```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

### Development

**Start development server**

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates optimized files in the `build` folder ready for deployment.

## Project Structure

```
src/
├── components/    # UI components
├── contexts/      # React contexts including AuthProvider
├── hooks/         # Custom hooks
├── pages/         # Application pages
├── utils/         # Utility functions including API setup
└── App.tsx        # Main application component
```

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Runs tests
- `npm run build` - Builds for production

## Learn More

For a detailed explanation of the setup, check out the Docker documentation in the project root.
