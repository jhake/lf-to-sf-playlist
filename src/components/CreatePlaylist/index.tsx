import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";

interface Props {
  spotifyTrackIds: Array<string>;
}

const CreatePlaylist = (
  { spotifyTrackIds }: Props = { spotifyTrackIds: [] }
) => {
  const { logout } = useCurrentUser();

  const handleClick = async () => {
    const url = process.env.REACT_APP_BACKEND_API_URL + "create_playlist";
    const body = {
      name: prompt("Enter name", "New Playlist"),
      tracks: spotifyTrackIds.map(
        (spotifyTrackId) => `spotify:track:${spotifyTrackId}`
      ),
    };

    try {
      await axios.post(url, body, {
        timeout: 2000,
        withCredentials: true,
      });
      toast.success("Playlist created!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        logout();
      } else {
        toast.error(error.response ? error.response.data.error : error.message);
      }
    }
  };

  return <button onClick={handleClick}>Create Playlist</button>;
};

export default CreatePlaylist;
