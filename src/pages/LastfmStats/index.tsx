import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import SpotifyTracks from "components/SpotifyTracks";
import { useCurrentUser } from "hooks/useCurrentUser";
import CreatePlaylist from "components/CreatePlaylist";
import { LfParams, LfMethod, LfPeriod } from "types";

import LastfmInput from "./LastfmInput";

const LastfmStats = () => {
  const { logout } = useCurrentUser();
  const [lfParams, setLfParams] = useState<LfParams>({
    method: LfMethod.topTracks,
    user: "",
    period: LfPeriod.overall,
    limit: 100,
    page: 1,
  });
  const [lfResult, setLfResult] = useState<any>();
  const [sfResult, setSfResult] = useState<Array<any>>([]);
  const [sfLoading, setSfLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  const lfTracks =
    (lfParams?.method === LfMethod.topTracks
      ? lfResult?.toptracks?.track
      : lfResult?.weeklytrackchart?.track) ?? [];

  const handleSearch = async () => {
    let url = process.env.REACT_APP_BACKEND_API_URL + "lf_get_request?";
    for (const param in lfParams) {
      console.log((lfParams as any)[param]);
      url += `${param}=${(lfParams as any)[param]}&`;
    }
    try {
      let axiosResult = await axios.get(url, { withCredentials: true });
      setLfResult(axiosResult.data);
      setLoadCount(0);
      setSfResult([]);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        logout();
      } else toast.error("An error occured when loading the lf tracks");
    }
  };

  console.log({ loadCount });
  const handleLoad = async () => {
    let url = process.env.REACT_APP_BACKEND_API_URL + "search_spotify_tracks?";

    let queries = lfTracks
      .slice(loadCount, loadCount + 10)
      .map((lfTrack: any) => {
        return `${lfTrack.name} ${
          lfTrack.artist.name || lfTrack.artist["#text"]
        }`;
      });

    // let queries = ["now or never april", "Now or Never April"];
    console.log(queries);
    setSfLoading(true);
    try {
      let result = await axios.get<Array<any>>(url, {
        timeout: 50000,
        params: { queries },
        withCredentials: true,
      });
      setSfResult([...sfResult, ...result.data]);
      setLoadCount(loadCount + 10);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        logout();
      } else toast.error(error.message);
    }
    setSfLoading(false);
  };

  return (
    <>
      <h1>LastFM stats</h1>
      <button onClick={handleSearch}>LastFM Search</button>
      <LastfmInput lfParams={lfParams} setLfParams={setLfParams} />
      <CreatePlaylist
        spotifyTrackIds={sfResult?.map((d) => d?.id as string) ?? []}
      />
      <br />
      <SpotifyTracks
        spotifyTrackIds={sfResult?.map((d) => d?.id as string) ?? []}
      />
      <br />
      {sfLoading ? (
        "Loading"
      ) : loadCount < lfTracks.length ? (
        <button onClick={handleLoad}>Load more</button>
      ) : (
        ""
      )}
    </>
  );
};

export default LastfmStats;
