import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../../src/components/LoginForm';

describe('LoginForm', () => {
  test('submits provided credentials on form submit', () => {
    const mockLogin = jest.fn();
    const { getByLabelText, getByRole } = render(<LoginForm onLogin={mockLogin} />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /log in/i }));
    expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password');
  });
});
