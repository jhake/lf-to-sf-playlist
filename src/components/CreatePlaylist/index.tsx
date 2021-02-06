import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import Button from "components/Button";

interface Props {
  spotifyTrackIds: Array<string>;
}

const CreatePlaylist = (
  { spotifyTrackIds }: Props = { spotifyTrackIds: [] }
) => {
  const { authHeader } = useCurrentUser();

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
      console.log(axiosResult);
      if (axiosResult.status !== 200) throw Error("Create playlist error");
      toast.success("Playlist created!");
    } catch (error) {
      toast.error(error);
    }
  };

  return <Button onClick={handleClick}>Create Playlist</Button>;
};

export default CreatePlaylist;
