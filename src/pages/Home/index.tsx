const Home = () => {
  return (
    <div className="Home">
      <a href={`${process.env.REACT_APP_BACKEND_API_URL}` + "auth/spotify"}>
        Login with Spotify
      </a>
    </div>
  );
};

export default Home;
