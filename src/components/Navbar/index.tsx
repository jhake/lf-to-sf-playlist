import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import axios from "axios";

const Navbar = () => {
  const { currentUser, logout, authHeader } = useCurrentUser();

  const API_LOGOUT_URL = process.env.REACT_APP_BACKEND_API_URL + "logout";

  const handleLogout = async () => {
    try {
      await axios.delete(API_LOGOUT_URL, {
        timeout: 2000,
        headers: authHeader,
      });
      logout();
      toast.success("Logged out successfully.");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        logout();
      } else toast.error(error.message);
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/spotify-stats">Spotify Stats</Link>
          <Link to="/lastfm-stats">Lastfm Stats</Link>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
