import {Link} from "react-router-dom";

export const LandingPage = ({toCarryover}) => {
  return (
    <div>
      <p>LandingPage under development</p>
      <Link className="next" to="/carryover">
        Begin carryover count
      </Link>
    </div>
  );
};

export default LandingPage;
