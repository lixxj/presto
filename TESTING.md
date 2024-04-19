### TESTING.md - Testing Strategy for Presto

#### Overview
This document outlines the testing strategy for the Presto application, detailing both component-level and UI-level testing approaches. Our goal is to ensure that all features are robust, perform as expected, and provide a smooth user experience across different scenarios.

#### 1. Component Testing Strategy

**Objective**: To validate the functionality, rendering, and user interaction of individual components independently from the rest of the application.

**Tools Used**:
- **Jest**: For writing unit and integration tests.
- **React Testing Library**: For rendering components and firing user events.

**Components Tested**:
1. **LoginForm**: Tests cover successful input rendering, submission behavior, and error handling on incorrect inputs.
2. **RegisterForm**: Focuses on input validation, password matching, and form submission logic.
3. **Dashboard**: Ensures presentations are listed correctly and interaction elements like buttons trigger the correct actions.

**Test Characteristics**:
- **Coverage**: Each test covers both expected and edge case scenarios to ensure comprehensive coverage.
- **Clarity and Simplicity**: Tests are written in a clear and understandable manner, with direct assertions and minimal complexity.
- **Design**: Tests are logically ordered from simple rendering to user interactions and edge cases, avoiding redundancy and focusing on critical paths.

**Example**: `LoginForm.test.js`
```javascript
// Tests that the LoginForm renders correctly and handles state changes on user input
describe('LoginForm', () => {
  test('renders input fields and login button', () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});
```

#### 2. UI Testing Strategy

**Objective**: To verify the end-to-end functionality and integration of the application components as experienced by the user.

**Tools Used**:
- **Cypress**: For conducting end-to-end tests.

**Happy Path Scenario**:
- A comprehensive test where a new user registers, creates a presentation, edits it, and navigates through the application before logging out and back in.

**Test Steps**:
1. Register a new user.
2. Log in with the new credentials.
3. Create a new presentation.
4. Update the presentation's thumbnail and name.
5. Add and navigate between multiple slides.
6. Delete the presentation.
7. Log out and verify redirection to the login page.
8. Log back in to confirm persistence of session state.

**Example**: `happyPath.test.js`
```javascript
describe('Admin Happy Path', () => {
  it('handles full admin cycle from registration to re-login', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('securePassword');
    cy.get('button[type="submit"]').click();
    // Additional steps to simulate creating and managing a presentation
    cy.contains('Logout').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('securePassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

#### Additional Considerations
- **Mocking API Calls**: Using Jest to mock backend API responses for isolated frontend testing.
- **Testing Utilities**: Common utility functions and mocks are used to streamline the setup and teardown processes.
- **Continuous Integration**: Tests are integrated into the CI/CD pipeline to ensure that they are run on every commit to the main branch, ensuring no regressions are introduced.

#### Conclusion
This document describes our comprehensive approach to testing the Presto application, ensuring functionality, reliability, and a high-quality user experience. By adhering to this strategy, we aim to maintain a robust application with minimal bugs and issues.
