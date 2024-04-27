import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterForm from '../../src/components/RegisterForm';

describe('RegisterForm', () => {
  it('validates passwords match before submission', () => {
    const mockRegister = jest.fn();
    const { getByLabelText, getByRole } = render(<RegisterForm onRegister={mockRegister} />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password1' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password2' } });
    fireEvent.click(getByRole('button', { name: /register/i }));
    expect(mockRegister).not.toHaveBeenCalled();
  });
});
