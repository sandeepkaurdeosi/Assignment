import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import  InputField  from './InputField';
import React from 'react';

describe('InputField Component', () => {
  test('renders input with label', () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).placeholder).toBe('Enter name');
  });

  test('displays helper text', () => {
    render(<InputField label="Email" helperText="Enter valid email" />);
    expect(screen.getByText('Enter valid email')).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(<InputField label="Password" errorMessage="Required" invalid />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {});
    render(<InputField label="Username" onChange={handleChange} />);
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Sandeep' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('Sandeep');
  });

  test('input is disabled when disabled prop is true', () => {
    render(<InputField label="Disabled Input" disabled />);
    const input = screen.getByLabelText('Disabled Input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});