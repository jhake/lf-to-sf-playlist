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

  console.log(url);

  const { data, loading, error } = useAxiosGet<any[]>(url);
  const { data: lfData } = useAxiosGet(
    process.env.REACT_APP_BACKEND_API_URL + "lf_top_tracks"
  );

  console.log(lfData);
  console.log(data);
  console.log(error);

  return (
    <>
      <h1>Spotify Stats</h1>
      {loading
        ? "loading"
        : data?.map((d) => {
            //return <p>{d.name}</p>;

            return (
              <>
                <iframe
                  src={`https://open.spotify.com/embed/track/${d.id}`}
                  width={300}
                  height={380}
                  frameBorder={0}
                  allowTransparency={true}
                  allow="encrypted-media"
                  style={{ borderRadius: "10px" }}
                ></iframe>
              </>
            );
          })}

      {error && "errors occured"}
    </>
  );
};

export default SpotifyStats;
