function SelectedCategoryMobile({ titleKey }) {
  return (
    <div
      style={{
        height: "300vh",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <h1 style={{ color: "white" }}>HELLO WORLD</h1> */}
      <IndustryText title={"Industry"} />
      <MedicineText title={"Medicine"} />
      <MicrosoftText title={"Microsoft"} />
    </div>
  );
}

export default SelectedCategoryMobile;

const IndustryText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      //   background: "rgb(255,0,0,0.4)",
      height: "180vh",
      //   width: "80%",
      //   left: "14%",
      top: 0,
      position: "absolute",
      left: 0,
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
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

const MedicineText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      height: "80vh",
      width: "34%",
      top: "200%",
      left: "9%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title">{title}</div>
    <div className="scrolled-category-text-one">
      <span>The world of medicine is one</span>
      <span>of the most innovative sectors</span>
      <span>in the world</span>
    </div>
    <div className="scrolled-category-text-two">
      <span>Using Extended Reality (XR) we at in3D became pioneers in</span>
      <span>development of XR products for medical organizations</span>
      <span>collaborating together to empower innovation and</span>
      <span>efficiency for clinics and hospitals</span>
    </div>
  </div>
);

const MicrosoftText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      height: "80vh",
      width: "34%",
      top: "300%",
      left: "14%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title">{title}</div>
    <div className="scrolled-category-text-one">
      <span>In3D is the official and inclusive</span>
      <span>Mixed Reality (MR) partner</span>
      <span>of Microsoft Israel</span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        As partners, in3D is your perfect go to for any Microsoft MR products.
      </span>
      <span>
        In3D and Microsoft's teams share a strong connection and a combined
        vison on the important roles of MR technology
      </span>
      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);
