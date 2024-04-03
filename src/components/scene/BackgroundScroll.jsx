import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ContactUsText } from "../common/textData";

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
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Text /> */}

          {startExpandedAnimation ? (
            <>
              <div className="container">
                <span className="text-animate button-ani">SIMPLY EXPAND</span>
              </div>
              <div
                style={{
                  marginTop: "7em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="icon-scroll"></div>
                <div className="down-indicator"></div>
              </div>
            </>
          ) : null}
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
                <span className={"button-ani"}>
                  {title == "artificalIntelligence"
                    ? "ARTIFICAL INTELLIGENCE"
                    : title.toUpperCase()}
                </span>
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
      <section id="sectionTen" className="section section-ten">
        {<ContactUsText test={true} />}
      </section>
    </>
  );
}

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
