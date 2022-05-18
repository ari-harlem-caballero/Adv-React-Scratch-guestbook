import fetch from 'cross-fetch';
global.fetch = fetch;

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const dataToken = {
  access_token: 'MOCKED_TOKEN',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'MOCKED_REFRESH_TOKEN',
  user: {
    id: '123456',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'test@example.com',
    email_confirmed_at: '2022-05-10T23:18:33.307985Z',
    phone: '',
    confirmed_at: '2022-05-10T23:18:33.307985Z',
    last_sign_in_at: '2022-05-12T16:47:53.230256157Z',
    app_metadata: {
    provider: 'email',
    providers: [
      'email'
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
        provider: 'email',
        last_sign_in_at: '2022-05-10T23:18:33.306143Z',
        created_at: '2022-05-10T23:18:33.306185Z',
        updated_at: '2022-05-10T23:18:33.306188Z'
      }
    ],
    created_at: '2022-05-10T23:18:33.303666Z',
    updated_at: '2022-05-12T16:47:53.231496Z'
  }
};

const entries = [
  {
    id: 657,
    guest_id: '123456',
    content: 'First Post',
    created_at: '2022-05-10T00:10:41.986778+00:00'
  },
  {
    id: 656,
    guest_id: '123456',
    content: 'Second Post',
    created_at: '2022-05-11T00:10:38.530552+00:00'
  }
];

const postEntry = [
  {
    id: 657,
    guest_id: '123456',
    content: 'Third Post',
    created_at: '2022-05-12T00:10:41.986778+00:00'
  }
];

export const server = setupServer(
  // sign in
  rest.post('https://ezwbsacoojmonmiqffad.supabase.co/auth/v1/token', (req, res, ctx) =>
    res(ctx.json(dataToken))
  ),

  // get entries
  rest.get('https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries', (req, res, ctx) =>
    res(ctx.json(entries))
  ),

  // post entry
  rest.post('https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries', (req, res, ctx) =>
    res(ctx.json(postEntry))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());