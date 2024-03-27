function SelectedCategoryMobile({ titleKey }) {
  return (
    <div style={{ height: "300vh", zIndex: 1 }}>
      {/* <h1 style={{ color: "white" }}>HELLO WORLD</h1> */}
      <IndustryText title={"Industry"} />
    </div>
  );
}

export default SelectedCategoryMobile;

const IndustryText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      //   background: "yellow",
      height: "180vh",
      //   width: "80%",
      //   left: "14%",
      position: "absolute",
      left: 0,
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      opacity: 0.4,
      // justifyContent: "space-between",
    }}
  >
    <div style={{ flex: 1 }}></div>
    <div
      style={{
        flex: 1,
        display: "flex",
        // background: "green",
        background: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
        flexDirection: "column",
        padding: "4px",
        textAlign: "center",
      }}
    >
      <div className="scrolled-category-title">{title}</div>
      <div className="scrolled-category-text-one">
        <span>The world was recently</span>
        <span>introduced to the wonders of</span>
        <span>the industry 4.0 revolution</span>
      </div>
      <div className="scrolled-category-text-two">
        <span>Together with our clients we map out the</span>
        <span>challenges they face and develop tailor-made</span>
        <span>solutions using XR and 3D technology that</span>
        <span id="testId">
          creates an innovative visual interface between people and machine.
        </span>
      </div>
    </div>
  </div>
);
