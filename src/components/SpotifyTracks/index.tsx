import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

interface Props {
  // spotifyTrackIds: Array<string>;
  tracks: Array<any>;
  unselectedTracks: Array<number>;
  setUnselectedTracks: (unselectedTracks: Array<number>) => void;
}

const SpotifyTracks = ({
  tracks,
  unselectedTracks,
  setUnselectedTracks,
}: Props) => {
  const [helpShown, setHelpShown] = useState(false);

  const handleToggles = (index: number) => {
    let newUnselectedTracks = [];

    console.log(unselectedTracks);
    if (unselectedTracks.includes(index)) {
      newUnselectedTracks = unselectedTracks.filter(function (item) {
        return item !== index;
      });
    } else {
      newUnselectedTracks = [...unselectedTracks, index];
    }

    console.log({ newUnselectedTracks });
    setUnselectedTracks(newUnselectedTracks);
  };

  const handleMouseOver = () => {
    if (!helpShown) {
      setHelpShown(true);
      toast.info(
        "Click on the tracks to not include them from the playlist that will be created"
      );
    }
  };

  return (
    <SpotifyTracksContainer onMouseOver={handleMouseOver}>
      {tracks?.map((track, index) => {
        return (
          <SpotifyTrack
            track={track}
            unselected={unselectedTracks?.includes(index) ?? false}
            toggleSelect={() => handleToggles(index)}
          />
        );
      })}
    </SpotifyTracksContainer>
  );
};

const SpotifyTrack = ({
  track,
  unselected,
  toggleSelect,
}: {
  track: any;
  unselected: boolean;
  toggleSelect: () => void;
}) => {
  return (
    <SpotifyTrackContainer
      onClick={toggleSelect}
      className={unselected ? "unselected" : "'"}
    >
      <img src={track?.album?.images[0]?.url} alt={`${track?.name} art`} />
      <h3>{track?.name}</h3>
      <p>{track?.artists?.map((artist: any) => artist.name).join(", ")}</p>
    </SpotifyTrackContainer>
  );
};

const SpotifyTrackContainer = styled.div`
  height: 300px;
  width: 200px;
  background: #ffffff09;
  padding: 16px;

  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 20px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  img {
    width: 100%;
    margin-bottom: 4px;
  }

  h3 {
    font-weight: 800;
    margin-bottom: 4px;
  }

  p {
    font-weight: 200;
    font-size: 14px;
  }

  &.unselected {
    opacity: 10%;
    transform: scale(0.95) perspective(1px);
  }

  &:hover {
    background: #ffffff22;
  }
`;

const SpotifyTracksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export default SpotifyTracks;
