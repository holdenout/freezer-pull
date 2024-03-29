import {Switch, Route, Link} from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";
import "./NavBar.css";

export const NavBar = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div className="navbar">
      <Switch>
        <Route exact path="/">
          <div className="title">Home</div>
        </Route>

        <Route path="/carryover">
          <Link to="/" className="back">
            &#xff1c;
          </Link>
          <div className="title">Carryover</div>
        </Route>

        <Route path="/pull">
          <Link to="/carryover" className="back">
            &#xff1c;
          </Link>
          <div className="title">Pull</div>
        </Route>
      </Switch>
      {isLoggedIn && <LogoutButton setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
};

export default NavBar;
