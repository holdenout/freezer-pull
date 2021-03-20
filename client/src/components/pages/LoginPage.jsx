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
      <h1>Sign Up</h1>
      <label>
        Username:
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <p>
          Username must:
          <br />
          &ensp;be at least 3 characters
          <br />
          &ensp;start with a letter
          <br />
          &ensp;contain only A-Z, a-z, 0-9, and _.
          <br />
        </p>
      </label>
      <label>
        Password:
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <p>
          Password:
          <br />
          &ensp;must be at least 5 characters
          <br />
          &ensp;can contain letters, numbers, and symbols.
        </p>
        <br />
      </label>
      <input type="submit" value="Submit" />
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
