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
      toast.info("Click to deselect a track", { toastId: "click hint" });
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
      <Art
        style={{
          background: `url(${track?.album?.images[0]?.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
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

  h3 {
    font-weight: 800;
    margin-bottom: 4px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  p {
    font-weight: 200;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &.unselected {
    opacity: 10%;
    transform: scale(0.95) perspective(1px);
  }

  &:hover {
    background: #ffffff22;
  }
`;

const Art = styled.div`
  margin-bottom: 8px;
  width: 168px;
  height: 168px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    border-radius: 50%;
    width: 48px;
    height: 48px;

    outline: none;
    border: none;
    background-color: #1db954;

    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
    transition: opacity 0.1s linear;
  }
`;

const SpotifyTracksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export default SpotifyTracks;
