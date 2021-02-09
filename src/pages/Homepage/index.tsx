import { useCurrentUser } from "hooks/useCurrentUser";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  return (
    <HomepageContainer>
      <h2>
        {generateGreeting()}, {currentUser?.info?.name?.split(" ")[0]}
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

const generateGreeting = () => {
  let greeting = "";
  let date = new Date();
  let hour = date.getHours();
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return greeting;
};

const BigButton = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 24px;
  width: 300px;
  height: 240px;
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
    line-height: 24px;
    width: 90%;
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
