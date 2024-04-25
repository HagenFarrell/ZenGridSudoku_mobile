import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import RegisterScreen from '../app/Screens/RegisterScreen';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('RegisterScreen', () => {
  it('should display a success message when the user registers successfully', async () => {
    mockAxios.post.mockResolvedValue({
      data: { message: 'Signup successful, check your inbox for verification email!' },
      status: 200,
    });

    const { getByText, getByPlaceholderText, getByTestId } = render(<RegisterScreen navigation={{ goBack: jest.fn() }} />);

    // Simulate user input
    fireEvent.changeText(getByPlaceholderText('Username'), 'newuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'newuser@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'Password123!');

    // Wrap the press event in act to ensure all effects related to this action are flushed
    act(() => {
      fireEvent.press(getByTestId('signup-button'));
    });

    // Use waitFor to handle any asynchronous operations
    await waitFor(() => {
      expect(getByText('Signup successful, check your inbox for verification email!')).toBeTruthy();
    });
  });
});