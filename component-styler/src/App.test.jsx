import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders landing hero title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Design components\./i);
  expect(titleElement).toBeInTheDocument();
});
