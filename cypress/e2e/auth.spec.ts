describe('Authentication', () => {
  it('should login successfully with correct credentials', () => {
    cy.visit('/');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
    cy.contains('Welcome, testuser!').should('be.visible');
  });

  it('should show an error message with incorrect credentials', () => {
    cy.visit('/');
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid username or password').should('be.visible');
    cy.url().should('not.include', '/home');
  });

  it('should logout successfully', () => {
    // First, log in
    cy.visit('/');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');

    // Now, log out
    cy.get('button').contains('Logout').click();
    cy.url().should('not.include', '/home');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Login').should('be.visible');
  });
});