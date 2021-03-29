import {useState, useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
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
        <Route path="/login">
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
        {isLoggedIn ? <PageRoutes /> : <Redirect to="/login" />}
      </Switch>
    </div>
  );
};

export default App;
