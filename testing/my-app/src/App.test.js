import { render, screen } from '@testing-library/react';
import App from './App';

test('renders clinic branding', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Dentique Smiles/i)[0];
  expect(linkElement).toBeInTheDocument();
});
