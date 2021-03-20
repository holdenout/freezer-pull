import {useState} from "react";
import api from "../../adapters/authAdapter.js";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const {name: targetName, value} = event.target;

    if (targetName === "username") setUsername(value);
    if (targetName === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res;
    try {
      res = await api.signUp(username, password);
    } catch (err) {
      console.log(err.response.data.message);
      return false;
    }
    console.log(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Sign Up</h2>
      <label for="username">
        Username:
        <br />
        <input
          className="form-input"
          type="text"
          id="username"
          name="username"
          placeholder="New username"
          value={username}
          onChange={handleChange}
        />
        <ul className="form-input-info">
          <li>must be at least 3 characters</li>
          <li>must start with a letter</li>
          <li>contain only A-Z, a-z, 0-9, and _</li>
        </ul>
      </label>
      <label for="password">
        Password:
        <br />
        <input
          className="form-input"
          type="password"
          id="password"
          name="password"
          placeholder="New password"
          value={password}
          onChange={handleChange}
        />
        <ul className="form-input-info">
          <li>must be at least 5 characters</li>
          <li>can contain letters, numbers, and symbols</li>
        </ul>
      </label>
      <div><input className="btn submit-btn" type="submit" value="Submit" /></div>
    </form>
  );
};

export const LoginPage = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default LoginPage;
