import {useState} from "react";
import api from "../adapters/authAdapter.js";

const LoginForm = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const {name: targetName, value} = event.target;

    if (targetName === "username") setUsername(value);
    if (targetName === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUsername("");
    setPassword("");

    const {
      username: {value: username},
      password: {value: password},
    } = event.target;

    try {
      await api.login(username, password);
    } catch (err) {
      setMessage(err.response.data.message);
      console.log(err.response.data.message);
      return;
    }
    setMessage("");
    setIsLoggedIn(true);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={username}
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
          value={password}
          onChange={handleChange}
          required
        />
      </label>
      {message && <div className="message">{message}</div>}
      <div>
        <input className="btn submit-btn" type="submit" value="Submit" />
      </div>
    </form>
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const {name: targetName, value} = event.target;

    if (targetName === "username") setUsername(value);
    if (targetName === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUsername("");
    setPassword("");

    const {
      username: {value: username},
      password: {value: password},
    } = event.target;

    let response;
    try {
      response = await api.signUp(username, password);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
      console.log(err.response.data.message);
      return;
    }
    setMessage(response.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Sign Up</h2>
      <label htmlFor="new-username">
        Username:
        <br />
        <input
          className="form-input"
          type="text"
          id="new-username"
          name="username"
          placeholder="New username"
          value={username}
          onChange={handleChange}
          required
        />
        <ul className="form-input-info">
          <li>must be at least 3 characters</li>
          <li>must start with a letter</li>
          <li>contain only A-Z, a-z, 0-9, and _</li>
        </ul>
      </label>
      <label htmlFor="new-password">
        Password:
        <br />
        <input
          className="form-input"
          type="password"
          id="new-password"
          name="password"
          placeholder="New password"
          value={password}
          onChange={handleChange}
          required
        />
        <ul className="form-input-info">
          <li>must be at least 5 characters</li>
          <li>can contain letters, numbers, and symbols</li>
        </ul>
      </label>
      {message && <div className="message">{message}</div>}
      <div>
        <input className="btn submit-btn" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export const LoginPage = (props) => {
  return (
    <div>
      <LoginForm {...props} />
      <hr />
      <SignUpForm />
    </div>
  );
};

export default LoginPage;