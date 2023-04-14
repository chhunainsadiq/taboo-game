import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crash and with start message', () => {
  render(<App />);
  const startMessage = screen.getByText(/Please Choose above Category to Start/i);
  expect(startMessage).toBeInTheDocument();
});
