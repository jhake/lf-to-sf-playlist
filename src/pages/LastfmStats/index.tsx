import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SpotifyTracks from "components/SpotifyTracks";
import { useCurrentUser } from "hooks/useCurrentUser";
import CreatePlaylist from "components/CreatePlaylist";
import Button from "components/Button";
import { LfParams, LfMethod, LfPeriod } from "types";

import Loader from "icons/Loader";
import LastfmInput from "./LastfmInput";

const LastfmStats = () => {
  const { authHeader } = useCurrentUser();
  const [lfParams, setLfParams] = useState<LfParams>({
    method: LfMethod.topTracks,
    user: "",
    period: LfPeriod.overall,
    limit: undefined,
    page: 1,
  });
  const [lfResult, setLfResult] = useState<any>();
  const [sfResult, setSfResult] = useState<Array<any>>([]);
  const [sfLoading, setSfLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [toLoadFirst, setToLoadFirst] = useState(false);
  const [unselectedTracks, setUnselectedTracks] = useState<Array<number>>([]);

  const lfTracks =
    (lfParams?.method === LfMethod.topTracks
      ? lfResult?.toptracks?.track
      : lfResult?.weeklytrackchart?.track) ?? [];

  const handleSearch = async () => {
    if (lfParams.user === "") {
      toast.info("Please include the LastFM username");
      return;
    }
    let url = process.env.REACT_APP_BACKEND_API_URL + "lf_get_request?";
    for (const param in lfParams) {
      console.log((lfParams as any)[param]);
      url += `${param}=${(lfParams as any)[param]}&`;
    }
    try {
      let axiosResult = await axios.get(url, {
        headers: authHeader,
        timeout: 10000,
      });
      setLfResult(axiosResult.data);
      setLoadCount(0);
      setSfResult([]);
      setToLoadFirst(true);
      console.log(axiosResult);
    } catch (error) {
      console.log(error);
      toast.error("An error occured when loading the lf tracks");
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
        headers: authHeader,
        timeout: 50000,
        params: { queries },
      });
      setSfResult([...sfResult, ...result.data]);
      setLoadCount(loadCount + 10);
    } catch (error) {
      console.log(error);
      toast.error("An error occured when loading the spotify tracks");
    }
    setSfLoading(false);
  };

  useEffect(() => {
    if (toLoadFirst) {
      handleLoad();
      setToLoadFirst(false);
    }
    // eslint-disable-next-line
  }, [toLoadFirst]);

  return (
    <>
      <h2>LastFM stats</h2>
      <LastfmInput lfParams={lfParams} setLfParams={setLfParams} />
      <br />
      <Button onClick={handleSearch}>LastFM Search</Button>
      {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
      <CreatePlaylist
        spotifyTrackIds={
          sfResult
            ?.map((d) => d?.id as string)
            .filter((_, i) => !unselectedTracks.includes(i)) ?? []
        }
      />
      <br />
      <br />
      <SpotifyTracks
        tracks={sfResult ?? []}
        unselectedTracks={unselectedTracks}
        setUnselectedTracks={setUnselectedTracks}
      />
      <br />
      {sfLoading ? (
        <Loader />
      ) : loadCount < lfTracks.length ? (
        <>
          <br />
          <Button onClick={handleLoad}>Load more</Button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default LastfmStats;
