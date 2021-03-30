import {useState, useEffect} from "react";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CarryoverPage from "./pages/CarryoverPage.jsx";
import PullPage from "./pages/PullPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {populateFoodStore} from "./util/populateFoodStore.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import api from "./adapters/authAdapter.js";
import "./styles.css";

const PageRoutes = () => {
  return (
    <>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/carryover">
        <CarryoverPage />
      </Route>

      <Route path="/pull">
        <PullPage />
      </Route>
    </>
  );
};

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {pathname} = useLocation();

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("No signed in user");
      return;
    }

    const token = user.accessToken;
    api.verifyLogin(token).then((res) => {
      if (res.status === 200) setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    // Populate food store from db (needs local fallback as failsafe)
    populateFoodStore();

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ScrollToTop />

      <Switch>
        <Route
          path="/login"
          render={({location}) =>
            isLoggedIn ? (
              <Redirect to={location.state.referrer} />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {isLoggedIn ? (
          <PageRoutes />
        ) : (
          <Redirect to={{pathname: "/login", state: {referrer: pathname}}} />
        )}
      </Switch>
    </div>
  );
};

export default App;
