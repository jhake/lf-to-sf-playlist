import styled from "styled-components";
import LogoLong from "icons/LogoLong";
import Spotify from "icons/Spotify";
import Lastfmround from "icons/Lastfmround";
import Github from "icons/Github";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterMain>
        <LogoContainer>
          <LogoLong />
          <h3>
            LastFM to <br />
            Spotify Playlist™
          </h3>
        </LogoContainer>
        <LinksContainer>
          <LinksSection>
            <div>COMPANY</div>
            <a href="/">About us</a>
            <a href="/">Contact</a>
          </LinksSection>
          <LinksSection>
            <div>USEFUL LINKS</div>
            <a href="/">LastFM to Spotify</a>
            <a href="/">RSpotify</a>
            <a href="/">JWT</a>
          </LinksSection>
          <LinksSection></LinksSection>
        </LinksContainer>
        <SocialContainer>
          <a href="https://www.spotify.com/">
            <Spotify />
          </a>
          <a href="https://www.last.fm/">
            <Lastfmround />
          </a>
          <a href="https://github.com/jhake/lf-to-sf-playlist">
            <Github />
          </a>
        </SocialContainer>
      </FooterMain>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const FooterMain = styled.div`
  max-width: 1300px;
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 250px;
  height: 100%;
  & .logo {
    width: 100px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

const LinksContainer = styled.div`
  height: 100%;
  width: 600px;
  display: flex;
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 200px;
  div {
    color: #919496;
    padding: 15px 0;
    font-size: 0.8em;
    font-weight: 1000;
  }
  a {
    text-decoration: none;
    color: #fff;
    padding: 15px 0;
    font-weight: 600;
    font-size: 0.8em;
    &:hover {
      color: #1ed760;
    }
  }
`;

const SocialContainer = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: row-reverse;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #222;
    padding: 5px;
    margin: 0 7px;
    &:hover {
      background-color: #333;
    }
    svg {
      width: 80%;
      height: 80%;
    }
  }
`;
export default Footer;
