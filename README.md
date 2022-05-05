# The Guestbook: Auth & Context

## Demo

[https://alchemy-guestbook-auth.netlify.app/](https://alchemy-guestbook-auth.netlify.app/)

### Learning Objectives

- Use private routes to enforce auth
- Retain URL if redirected by auth failure
- Redirect to an auth page if no user detected
- Use `useContext` to manage global application state

### Description

For this deliverable, we'll be creating a **Guestbook** app. In the Guestbook, users can create or sign into an account using their email and a password. Once signed in, they can add an entry. An entry is like a note in our book. Once a user signs in, their email is stored in context which we can use to render throughout the app.

We'll be using the `useContext` hook to manage our application state globally. The `useContext` hook provides a way to pass state throughout our application through a combination of a Context `Provider` and custom hooks. This solves the problem of prop drilling by allowing us to pass data directly to the components that need it.

We'll also need to create a way to make a route private so that users can only sign the Guestbook if they're logged in. See the [React Router Docs](https://v5.reactrouter.com/web/example/auth-workflow) for an example.

Upon user log in/registration, set the user in context and redirect them to the Guestbook (our root path: `/`). When the user makes an entry, their `email` should be displayed alongside their entry.

### Acceptance Criteria

- User should be able to sign up using their email of their choosing
- User should be redirected to the login screen if logged out
- User should be redirected to the guestbook entry screen after logging in
- User should be able to submit an entry to the Guestbook, which should use their `email` as the guest's name for the entry
- User should see a list of their entries when the form is submitted
- User should see their email in the header after logging in
- User should have a button to log out

### Rubric

| Tasks                                                                            | Points |
| :------------------------------------------------------------------------------- | -----: |
| Share the user's `email` using context                                           |      1 |
| Use a custom hook to expose our context state for reading/writing                |      1 |
| Use the `children` prop to render child components from within a `Provider`      |      1 |
| Use the user context state in at least 2 components (e.g. header and entry list) |      2 |
| `PrivateRoute` component created                                                 |      2 |
| `Login` view created                                                             |      2 |
| `EntryList` view created                                                         |      2 |
| Root path `/` uses a `PrivateRoute`                                              |      2 |
| `/login` renders the `Login` view                                                |      1 |
| `PrivateRoute` component redirects to `/login` if no user is in context          |      1 |
| Guestbook entry uses the `email` stored in context for the name                  |      2 |
| Behavior testing for `EntryList` view                                            |      2 |
| Deployed on Netlify with CI passing                                              |      1 |
