import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/


/* This is a test that is testing the App component. */
describe("App", () => {

  /* Tests if heading is correct. */
  it("should have exact heading", () => {
    /* Rendering the App component. */
    render(<App />);

    /* Getting the element with the test id of "app-header-heading". */
    const mainHeading = screen.getByTestId("app-header-heading");

    /* Checking that the innerHTML of the element with the test id of "app-header-heading" is equal to
    "Welcome to Responsive Digital Library". */
    expect(mainHeading.innerHTML).toBe("Welcome to Responsive Digital Library");
  });
});
