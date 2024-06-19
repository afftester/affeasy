export function Background() {
  return (
    <div style={styles.backgroundMain}>
      <div style={styles.backgroundMainAfter} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  backgroundMain: {
    width: "100vw",
    minHeight: "100vh",
    position: "fixed",
    zIndex: -1,
    display: "flex",
    justifyContent: "center",
    padding: "120px 24px 160px 24px",
    pointerEvents: "none",
  },

  backgroundMainAfter: {
    content: '""',
    backgroundImage: "url(https://assets.dub.co/misc/grid.svg)",
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    opacity: 0.5,
    filter: "invert(1)",
  },
};
