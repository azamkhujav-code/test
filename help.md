# How to Run the Application

This guide will help you set up and run the application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running:

   ```
   npm install
   ```

## Running the Application

To start the development server and run the application, follow these steps:

1. In the project directory, run the following command:

   ```
   npm run dev
   ```

2. Once the development server starts, you will see output similar to this:

   ```
   VITE v7.1.7  ready in XXX ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ➜  press h to show help
   ```

3. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Additional Commands

- To build the application for production:

  ```
  npm run build
  ```

- To preview the production build:

  ```
  npm run preview
  ```

- To run the linter:

  ```
  npm run lint
  ```

## Troubleshooting

If you encounter any issues while running the application, try the following:

1. Make sure all dependencies are installed correctly by running `npm install` again.
2. Clear your browser cache and restart the development server.
3. Check the console output for any error messages and address them accordingly.

If you continue to experience problems, please refer to the project's documentation or reach out to the development team for assistance.