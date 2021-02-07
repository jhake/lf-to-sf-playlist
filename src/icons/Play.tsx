interface Props {
  className?: string;
}

const Play = ({ className }: Props) => {
  return (
    <svg
      className={className || "play"}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.57 12L5.98 3V21L21.57 12Z" fill="white" />
    </svg>
  );
};

export default Play;
