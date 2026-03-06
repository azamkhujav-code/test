# React Authentication Flow

This project implements a simple authentication flow using React and Vite. It demonstrates a basic login/logout functionality with client-side authentication using localStorage.

## Features

- User login with email and password
- Protected home page for authenticated users
- Logout functionality
- Client-side authentication state management
- Basic error handling and form validation
- Responsive design for mobile and desktop

## Project Structure

```
src/
├── assets/
│   └── react.svg
├── pages/
│   ├── Home.tsx
│   └── Login.tsx
├── App.css
├── App.tsx
├── index.css
└── main.tsx
public/
├── vite.svg
vite.config.ts
package.json
tsconfig.json
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Usage

- On the login page, enter any email and password combination (no server-side validation in this demo)
- Once logged in, you'll be redirected to the home page
- Click the logout button on the home page to end your session

## Technologies Used

- React
- TypeScript
- Vite
- CSS Modules

## Future Improvements

- Implement server-side authentication
- Add more robust error handling and validation
- Improve accessibility
- Add unit and integration tests
- Implement password reset functionality
- Add OAuth/social login options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).