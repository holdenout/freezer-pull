import {Link} from "react-router-dom";

export const LandingPage = ({toCarryover}) => {
  return (
    <div>
      <p>LandingPage under development</p>
      <Link className="btn submit-btn next-btn" to="/carryover">
        Begin carryover count
      </Link>
    </div>
  );
};

export default LandingPage;
