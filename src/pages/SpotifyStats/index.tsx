import SpotifyTracks from "components/SpotifyTracks";
import { useAxiosGet } from "hooks/useAxiosGet";
import { useUrlQuery } from "hooks/useUrlQuery";

import CreatePlaylist from "components/CreatePlaylist";
import Loader from "icons/Loader";
import { useEffect, useState } from "react";
import SpotifyInput from "./SpotifyInput";

const SpotifyStats = () => {
  const { limit, offset, time_range } = useUrlQuery();
  const [unselectedTracks, setUnselectedTracks] = useState<Array<number>>([]);

  const url =
    process.env.REACT_APP_BACKEND_API_URL +
    "top_tracks?" +
    (limit ? `limit=${limit}&` : "") +
    (offset ? `offset=${offset}&` : "") +
    (time_range ? `time_range=${time_range}&` : "");

  const { data, loading, error } = useAxiosGet<any[]>(url);

  useEffect(() => {
    setUnselectedTracks([]);
  }, [data]);

  return (
    <>
      <h2>Spotify Stats</h2>
      <br />
      <SpotifyInput />

      {loading ? (
        <Loader />
      ) : (
        <>
          <br />
          <CreatePlaylist
            spotifyTrackIds={
              data
                ?.map((d) => d?.id as string)
                .filter((_, i) => !unselectedTracks.includes(i)) ?? []
            }
          />
          <br />
          <br />
          <SpotifyTracks
            tracks={data ?? []}
            unselectedTracks={unselectedTracks}
            setUnselectedTracks={setUnselectedTracks}
          />
        </>
      )}
      {error && "errors occured"}
    </>
  );
};

export default SpotifyStats;
