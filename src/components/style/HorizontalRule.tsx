const HorizontalRule = ({ color }: { color: string }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
      width: "100%",
    }}
  />
);

export default HorizontalRule;
