import {Link} from "react-router-dom";

export const LandingPage = ({toCarryover}) => {
  // Hacky way of checking for non-mobile platform
  // https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
  const isNotMobile = (typeof window.orientation === "undefined") || (navigator.userAgent.indexOf("IEMobile") === -1);

  return (
    <div>
      {isNotMobile && (
        <p>
          This application is best viewed on a mobile platform.
        </p>
      )}
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
