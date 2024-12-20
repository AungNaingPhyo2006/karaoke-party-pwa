import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders about link', () => {
  render(<App />);
  const linkElement = screen.getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});
