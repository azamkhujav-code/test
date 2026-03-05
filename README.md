# User Authentication E2E Tests

This project includes end-to-end (E2E) tests for the user authentication flow using Cypress.

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

## Adding New Tests

To add new E2E tests:

1. Create a new spec file in the `cypress/e2e` directory or add to the existing `auth.spec.ts` file.
2. Write your test cases using Cypress commands and assertions.
3. Run the tests to ensure they pass and cover the intended functionality.

For more information on writing Cypress tests, refer to the [Cypress Documentation](https://docs.cypress.io/).

<existing-content-omitted>