import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Renders something', () => {
  render(<App />);
  const title = screen.getByText(/Trufin test/i);
  expect(title).toBeInTheDocument();
});

test('Show error if input is incorrect', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, {target: {value: 'a'}})

  const errorMessage = /Hash must be a 64 character hexadecimal string/;
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
})

test('Show error if input is incorrect', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, {target: {value: '54e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107'}})

  const errorMessage = /Hash must be a 64 character hexadecimal string/;
  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
})