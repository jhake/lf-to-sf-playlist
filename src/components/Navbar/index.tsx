import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";

const Navbar = () => {
  const { currentUser, logout } = useCurrentUser();

  return (
    <>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/spotify-stats">Spotify Stats</Link>
          <Link to="/lastfm-stats">Lastfm Stats</Link>
          <button
            onClick={() => {
              logout();
              toast.success("Logged out");
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
