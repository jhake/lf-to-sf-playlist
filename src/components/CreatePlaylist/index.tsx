import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";

interface Props {
  spotifyTrackIds: Array<string>;
}

const CreatePlaylist = (
  { spotifyTrackIds }: Props = { spotifyTrackIds: [] }
) => {
  const { logout, authHeader } = useCurrentUser();

  const handleClick = async () => {
    const url = process.env.REACT_APP_BACKEND_API_URL + "create_playlist";
    const body = {
      name: prompt("Enter name", "New Playlist"),
      tracks: spotifyTrackIds.map(
        (spotifyTrackId) => `spotify:track:${spotifyTrackId}`
      ),
    };

    try {
      let axiosResult = await axios.post(url, body, {
        headers: authHeader,
        timeout: 2000,
      });
      toast.success("Playlist created!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again.");
        logout();
      } else toast.error(error.message);
    }
  };

  return <button onClick={handleClick}>Create Playlist</button>;
};

export default CreatePlaylist;
