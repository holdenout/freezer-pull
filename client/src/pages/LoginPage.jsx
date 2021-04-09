import {LoginForm} from "../components/LoginForm.jsx";
import {SignUpForm} from "../components/SignUpForm.jsx";

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
