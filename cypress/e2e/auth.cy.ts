describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Displays the login page', () => {
    cy.contains('h1', 'Login')
    cy.get('input[name="username"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('Allows a user to log in', () => {
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    // Assuming successful login redirects to home page
    cy.url().should('include', '/home')
    cy.contains('Welcome, testuser')
  })

  it('Displays error for invalid credentials', () => {
    cy.get('input[name="username"]').type('invaliduser')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid username or password')
  })

  it('Allows a user to log out', () => {
    // Log in first
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    // Verify logged in state
    cy.url().should('include', '/home')

    // Log out
    cy.get('button').contains('Logout').click()

    // Verify redirected to login page
    cy.url().should('include', '/login')
  })
})