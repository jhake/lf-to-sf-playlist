interface Props {
  className?: string;
}

const Close = ({ className }: Props) => {
  return (
    <svg
      className={className || "close"}
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3125 10.3342L20.6648 9.6875L15.5 14.8533L10.3342 9.6875L9.6875 10.3342L14.8533 15.5L9.6875 20.6648L10.3342 21.3125L15.5 16.1467L20.6648 21.3125L21.3125 20.6648L16.1467 15.5L21.3125 10.3342Z"
        fill="white"
        fill-opacity="0.7"
      />
    </svg>
  );
};

export default Close;
