import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders UltraModern Clock title", () => {
  render(<App />);
  const linkElement = screen.getByText(/UltraModern Clock/i);
  expect(linkElement).toBeInTheDocument();
});
