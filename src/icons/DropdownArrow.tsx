interface Props {
  className?: string;
  rotated?: boolean;
}

const DropdownArrow = ({ className, rotated }: Props) => {
  return (
    <svg
      className={className || "arrow"}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      height="16"
      width="16"
      viewBox="0 0 16 16"
      style={rotated ? { transform: " rotate(180deg); " } : {}}
    >
      <path d="M3 6l5 5.794L13 6z" fill="#FFFFFF"></path>
    </svg>
  );
};

export default DropdownArrow;
