import logo from './logo.svg';
import './App.css';
import PrivateRoute from "./common/PrivateRoute";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import BookFlight from "./components/BookFlight";
import AdminView from "./components/AdminView";
import Flights from "./components/Flights";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <PrivateRoute
            exact
            path="/book_flight/:id"
            userRoles={["user", "admin"]}
            component={BookFlight}
        />
        <PrivateRoute
            exact
            path="/admin"
            userRoles="admin"
            component={AdminView}
        />
        <Route
            exact
            path="/"
            component={Home}
        />
        <Route
            exact
            path="/login"
            component={LoginPage}
        />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
