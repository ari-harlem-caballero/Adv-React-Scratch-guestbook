// behavior testing (load, display list, input/type)

import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { UserProvider } from "../../context/UserContext";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post(
    `${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
      res(
        ctx.json({
          "access_token": 'MOCKED_TOKEN',
          "token_type": "bearer",
          "expires_in": 3600,
          "refresh_token": 'MOCKED_REFRESH_TOKEN',
          "user": {
            "id": '123456',
            "aud": "authenticated",
            "role": "authenticated",
            "email": "ari@one",
            "email_confirmed_at": "2022-05-10T23:18:33.307985Z",
            "phone": "",
            "confirmed_at": "2022-05-10T23:18:33.307985Z",
            "last_sign_in_at": "2022-05-12T16:47:53.230256157Z",
            "app_metadata": {
              "provider": "email",
              "providers": [
                "email"
              ]
            },
            "user_metadata": {},
            "identities": [
              {
                "id": '123456',
                "user_id": '123456',
                "identity_data": {
                  "sub": '123456'
                },
                "provider": "email",
                "last_sign_in_at": "2022-05-10T23:18:33.306143Z",
                "created_at": "2022-05-10T23:18:33.306185Z",
                "updated_at": "2022-05-10T23:18:33.306188Z"
              }
            ],
            "created_at": "2022-05-10T23:18:33.303666Z",
            "updated_at": "2022-05-12T16:47:53.231496Z"
          },
        })
      )
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
          {
              "id": 657,
              "guest_id": "b0390fda-f5ae-439a-8dfa-8dccde787615",
              "content": "cvbfbds",
              "created_at": "2022-05-11T00:10:41.986778+00:00"
          },
          {
              "id": 656,
              "guest_id": "b0390fda-f5ae-439a-8dfa-8dccde787615",
              "content": "ngfdsefawds",
              "created_at": "2022-05-11T00:10:38.530552+00:00"
          }
      ])
    ))
);

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