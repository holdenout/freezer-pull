import {useState} from "react";
import api from "../adapters/authAdapter.js";
import loader from "../assets/coffeeLoader.gif";
import * as R from "ramda";

export const LoginForm = ({setIsLoggedIn}) => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input change
  const handleChange = ({target}) => {
    setFormFields(R.assoc(target.name, target.value, formFields));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const {
      username: {value: username},
      password: {value: password},
    } = event.target;

    // API call for login
    try {
      await api.login(username, password);
    } catch (err) {
      setIsLoading(false);
      setMessage(err.response.data.message);
      console.log(err.response.data.message);
      return;
    }

    // Reset forms on success
    setFormFields(R.map(() => "", formFields));

    setIsLoading(false);
    setMessage("");
    setIsLoggedIn(true);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2 className="form-title">Login</h2>

      <label htmlFor="username">
        Username:
        <br />
        <input
          className="form-input"
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={formFields.username}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password">
        Password:
        <br />
        <input
          className="form-input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formFields.password}
          onChange={handleChange}
          required
        />
      </label>

      {message && <div className="message">{message}</div>}

      {isLoading ? (
        <div>
          <img className="loader" src={loader} alt="loading..." />
        </div>
      ) : (
        <div>
          <input className="btn submit-btn" type="submit" value="Login" />
        </div>
      )}
    </form>
  );
};

export default LoginForm;
