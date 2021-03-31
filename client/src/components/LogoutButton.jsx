export const LogoutButton = ({setIsLoggedIn}) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <button className="btn logout" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
