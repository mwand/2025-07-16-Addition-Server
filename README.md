# Addition Server - Full Stack Application

A simple full-stack application demonstrating service-controller architecture with React frontend and Express.js backend.

## Getting Started

To run in development mode, say `npm run dev:all` and open [http://localhost:5173](http://localhost:5173) (or whatever Vite tells you).

To build for production, say `npm run build:all` and then `npm start`

To deploy to Render.com,
1. Set the branch to `main`
2. Set the root directory to `/` (the project root)
3. Set create an environment variable HOST and set it to `0.0.0.0`
4. Set render's build command to `npm install && npm run build:all`
5. Set render's start command to `npm start`

## Introduction

For an introduction to and explanation of the overall structure, go to [text](https://docs.google.com/document/d/1twG6vNyQ5K2-l73YbaDWXGivGXS0AvKObkN_c2AAtjM/edit?pli=1&tab=t.0#heading=h.bk1yda9o0cmi) .

## 🏗️ Architecture

### Backend (Express.js + TypeScript)
- **Service Layer**: `src/adderService.ts` - Business logic for addition operations
- **Controller Layer**: `src/adderController.ts` - HTTP request handling
- **Express App**: `src/express.ts` - Express application setup
- **Server**: `src/server.ts` - Server startup and configuration

### Frontend (React + TypeScript + Vite)
- **React App**: Beautiful calculator interface using Chakra UI
- **TypeScript**: Strict typing for better development experience
- **Vite**: Fast development server and build tool

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm run frontend:install
```

### Development Mode

#### Option 1: Run both frontend and backend together
```bash
npm run dev:all
```

#### Option 2: Run separately
```bash
# Terminal 1: Start backend (localhost:3000)
npm run dev

# Terminal 2: Start frontend (localhost:5173)
npm run frontend:dev
```

### Production Build
```bash
# Build both frontend and backend
npm run build:all

# Start production server
npm start
```

## 📡 API Endpoints

- `GET /health` - Health check endpoint
- `GET /sum/:i/:j` - Addition endpoint (returns sum of i and j)
- `GET /` - Returns 404 (root not available)

### Example API Usage
```bash
# Health check
curl http://localhost:3000/health

# Addition
curl http://localhost:3000/sum/5/3
# Returns: {"firstNumber":5,"secondNumber":3,"sum":8}
```

## 🎨 Frontend Features

- **Beautiful UI**: Clean, modern interface using Chakra UI
- **Real-time Server Status**: Shows connection status to backend
- **Form Validation**: Client-side validation for number inputs
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Works on desktop and mobile devices

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run mutation testing
npm run mutation

# Run linting
npm run lint
```

### Frontend Tests
```bash
cd frontend
npm test
```
- **Mutation Testing**: Code quality assurance with Stryker
- **Linting**: Code quality enforcement with ESLint
- **Functional Programming**: Emphasizes functional programming patterns

## Project Structure

```
src/
├── additionService.ts      # Business logic for addition operations
├── additionController.ts   # HTTP request/response handling
├── server.ts              # Application entry point
└── *.test.ts              # Test files
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm start
   ```

   Or for development with hot reload:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI interface
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix linting issues automatically
- `npm run mutation` - Run mutation testing with Stryker
- `npm run clean` - Remove build artifacts

## API Endpoints

The server will expose endpoints for addition operations. Details will be available once the implementation is complete.

## Development

This project follows strict TypeScript guidelines and functional programming patterns. All code should:

- Include proper error handling
- Use self-documenting variable names
- Prefer functional over imperative style
- Maintain test coverage above 80%

## Testing

The project uses Vitest for unit testing and Stryker for mutation testing to ensure code quality.

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run mutation testing
npm run mutation
```

## License

MIT
