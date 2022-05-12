// behavior testing (load, display list, input/type)

import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { UserProvider } from "../../context/UserContext";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('should allow user to see their posts and add new entry', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    userEvent.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByPlaceholderText('password');
    userEvent.type(passwordInput, 'samplePassword');

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    userEvent.click(signInButton);

    screen.getByText('Page Loading');

    await waitForElementToBeRemoved(screen.getByText('Page Loading'));

    // // list load
    await screen.findByText('Past entries:');
    // form exists
    // adds new item to list
  });
})