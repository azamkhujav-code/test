# User Authentication Application with E2E Tests

This project is a React-based user authentication application that demonstrates a simple login and logout flow. It includes end-to-end (E2E) tests using Cypress to ensure the authentication functionality works as expected.

## Features

- User login with username and password
- User logout
- Protected home page for authenticated users
- End-to-end tests for authentication flow

## Technologies Used

- React
- TypeScript
- Vite (for fast development and building)
- Cypress (for E2E testing)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-auth-e2e-tests
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173`.

## Running E2E Tests

To run the E2E tests, follow these steps:

1. Make sure you have all dependencies installed:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. In a separate terminal, run the Cypress tests:
   ```
   npm run test:e2e
   ```

This will run all E2E tests in headless mode. To open the Cypress Test Runner for interactive testing, use:

```
npm run cypress:open
```

## Test Coverage

The E2E tests cover the following scenarios:

- Successful login with correct credentials
- Failed login attempt with incorrect credentials
- Successful logout

## Project Structure

```
user-auth-e2e-tests/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Home.tsx
│   ├── App.tsx
│   └── main.tsx
├── cypress/
│   └── e2e/
│       └── auth.spec.ts
├── public/
├── package.json
├── vite.config.ts
├── cypress.config.ts
└── README.md
```

## Adding New Tests

To add new E2E tests:

1. Create a new spec file in the `cypress/e2e` directory or add to the existing `auth.spec.ts` file.
2. Write your test cases using Cypress commands and assertions.
3. Run the tests to ensure they pass and cover the intended functionality.

For more information on writing Cypress tests, refer to the [Cypress Documentation](https://docs.cypress.io/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.