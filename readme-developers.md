# Developer Guide

This guide provides information for developers working on this project.

## Project Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.envrc.example` to `.envrc` (if it exists)
   - Update the variables as needed

## Development

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console output)

## Building for Production

To build the project for production:

```
npm run build
```

## Testing

Run tests with:

```
npm test
```

## Linting

To lint the project:

```
npm run lint
```

## Contributing

Please refer to the CONTRIBUTING.md file for guidelines on how to contribute to this project.

## Project Structure

- `/src`: Source code
- `/public`: Static assets
- `/tests`: Test files

For more detailed information about the project structure and conventions, please refer to the inline comments and documentation within the code.