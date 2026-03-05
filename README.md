# User Authentication E2E Tests

This project includes end-to-end (E2E) tests for the user authentication flow using Cypress.

## Running E2E Tests

To run the E2E tests, follow these steps:

1. Ensure you have all dependencies installed:
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

This will run the Cypress tests in headless mode. If you want to run the tests in interactive mode, you can use:

```
npm run cy:open
```

## Test Coverage

The E2E tests cover the following scenarios:

- Displaying the login page
- Successful user login
- Handling invalid credentials
- User logout

## Modifying Tests

The E2E tests are located in the `cypress/e2e` directory. You can modify the `auth.cy.ts` file to add or update tests for the authentication flow.

## Continuous Integration

These E2E tests are integrated into the CI/CD pipeline using GitHub Actions. The workflow is defined in `.github/workflows/e2e-tests.yml`. 

The tests will automatically run on:
- Every push to the main branch
- Every pull request to the main branch

You can view the test results in the "Actions" tab of the GitHub repository.