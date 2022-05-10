import { Route, Switch } from "react-router-dom";
import EntryList from "./views/List/EntryList";
import Auth from "./views/login/Auth";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Switch>
      <PrivateRoute path='/guestbook'>
        <EntryList />
      </PrivateRoute>
      <Route path='/login'>
        <Auth />
      </Route>
    </Switch>
  );
  // userProvider/Context, switch -> route/Private (/login, /guestbook) -> component
}
