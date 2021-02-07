import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  const history = useHistory();

  return (
    <HomepageContainer>
      <h2>
        Good afternoon, <strong>Jeon HeeJin!</strong>
      </h2>
      <br />
      <h3>Create Playlists Now</h3>
      <BigButtonsContainer>
        <BigButton onClick={() => history.push("/spotify-stats")}>
          <h4>Spotify Stats</h4>
          <p>
            Create playlists based on Spotify data. You can select between,
            4-week, 6-week, and overall top tracks.
          </p>
        </BigButton>
        <BigButton onClick={() => history.push("/lastfm-stats")}>
          <h4>LastFM Stats</h4>
          <p>
            Create playlists based on LastFM data. You can select between top
            tracks recently or for a specified time period.
          </p>
        </BigButton>
      </BigButtonsContainer>
      <h3>More Features Coming</h3>
      <BigButtonsContainer>
        <BigButton></BigButton>
        <BigButton></BigButton>
      </BigButtonsContainer>
    </HomepageContainer>
  );
};

const BigButton = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  height: 200px;
  margin-right: 16px;
  margin-bottom: 16px;
  cursor: pointer;

  h4 {
    font-weight: 600;
    font-size: 40px;
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    width: 80%;
  }

  &:hover {
    background: #333;
  }
`;

const BigButtonsContainer = styled.div`
  display: flex;
`;

const HomepageContainer = styled.div`
  h2 {
    margin-bottom: 24px;
  }

  h3 {
    margin: 16px 0;
  }
`;

export default Homepage;
