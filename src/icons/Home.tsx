interface Props {
  className?: string;
}

const Home = ({ className }: Props) => {
  return (
    <svg
      className={className || "icon"}
      xmlns="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      width="512"
      height="512"
      fill="currentColor"
    >
      <path
        d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
        fill="#B3B3B3"
      ></path>
    </svg>
  );
};

export default Home;
