import styled from "styled-components";
import Button from "components/Button";
import LogoLong from "icons/LogoLong";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

  return (
    <>
      <LandingContainer>
        <TopbarContainer>
          <Link to="/">
            <LogoLong></LogoLong>
          </Link>
          <NavLinks>
            <Link to="/">How To Use</Link>
            <Link to="/">About us</Link>
          </NavLinks>
        </TopbarContainer>
        <Main>
          <LogoContainer>
            <LogoLong />
            <h1>LastFM to Spotify Playlist</h1>
            <p>Create customized playlist based on your listening history.</p>
          </LogoContainer>

          <Button>
            <a href={API_LOGIN_URL}>Login with Spotify</a>
          </Button>
        </Main>
        <Footer></Footer>
      </LandingContainer>
    </>
  );
};

const Footer = styled.div`
  height: 300px;
  width: 100%;
  background-color: #000;
`;

const LandingContainer = styled.div`
  background-color: #141414;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: ;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  ${Button} a {
    text-decoration: none;
    color: #fff;
  }
`;

const TopbarContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 60px;
  background: #000;
  display: flex;
  align-items: center;
  padding: 0 200px;
  & .logo {
    width: 90px;
    height: 70px;
  }
  justify-content: space-between;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  ${Link} {
    margin: 0 5px;
    padding: 10px;
    &:hover {
      background: #555;
      border-radius: 5px;
    }
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  padding-bottom: 30px;

  h1 {
    text-align: center;
    font-size: 60px;
    font-weight: 600;
    color: #fff;
    padding-bottom: 20px;
  }

  & .logo {
    width: 400px;
    height: 120px;
    margin-bottom: 20px;
  }
`;

export default Landing;
