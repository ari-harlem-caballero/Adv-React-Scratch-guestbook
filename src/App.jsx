import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import EntryList from "./views/List/EntryList";
import Auth from "./views/login/Auth";

export default function App() {
  return (
    <Switch>
      <Route path='/guestbook'>
        <EntryList />
      </Route>
      <Route path='/login'>
        <Auth />
      </Route>
    </Switch>
  );
  // userProvider/Context, switch -> route/Private (/login, /guestbook) -> component
}
