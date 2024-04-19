describe('Happy Path for Admin', () => {
  it('successfully registers, logs in, and manipulates presentations', () => {
    cy.visit('/register');
    cy.get('[data-testid="email"]').type('admin@example.com');
    cy.get('[data-testid="password"]').type('securePassword');
    cy.get('[data-testid="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="newPresentation"]').click();
    cy.get('[data-testid="presentationName"]').type('My First Presentation');
    cy.get('[data-testid="createPresentation"]').click();

    // Add checks for updating thumbnails, names, adding slides, etc.

    cy.get('[data-testid="logout"]').click();
    cy.url().should('include', '/login');
  });
});
