interface Props {
  spotifyTrackIds: Array<string>;
}

const SpotifyTracks = ({ spotifyTrackIds }: Props) => {
  let uniqueTrackIds = [...new Set([...spotifyTrackIds])];

  return (
    <>
      {uniqueTrackIds?.map((spotifyTrackId) => {
        return (
          <iframe
            key={spotifyTrackId}
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}`}
            width={300}
            height={380}
            frameBorder={0}
            allowTransparency={true}
            allow="encrypted-media"
            style={{ borderRadius: "10px" }}
          />
        );
      })}
    </>
  );
};

export default SpotifyTracks;
