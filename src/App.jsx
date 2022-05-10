import { Route, Switch } from "react-router-dom";
import EntryList from "./views/List/EntryList";
import Auth from "./views/login/Auth";
import PrivateRoute from "./components/PrivateRoute";
import { Redirect } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Auth />
      </Route>
      <PrivateRoute path='/guestbook'>
        <EntryList />
      </PrivateRoute>
      <Route path='/'>
        <Redirect to='/guestbook' />
      </Route>
    </Switch>
  );
  // userProvider/Context, switch -> route/Private (/login, /guestbook) -> component
}
