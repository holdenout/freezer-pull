import {useState} from "react";
import api from "../adapters/authAdapter.js";
import loader from "../assets/coffeeLoader.gif";
import * as R from "ramda";

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
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
    setIsLoading(true);
    setMessage("");

    const {
      username: {value: username},
      password: {value: password},
      passwordConfirm: {value: passwordConfirm},
    } = event.target;

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // API call for sign up
    let response;
    try {
      response = await api.signUp(username, password);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setMessage(err.response.data.message);
      console.log(err.response.data.message);
      return;
    }

    // Reset forms on success
    setFormFields(R.map(() => "", formFields));

    setMessage(response.data.message);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
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
          value={formFields.username}
          onChange={handleChange}
          required
        />
        <ul className="form-input-info">
          <li>must be at least 3 characters</li>
          <li>must start with a letter</li>
          <li>contain only A-Z, a-z, 0-9, and _</li>
          <li>please make it appropriate as others may see this</li>
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
          value={formFields.password}
          onChange={handleChange}
          required
        />
        <ul className="form-input-info">
          <li>must be at least 5 characters</li>
          <li>can contain letters, numbers, and symbols</li>
        </ul>
      </label>

      <label htmlFor="password-confirm">
        Password:
        <br />
        <input
          className="form-input"
          type="password"
          id="password-confirm"
          name="passwordConfirm"
          placeholder="Confirm password"
          value={formFields.passwordConfirm}
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
          <input className="btn submit-btn" type="submit" value="Submit" />
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
