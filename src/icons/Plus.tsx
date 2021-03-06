interface Props {
  className?: string;
}

const Plus = ({ className }: Props) => {
  return (
    <svg
      className={className || "plus"}
      shape-rendering="crispEdges"
      viewBox="0 0 36 36"
    >
      <path d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"></path>
    </svg>
  );
};

export default Plus;
