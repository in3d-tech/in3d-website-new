import { useAppContext } from "../../context/appContext";

export function BackgroundScroll({
  scrollToElementById,
  simplyExpandedRef,
  textRef,
  titlesContainerRef,
  hovered,
  textAnimation,
  fixed,
}) {
  const { setIsInstantScroll } = useAppContext();

  return (
    <>
      <section className="section section-one">
        <div
          style={{
            position: "absolute",
            top: "12em",
            left: "3%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "flex-end",
            height: "500px",
            // border: "1px solid orange",
          }}
        >
          <div style={{ lineHeight: "15vh" }}>
            <h1
              className="section-one-first-title"
              style={{
                fontSize: "2em",
              }}
            >
              in3D-Tech
            </h1>
            <div ref={simplyExpandedRef}>
              <span className="section-one-first-title">Simply</span>
              <span
                className="section-one-first-title"
                style={{
                  position: "relative",
                  top: "1em",
                }}
              >
                Expand
              </span>
            </div>
          </div>

          {/* <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" /> */}
        </div>
      </section>
      <section className="section section-two">
        <div
          ref={textRef}
          style={{
            height: "50%",
            width: "50%",
            position: "absolute",
            top: 0,
          }}
          id="midSection2"
        ></div>
        <div
          ref={titlesContainerRef}
          style={
            fixed
              ? { position: "fixed", bottom: "108%", right: "14%" }
              : { position: "absolute", right: "14%" }
          }
          className={`home-categories-wrapper ${hovered}`}
        >
          {fixed
            ? categories.map((title, idx) => (
                <div
                  onMouseOver={() => {
                    // document.documentElement.style.setProperty(
                    //   "--color",
                    //   backgrounds[title] || backgrounds[1]
                    // );
                    // setHovered("taasia");
                  }}
                  onMouseOut={() => {
                    // document.documentElement.style.setProperty(
                    //   "--color",
                    //   backgrounds[1]
                    // );
                    // setHovered("");
                  }}
                  onClick={() => scrollToElementById(idx, setIsInstantScroll)}
                  key={idx}
                  className={textAnimation}
                  style={{ height: "0px" }}
                >
                  {title}
                </div>
              ))
            : null}
        </div>
      </section>
      <section id="sectionThree" className="section section-three"></section>
      <section id="sectionFour" className="section section-four"></section>
      <section id="sectionFive" className="section section-five"></section>
      <section id="sectionSix" className="section section-six"></section>
      <section id="sectionSeven" className="section section-seven"></section>
      <section id="sectionEight" className="section section-eight"></section>
      <section id="sectionNine" className="section section-nine"></section>
      <section id="sectionTen" className="section section-ten"></section>
    </>
  );
}

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICALINTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
];
