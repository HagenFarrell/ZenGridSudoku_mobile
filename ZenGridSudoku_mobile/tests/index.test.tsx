import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index';

describe('Index Screen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    // Add your assertions here
    // For example:
    // expect(getByText('Some text inside Index')).toBeTruthy();
  });
});