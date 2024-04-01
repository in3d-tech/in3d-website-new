import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import gsap from "gsap";
import { t } from "../common/t";

export function BackgroundScroll({
  scrollToElementById,
  textRef,
  titlesContainerRef,
  hovered,
  textAnimation,
  fixed,
}) {
  const { renderModels } = useAppContext();

  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);

  useEffect(() => {
    if (!renderModels) return;

    // gsap.from(".text-test", {
    //   x: 400,
    //   duration: 8,
    //   // stagger: 0.2,
    //   ease: "back",
    // });

    // gsap.to(".section-one-first-title", {
    //   x: 0,
    //   duration: 7,
    //   stagger: 0.2,
    //   ease: "back",
    //   // opacity: 0.2,
    // });
    if (!startExpandedAnimation) setStartExpandedAnimation(true);
  }, [renderModels]);

  const categories = [
    "industry",
    "medicine",
    "microsoft",
    "security",
    "artificalIntelligence",
    "military",
    "customization",
  ];

  // const Text = ({ selectedCategory = 6, isExpanded }) => {
  //   // console.log({ selectedModel });

  //   const letters = getLettersByModel(selectedCategory, isExpanded);

  //   if (!letters) return null;
  //   //       color: #af3737; medicine red?
  //   const shadowColor = {
  //     1: { color: "#af3737" },
  //     2: { color: "#999" },
  //     3: { color: "#999" },
  //     4: { color: "#00A4EF" },
  //     5: { color: "#2B5317" },
  //     6: { color: "#999" },
  //     7: { color: "#999" },
  //   };
  //   return (
  //     <>
  //       {/* <div className="overlay-test"></div> */}

  //       <div
  //         className="text-test"
  //         style={isExpanded ? { marginTop: "2em" } : null}
  //       >
  //         {letters.map((letter, index) => (
  //           <div className="wrapper-test" key={index}>
  //             <div className="letter">{letter}</div>
  //             <div className="shadow" style={shadowColor[selectedCategory]}>
  //               {letter}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <section className="section section-one">
        {/* {startExpandedAnimation ? ( */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            display: "flex",
            flexDirection: "column",
            // height: "500px",
            // border: "1px solid red",
            // width: "80vw",
          }}
        >
          {/* <button
            style={{ position: "absolute" }}
            onClick={() => setStartExpandedAnimation(true)}
          >
            cilkck me
          </button> */}
          {/* <TextTwo /> */}
          {startExpandedAnimation ? (
            <>
              <div className="container">
                <span className="text-animate">SIMPLY EXPAND</span>
              </div>
            </>
          ) : null}

          {/* <span
                className="section-one-first-title"
                style={{
                  position: "absolute",
                  transform: "translateX(200px)",
                  // border: "1px solid yellow",
                  width: "40vw",
                  borderBottom: "1px solid white",
                }}
              >
                SIMPLY EXPAND
              </span> */}
        </div>
        {/* ) : null} */}
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
        {fixed ? (
          <div
            ref={titlesContainerRef}
            className={`home-categories-wrapper ${hovered}`}
          >
            {categories.map((title, idx) => (
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
                onClick={() => scrollToElementById(idx)}
                key={idx}
                className={textAnimation}
              >
                {/* {t(title).toUpperCase()} */}
                {title == "artificalIntelligence"
                  ? "ARTIFICAL INTELLIGENCE"
                  : title.toUpperCase()}
              </div>
            ))}
          </div>
        ) : null}
      </section>
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

const TextTwo = () => {
  return (
    <div className="simply-expanded-container">
      <div className="simply-outer">
        <span className="simply-text">SIMPLY EXPAND</span>
      </div>
    </div>
  );
};

const getLettersByModel = (modelIdx = 1, isExpanded) => {
  if (!modelIdx || typeof modelIdx !== "number" || modelIdx == 0) {
    console.log("why we in here", typeof modelIdx);
    return;
  }
  //   console.log({ modelIdx });
  const modelByIndex = {
    0: "platform",
    1: "MEDICINE",
    2: "INDUSTRY",
    3: "ARTIFICAL INTELLIGENCE",
    4: "MICROSOFT",
    5: "MILITARY",
    6: "CUSTOMIZATION",
    7: "SECURITY",
  };

  if (isExpanded) {
    return "EXPANDED".split("");
  }

  return "IN3D-TECH".split("");
};
