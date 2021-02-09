import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAxiosGet } from "hooks/useAxiosGet";
import Loader from "icons/Loader";
import Plus from "icons/Plus";
import Play from "icons/Play";
import { useCurrentUser } from "hooks/useCurrentUser";

const MyPlaylists = () => {
  let history = useHistory();

  let url = process.env.REACT_APP_BACKEND_API_URL + "get_spotify_playlists";

  const { data, loading, error } = useAxiosGet<any>(url);

  const playlists = data?.playlists;
  const playlistEntries = data?.playlist_entries;

  const playlistsCreatedByApp = [] as any[];
  const playlistsOthers = [] as any[];

  if (playlistEntries) {
    for (const playlist of playlists) {
      if (
        playlistEntries
          ?.map((entry: any) => entry.playlist_id)
          .includes(playlist.id)
      ) {
        playlistsCreatedByApp.push(playlist);
      } else {
        playlistsOthers.push(playlist);
      }
    }
  }

  return (
    <MyPlaylistsContainer>
      <h2>My Playlists</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Created by this App</h3>
          <SpotifyPlaylistsContainer>
            {playlistsCreatedByApp?.map((playlist: any) => {
              return <SpotifyPlaylist playlist={playlist} />;
            })}

            <CreateMorePlaylistBigButton
              onClick={() => history.push("/spotify-stats")}
            >
              <Plus />
              <h3>Create a playlist now from your Spotify data</h3>
            </CreateMorePlaylistBigButton>
            <CreateMorePlaylistBigButton
              onClick={() => history.push("/lastfm-stats")}
            >
              <Plus />
              <h3>Create a playlist now from your LastFM data</h3>
            </CreateMorePlaylistBigButton>
          </SpotifyPlaylistsContainer>
          <h3>Other Playlists</h3>
          <SpotifyPlaylistsContainer>
            {playlistsOthers?.map((playlist: any) => {
              return <SpotifyPlaylist playlist={playlist} />;
            })}
          </SpotifyPlaylistsContainer>
        </>
      )}
      {error && "errors occured"}
    </MyPlaylistsContainer>
  );
};

const SpotifyPlaylist = ({ playlist }: { playlist: any }) => {
  const { authHeader, logout } = useCurrentUser();

  const handleClick = async () => {
    const url = process.env.REACT_APP_BACKEND_API_URL + "play_context";
    const body = {
      uri: playlist?.uri,
    };

    try {
      await axios.post(url, body, {
        headers: authHeader,
        timeout: 5000,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again.");
        logout();
      } else {
        toast.error(error.response?.data, {
          toastId: "play playlist error",
        });
      }
    }
  };

  return (
    <SpotifyPlaylistContainer onClick={handleClick}>
      <Art
        style={{
          background: `url(${playlist?.images[0]?.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <button>
          <Play />
        </button>
      </Art>
      <h3>{playlist?.name}</h3>
      <p>
        {playlist?.description === ""
          ? `By ${playlist?.owner?.display_name}`
          : playlist?.description}
      </p>
    </SpotifyPlaylistContainer>
  );
};

const MyPlaylistsContainer = styled.div`
  h2 {
    margin-bottom: 32px;
  }
  h3 {
    margin-bottom: 16px;
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

const SpotifyPlaylistContainer = styled.div`
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

 
  }

  &:hover {
    button {
      opacity: 100%;
    }
  }

  h3 {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 4px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    color: #ccc;
    font-weight: 400;
    line-height: 20px;
    font-size: 14px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &:hover {
    background: #ffffff22;
  }
`;

const CreateMorePlaylistBigButton = styled.div`
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

  cursor: pointer;

  h3 {
    font-weight: 600;
    font-size: 28px;
  }

  &:hover {
    background: #ffffff22;
  }

  .plus {
    background: #aaa;
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
  }
`;

const SpotifyPlaylistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export default MyPlaylists;
