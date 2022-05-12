// behavior testing (load, display list, input/type)

import { screen, render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { UserProvider } from "../../context/UserContext";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post(
    'https://ezwbsacoojmonmiqffad.supabase.co/auth/v1/token', (req, res, ctx) => {
      console.log(req);
      return res(
        ctx.json({
          access_token: 'MOCKED_TOKEN',
          token_type: "bearer",
          expires_in: 3600,
          refresh_token: 'MOCKED_REFRESH_TOKEN',
          user: {
            id: '123456',
            aud: "authenticated",
            role: "authenticated",
            email: "test@example.com",
            email_confirmed_at: "2022-05-10T23:18:33.307985Z",
            phone: "",
            confirmed_at: "2022-05-10T23:18:33.307985Z",
            last_sign_in_at: "2022-05-12T16:47:53.230256157Z",
            app_metadata: {
              provider: "email",
              providers: [
                "test@example.com"
              ]
            },
            user_metadata: {},
            identities: [
              {
                id: '123456',
                user_id: '123456',
                identity_data: {
                  sub: '123456'
                },
                provider: "email",
                last_sign_in_at: "2022-05-10T23:18:33.306143Z",
                created_at: "2022-05-10T23:18:33.306185Z",
                updated_at: "2022-05-10T23:18:33.306188Z"
              }
            ],
            created_at: "2022-05-10T23:18:33.303666Z",
            updated_at: "2022-05-12T16:47:53.231496Z"
          },
        })
      )}
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
          {
              id: 657,
              guest_id: "123456",
              content: "cvbfbds",
              created_at: "2022-05-11T00:10:41.986778+00:00"
          },
          {
              id: 656,
              guest_id: "123456",
              content: "ngfdsefawds",
              created_at: "2022-05-11T00:10:38.530552+00:00"
          }
      ])
    )),
  rest.post(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json(
        [
          {
              id: 712,
              guest_id: "123456",
              content: "new entry",
              created_at: "2022-05-12T17:21:53.650013+00:00"
          }
      ]
    ))
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
  res(
    ctx.json([
        {
            id: 657,
            guest_id: "123456",
            content: "cvbfbds",
            created_at: "2022-05-11T00:10:41.986778+00:00"
        },
        {
            id: 656,
            guest_id: "123456",
            content: "ngfdsefawds",
            created_at: "2022-05-11T00:10:38.530552+00:00"
        },
        {
          id: 712,
          guest_id: "123456",
          content: "new entry",
          created_at: "2022-05-12T17:21:53.650013+00:00"
      }
    ])
  )),
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

    // // list load
    await screen.findByText('Past entries:');

    const entry = await screen.findByText('cvbfbds');
    expect(entry).toBeInTheDocument();

    // form exists
    const entryForm = screen.getByPlaceholderText('add new entry');
    // adds new item to list
    userEvent.type(entryForm, 'new entry');

    const addButton = screen.getByRole('button', { name: /add to guestbook/i });
    
    server.use(
      rest.post(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) => {
        return res(ctx.json([{
          id: 712,
          guest_id: "123456",
          content: "new entry",
          created_at: "2022-05-12T17:21:53.650013+00:00"
      }]))
      }),
      rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) => {
        return res(ctx.json([{
          id: 657,
          guest_id: "123456",
          content: "cvbfbds",
          created_at: "2022-05-11T00:10:41.986778+00:00"
      },
      {
          id: 656,
          guest_id: "123456",
          content: "ngfdsefawds",
          created_at: "2022-05-11T00:10:38.530552+00:00"
      },
      {
        id: 712,
        guest_id: "123456",
        content: "new entry",
        created_at: "2022-05-12T17:21:53.650013+00:00"
    }]))
  }
  ),
  )

  userEvent.click(addButton);
  await waitFor(() => {
    const newEntry = screen.getByText('new entry');
      expect(newEntry).toBeInTheDocument();
    });

  })
})