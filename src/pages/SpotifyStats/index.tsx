import SpotifyTracks from "components/SpotifyTracks";
import { useAxiosGet } from "hooks/useAxiosGet";
import { useUrlQuery } from "hooks/useUrlQuery";

const SpotifyStats = () => {
  const { limit, offset, time_range } = useUrlQuery();

  const url =
    process.env.REACT_APP_BACKEND_API_URL +
    "top_tracks?" +
    (limit ? `limit=${limit}&` : "") +
    (offset ? `offset=${offset}&` : "") +
    (time_range ? `time_range=${time_range}&` : "");

  const { data, loading, error } = useAxiosGet<any[]>(url);

  return (
    <>
      <h1>Spotify Stats</h1>
      {loading ? (
        "loading"
      ) : (
        <SpotifyTracks spotifyTrackIds={data?.map((d) => d.id) ?? []} />
      )}
      {error && "errors occured"}
    </>
  );
};

export default SpotifyStats;
