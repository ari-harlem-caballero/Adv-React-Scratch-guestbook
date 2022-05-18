// behavior testing (load, display list, input/type)

import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import UserProvider from "../../context/UserContext";

import { rest } from 'msw';
import { server } from '../../setupTests';

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

    await screen.findByText('First Post');

    // form exists
    const entryForm = screen.getByPlaceholderText('add new entry');
    // adds new item to list
    userEvent.type(entryForm, 'Third Post');

    const thirdEntry = [
      {
        id: 657,
        guest_id: "123456",
        content: "First Post",
        created_at: "2022-05-11T00:10:41.986778+00:00"
      },
      {
        id: 656,
        guest_id: "123456",
        content: "Second Post",
        created_at: "2022-05-11T00:10:38.530552+00:00"
      },
      {
        id: 658,
        guest_id: "123456",
        content: "Third Post",
        created_at: "2022-05-12T00:10:41.986778+00:00"
      }
    ];

    server.use(
      rest.get('https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries', (req, res, ctx) =>
        res(ctx.json(thirdEntry))
      )
    );

    const addButton = screen.getByRole('button', { name: /add to guestbook/i });

    
    userEvent.click(addButton);
    
    await screen.findByText('Third Post', { selector: 'li' });
  });

});