import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "hooks/useCurrentUser";
import LogoLong from "icons/LogoLong";
import HomeIcon from "icons/Home";
import SpotifyIcon from "icons/Spotify";
import LastfmIcon from "icons/Lastfm";

const Navbar = () => {
  const { currentUser } = useCurrentUser();

  return (
    <NavbarContainer>
      <NavBarInner>
        <LogoContainer>
          <LogoLong />
          <h1>LastFM to Spotify Playlist</h1>
        </LogoContainer>
        <NavItem to="/" exact>
          <HomeIcon /> Home
        </NavItem>
        {currentUser ? (
          <>
            <CategoryTitle>Create Playlists</CategoryTitle>
            <NavItem to="/spotify-stats">
              <SpotifyIcon />
              Spotify Stats
            </NavItem>
            <NavItem to="/lastfm-stats">
              <LastfmIcon /> Lastfm Stats
            </NavItem>
          </>
        ) : (
          ""
        )}
      </NavBarInner>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  position: relative;
  width: 240px;
`;

const NavBarInner = styled.div`
  min-height: 100vh;
  width: 100%;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: overlay;
  padding: 10px;

  display: flex;
  flex-direction: column;

  background: #000;
`;

const CategoryTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  padding: 16px;
  margin-top: 8px;
  margin-bottom: -8px;
`;

const NavItem = styled(NavLink)`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;

  border-radius: 4px;

  font-size: 14px;
  font-weight: 700;
  color: #b3b3b3;
  text-decoration: none;

  & .icon {
    height: 22px;
    width: 22px;
    margin: 0 16px;
  }

  &:hover {
    color: #fff;
  }

  &.active {
    background: #333;
    color: #fff;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 16px;
  padding-bottom: 16px;

  h1 {
    font-size: 32px;
    font-weight: 600;
    color: #fff;
  }

  & .logo {
    width: 150px;
    height: 80px;
  }
`;

export default Navbar;
