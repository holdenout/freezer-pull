import {Link} from "react-router-dom";

export const LandingPage = ({toCarryover}) => {
  return (
    <div>
      <p className="mobile-warning">
        This application is best viewed on a mobile platform.
      </p>
      <p>
        Currently logged in as{" "}
        {JSON.parse(localStorage.getItem("user")).username}.
      </p>
      <Link className="btn submit-btn next-btn" to="/carryover">
        Begin carryover count
      </Link>
    </div>
  );
};

export default LandingPage;
