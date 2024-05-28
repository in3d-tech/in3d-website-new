import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { ContactUsText } from "../common/textData";
import { SeeMoreBtn } from "../common/SeeMoreBtn";
import { TextScrambleComponentHover } from "../common/shuffleTexts";

export function BackgroundScroll({
  section1MenuRef,
  scrollToElementById,
  titlesContainerRef,
  hovered,
  textAnimation,
  fixed,
}) {
  const {
    renderModels,
    titleOnMainPageHovered,
    setTitleOnMainPageHovered,
    customizeHasRendered,
    scrollArea,
    modelAnimationIsHalfWay,
  } = useAppContext();

  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const sectionIndustryRef = useRef(null);

  useEffect(() => {
    if (!customizeHasRendered) return;
    if (!startExpandedAnimation) setStartExpandedAnimation(true);
  }, [customizeHasRendered]);

  const categories = [
    "industry",
    "medicine",
    "microsoft",
    "homeland security",
    "artificalIntelligence",
    "military",
    "customize",
  ];

  const Text = ({ selectedCategory = 6, isExpanded }) => {
    // console.log({ selectedModel });

    const letters = getLettersByModel(selectedCategory, isExpanded);

    if (!letters) return null;
    //       color: #af3737; medicine red?
    const shadowColor = {
      1: { color: "#af3737" },
      2: { color: "#999" },
      3: { color: "#999" },
      4: { color: "#00A4EF" },
      5: { color: "#2B5317" },
      6: { color: "#999" },
      7: { color: "#999" },
    };

    return (
      <>
        {/* <div className="overlay-test"></div> */}

        <div
          className="text-test"
          style={isExpanded ? { marginTop: "2em" } : null}
        >
          {letters.map((letter, index) => (
            <div className="wrapper-test" key={index}>
              <div className="letter">{letter}</div>
              <div className="shadow" style={shadowColor[selectedCategory]}>
                {letter}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  const text = "Hello world";
  const scrollToElement = () => {
    if (sectionIndustryRef.current) {
      sectionIndustryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
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
                <span className="text-animate simply-header">
                  SIMPLY EXPAND
                </span>
              </div>
              <div className="down-indicator-wrapper">
                <div className="icon-scroll" onClick={scrollToElement}></div>
                <div onClick={scrollToElement} className="down-indicator"></div>
                <div
                  style={{
                    position: "relative",
                    marginRight: "3.5em",
                    color: "rgb(255,255,255,0.5)",
                  }}
                >
                  <div style={{ fontSize: "0.6em" }}>Scroll</div>
                  <div style={{ fontSize: "0.6em" }}>down</div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
      <section className="section section-two">
        {fixed ? (
          <div
            ref={titlesContainerRef}
            className={`home-categories-wrapper ${hovered}`}
          >
            {categories.map(
              (title, idx) => (
                // <Overlay index={idx} title={title} />
                // idx == 0 ? (
                <div key={idx} className={textAnimation}>
                  <TextScrambleComponentHover
                    handleClick={() => scrollToElementById(idx)}
                    text={
                      title == "artificalIntelligence"
                        ? "ARTIFICAL INTELLIGENCE"
                        : title.toUpperCase()
                    }
                  />
                </div>
              )
              // ) : (
              //   <div
              //     onMouseOver={() => {
              //       setTitleOnMainPageHovered(title);
              //     }}
              //     onMouseOut={() => {
              //       setTitleOnMainPageHovered("");
              //     }}
              //     onClick={() => scrollToElementById(idx)}
              //     key={idx}
              //     className={textAnimation}
              //   >
              //     <span className={"button-ani"}>
              //       {title == "artificalIntelligence"
              //         ? "ARTIFICAL INTELLIGENCE"
              //         : title.toUpperCase()}
              //     </span>
              //   </div>
              // )
              // )}
            )}
          </div>
        ) : null}
      </section>
      <section
        id="sectionTwoHalf"
        className="section section-two-half"
        ref={section1MenuRef}
      ></section>
      <section
        ref={sectionIndustryRef}
        id="sectionThree"
        className="section section-three"
      ></section>
      <section id="sectionFour" className="section section-four"></section>
      <section id="sectionFive" className="section section-five"></section>
      <section id="sectionSix" className="section section-six"></section>
      <section id="sectionSeven" className="section section-seven"></section>
      <section id="sectionEight" className="section section-eight"></section>
      <section id="sectionNine" className="section section-nine"></section>
      <section id="sectionTen" className="section section-ten">
        {<ContactUsText test={true} />}
        <div
          style={{
            color: "white",
            position: "absolute",
            fontSize: "0.26em",
            // width: "80%",
            fontFamily: "gotham",
            bottom: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%" }}>
            in3D does not disclose, collect, edit, transfer to a third party or
            use private information of its customers or website users. In any
            case in which in3D is asked to transfer private information, it will
            immediately notify the relevant customer and act under his guidance.
            For any inquiry or request for additional information on privacy
            statements, contact by email: Nathanael@in3D-Tech.com
            <br />
            in3D works according to international quality policies in
            development and production, information security and privacy
            security – ISO9001, ISO27001, ISO27701. The company undertakes and
            complies with legal and privacy requirements, engraves on its banner
            a high standard of service assembly, while maintaining accuracy,
            confidentiality and information security.
            <br />
            If you need more information, contact us at the email listed at the
            above.
          </div>
        </div>
      </section>
      {/* {scrollArea.currentSection > scrollArea.prevSection ? (
        scrollArea.currentSection == modelAnimationIsHalfWay ? (
          <SeeMoreBtn />
        ) : null
      ) : (
        <SeeMoreBtn />
      )} */}
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
