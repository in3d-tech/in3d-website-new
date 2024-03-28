import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import gsap from "gsap";

export function BackgroundScroll({
  scrollToElementById,
  textRef,
  titlesContainerRef,
  hovered,
  textAnimation,
  fixed,
}) {
  const { setIsInstantScroll, renderModels } = useAppContext();

  useEffect(() => {
    if (!renderModels) return;
    gsap.to(".section-one-first-title", {
      x: 0,
      duration: 6,
      stagger: 0.2,
      ease: "back",
      // opacity: 0.2,
    });
    gsap.to(".section-one-second-title", {
      x: 150,
      y: 20,
      duration: 6,
      stagger: 0.2,
      ease: "back",
      // opacity: 0.2,
    });
  }, [renderModels]);

  return (
    <>
      <section className="section section-one">
        {renderModels ? (
          <div
            style={{
              position: "absolute",
              top: "2em",
              left: "3%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "flex-end",
              height: "500px",
              // border: "1px solid orange",
            }}
          >
            {/* <div style={{ lineHeight: "15vh" }}>
            <div> */}
            <span
              // ref={simplyRef}
              className="section-one-first-title"
              style={{
                position: "absolute",
                transform: "translateX(200px)",
                // marginTop: "5em",
              }}
            >
              Simply
            </span>
            <span
              // ref={expandedRef}
              className="section-one-second-title"
              style={{
                position: "relative",
                top: "1em",
                transform: "translateX(-200px)",
              }}
            >
              Expand
            </span>
            {/* </div>
          </div> */}

            {/* <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" /> */}
          </div>
        ) : null}
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
          // style={
          //   fixed
          //     ? {
          //         position: "fixed",
          //         bottom: "108%",
          //         right: "14%",
          //         border: "1px solid yellow",
          //       }
          //     : { position: "absolute", right: "14%", border: "1px solid red" }
          // }
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
                >
                  {title}
                </div>
              ))
            : null}
        </div>
      </section>
      {/* <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "cyan",
          border: "4px solid pink",
        }}
      ></div> */}
      <section
        id="sectionTwoHalf"
        className="section section-two-half"
      ></section>
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
