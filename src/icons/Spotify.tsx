interface Props {
  className?: string;
}

const Spotify = ({ className }: Props) => {
  return (
    <svg
      className={className || "icon"}
      width="336"
      height="335"
      viewBox="0 0 336 335"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 167C0 259 76 335 168 335C260 335 336 259 336 167C336 75 260 0 168 0C76 0 0 75 0 167ZM230 245C191 221 141 215 83 228C69 230 67 210 79 208C143 193 197 200 241 227C252 234 241 251 230 245ZM247 200C202 172 133 164 80 180C63 185 57 159 73 155C134 137 209 146 261 178C275 187 261 209 247 200ZM72 129C55 135 44 106 63 99C122 81 222 84 284 121C301 130 285 158 267 148C213 116 123 113 72 129Z"
        fill="white"
      />
    </svg>
  );
};

export default Spotify;
