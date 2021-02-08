import styled from "styled-components";
import Button from "components/Button";
import LogoLong from "icons/LogoLong";
import bg from "assets/bg.svg";

const Landing = () => {
  const API_LOGIN_URL = process.env.REACT_APP_BACKEND_API_URL + "auth/spotify";

  return (
    <>
      <LandingContainer>
        <TopBar>
          <TopbarContainer>
            <Link href="/">
              <h2>LastFM to Spotify Playlist</h2>
            </Link>
            <NavLinks>
              <Link href="/">How To Use</Link>
              <Link href={API_LOGIN_URL}>Log in</Link>
            </NavLinks>
          </TopbarContainer>
        </TopBar>
        <Main>
          <LogoContainer>
            <LogoLong />
            <h1>
              LastFM to
              <br />
              Spotify Playlist
            </h1>
            <p>Create customized playlist based on your listening history.</p>
          </LogoContainer>

          <a href={API_LOGIN_URL}>Login with Spotify</a>
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
  background-color: #2d46b9;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: ;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  margin-top: -80px;
  background: url(${bg});
  background-size: 175%;
  background-position: 46% 4%;

  a {
    padding: 16px 40px;
    border-radius: 200px;
    background: #1ed760;
    text-transform: uppercase;
    text-decoration: none;
    color: #2d46b9;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    &:hover {
      transform: none;
      background: #fff;
    }
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 0;
  height: 80px;
  background: #000;
`;

const TopbarContainer = styled.div`
  max-width: 1300px;
  width: 80%;
  display: flex;
  align-items: center;
  & .logo {
    width: 90px;
    height: 70px;
  }
  justify-content: space-between;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  a {
    margin: 0 5px;
    padding: 10px;
    border-radius: 5px;
    &:hover {
      color: #1ed760;
    }
  }
`;

const LogoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  padding-bottom: 30px;

  h1 {
    text-align: center;
    color: #1ed760;
    font-weight: 800;
    font-size: 120px;
    padding-bottom: 20px;
  }

  p {
    color: #1ed760;
    font-size: 20px;
    font-weight: 600;
  }

  & .logo {
    width: 400px;
    height: 120px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1400px) {
    h1 {
      font-weight: 800;
      font-size: 80px;
      padding-bottom: 20px;
    }

    & .logo {
      width: 300px;
      height: 80px;
      margin-bottom: 20px;
    }
  }
`;

export default Landing;
