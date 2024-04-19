import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../src/components/Dashboard';

describe('Dashboard', () => {
  it('displays the presentations correctly', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Your Presentations')).toBeInTheDocument();
  });
});
