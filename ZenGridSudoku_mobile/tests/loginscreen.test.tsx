import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import LoginScreen from '../app/Screens/LoginScreen';
import { AuthProvider } from '../app/Navigation/AuthContext';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginScreen Integration Test', () => {
  it('handles user login correctly', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        id: '123',
        Username: 'TestUser',
        Email: 'test@example.com',
      },
      status: 200,
    });

    const { getByPlaceholderText, getByTestId } = render(
      <AuthProvider>
        <LoginScreen navigation={{ goBack: jest.fn() }} />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('loginButton'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });
});
