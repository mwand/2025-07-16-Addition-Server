# Addition Server

A simple TypeScript Node.js server that demonstrates the service-controller architecture pattern. This project illustrates clean separation of concerns between business logic and request handling.

## Features

- **Service-Controller Architecture**: Clean separation between business logic and HTTP handling
- **TypeScript**: Full type safety with strict mode enabled
- **Input Validation**: Request validation using Zod schemas
- **Testing**: Comprehensive test suite with Vitest
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
