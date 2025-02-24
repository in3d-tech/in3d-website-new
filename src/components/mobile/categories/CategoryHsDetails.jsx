import { MenuAboutContact } from "../nav/MenuWheel";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useState } from "react";

// const ABOUT_US = 7;
export const HomeScreenCategoryText = ({
  title,
  idx,
  setSelectedMenuActionMobile,
  setSelectedCategory,
  setSelectedCategoryItemByIdx,
  selectedCategoryItemByIdx,
  categoryIdxRef,
}) => {
  useEffect(() => {
    const trigger = gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: `.category-${idx}`, // Create a unique class or ID for each element
          start: "top 50%",
          end: "bottom center",
          onEnter: () => {
            setSelectedCategoryItemByIdx(idx);
            categoryIdxRef.current = idx;
          },
          onEnterBack: () => {
            setSelectedCategoryItemByIdx(idx);
            categoryIdxRef.current = idx;
          },
          onLeaveBack: () => {
            if (idx === 0) {
              setSelectedCategoryItemByIdx(-1);
              categoryIdxRef.current = -1;
            }
          },
        },
      }
    );

    return () => {
      trigger.scrollTrigger.kill(); // Cleanup the ScrollTrigger on component unmount
      // tl.kill();
    };
  }, []);

  // console.log({ selectedCategoryItemByIdx });
  // console.log({ idx });

  const categoryDataByIndex = {
    0: {
      title: (
        <>
          Industry <span>4.0</span>
        </>
      ),
      scrolledName: "industry",
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      text: "Together with our clients we develop tailor made solutions using XR and 3D technology.",
    },
    1: {
      title: (
        <>
          <span>M</span>
          edicine
        </>
      ),
      scrolledName: "medicine",
      bgImage: 'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
      text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations.",
    },
    2: {
      title: (
        <>
          <span>M</span>
          icrosoft
        </>
      ),
      bgImage:
        'url("/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg")',
      text: "In3D is the official and the inclusive Mixed Reality (MR) partner of Microsoft Israel",
    },
    3: {
      title: (
        <>
          <span>S</span>
          ecurity
        </>
      ),
      scrolledName: "security",
      bgImage:
        'url("/assets/images/backgrounds/security/Security_Togle_Finish2.jpg")',
      text: "Thanks to years of collaboration with defense industries, we provide reliable and out of the box solutions tailored to the industries unique requirements.",
    },
    4: {
      title: (
        <>
          <span>A</span>
          rtifical Intelligence
        </>
      ),
      scrolledName: "ai",
      bgImage: 'url("/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg")',
      text: "The combination of a 3D XR software environment with A.I creates advanced and innovative operations",
    },
    5: {
      title: (
        <>
          <span>M</span>
          ilitary
        </>
      ),
      scrolledName: "military",
      bgImage:
        'url("/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg")',
      text: "Through development of complex simulators, XR platforms, and tailored applications, we deliver top-of-the-line technology in the service of this significant sector.",
    },
    6: {
      title: (
        <>
          <span>C</span>
          ustomization
        </>
      ),
      scrolledName: "customize",
      bgImage:
        'url("/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg")',
      text: "With our amazing team, we provide the flexibility and abilities needed to deliver the best tailor-made product.",
    },
    8: {
      text: (
        <div
          style={{
            color: "white",
            position: "absolute",
            fontSize: "6px",
            // width: "80%",
            fontFamily: "gotham",
            bottom: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "90%", textAlign: "center" }}>
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
      ),
    },
    7: {
      bgImage: 'url("/assets/images/overlay-images/about-4.png")',
      title: <span>About us</span>,
      text: (
        <div>
          We are on a mission to evolve
          <br />
          <br />
          3D isn't only a technology, it’s a different way of thinking, with
          more perspective Our goal is to gather all senses into the virtual
          world and blur the boundaries between realities
        </div>
      ),
    },
  };

  if (idx == 8) {
    return (
      <div
        style={{
          // height: "25vh",
          color: "white",
          fontFamily: "gotham",
          display: "flex",
          flexDirection: "column",
          padding: "4px",
          // marginTop: "3em",
          justifyContent: "center",
          backgroundColor: "rgb(0,0,0,0.8)",
        }}
      >
        <MenuAboutContact isFromHomeScreen />
        {/* {categoryDataByIndex[idx].text} */}
        <br />
        <br />
      </div>
    );
  }

  const hsTextBgs = {
    0: "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg",
    1: "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
    2: "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg",
    3: "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg",
    4: "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
    5: "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg",
    6: "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
    7: "/assets/images/backgrounds/moving-bg.jpg",
  };

  return (
    <div
      className={`mobile-hs-category-wrapper category-${idx} fader
}`}
      style={{
        height: "80vh",
        color: "white",
        fontFamily: "gotham",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        overflowX: "hidden",
        borderTop: "1px solid rgb(255, 255, 255, 0.4)",
        justifyContent: "space-evenly",
        backgroundColor: "rgb(0,0,0,0.1)", // `rgb(0,0,0,0.${idx + 1})`,
      }}
    >
      {/* this is the very nice background effect under here  */}

      {/* <div
        // className={
        //   selectedCategoryItemByIdx == -1 || selectedCategoryItemByIdx == 8
        //     ? ""
        //     : "main-content"
        // }
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          // marginTop: "13%",
          // borderRadius: "12px",
          // top: 0,
          // zIndex: -2,
          // height: "50vh",
          height: "100%",
          // left: "1.5%",
          width: "100%",
          // width: "84vw",
          // maxWidth: "100%",
          overflowX: "unset",
          // backgroundColor: "rgb(0,0,0,0.6)",
          backgroundImage: hsTextBgs[6],

          // backgroundImage:
          //   selectedCategoryItemByIdx == idx
          //     ? hsTextBgs[idx] || ""
          //     : selectedCategoryItemByIdx == -1 ||
          //       selectedCategoryItemByIdx == 8
          //     ? ""
          //     : hsTextBgs[6],
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1,
          zIndex: -1,

          // filter: idx == 6 ? "blur(40px)" : "blur(40px)",
          // filter: "blur(3px)",
        }}
      ></div> */}
      {/* {selectedCategoryItemByIdx == idx ? ( */}
      <div
        style={{
          posiiotn: "absolute",
          borderRadius: "12px",
          height: "100%",
          width: "100%",
          left: 0,
          background:
            selectedCategoryItemByIdx == -1 || selectedCategoryItemByIdx == 8
              ? ""
              : "rgb(0,0,0,0.6)",
          transition: "background 0.5s ease-in-out",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          zIndex: 5,
        }}
      >
        <div
          className={`scrolled-category-title mobile-hs-category-title-wrapper ${
            selectedCategoryItemByIdx == idx ? "fade-in-longer" : "fade-out"
          } `}
          style={{
            marginTop: "1em",

            fontSize: "2.3em",
            textAlign: "center",
            // border: "1px solid rgb(255,255,255,0.3)",
            boxShadow: `-1px 1px 12px 4px rgba(247, 172, 247, 0.75)`,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${hsTextBgs[idx]})` || "",
              // "url(/assets/images/backgrounds/taasia/Industry_Togle.jpg)",
              // height: "200%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover",
              height: "4em",
              opacity: 0.8,
            }}
          >
            {categoryDataByIndex[idx]?.title}
          </div>
          {/* <div
            style={{
              backgroundImage:
                "url(/assets/images/backgrounds/taasia/Industry_Togle.jpg)",
              height: "200%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
    
          </div> */}
        </div>
        <span
          style={{
            textAlign: "left",
            padding: "1em",
            fontSize: "1em",
            lineHeight: "1.6em",
          }}
        >
          {idx == 7 ? (
            // <div >
            categoryDataByIndex[idx].text
          ) : (
            // </div>z
            <AnimatedText
              text={categoryDataByIndex[idx].text}
              categoryIdx={idx}
              selectedCategoryItemByIdx={selectedCategoryItemByIdx}
            />
          )}
          {/* {categoryDataByIndex[idx]?.text} */}
          {/* <AnimatedText
            text={categoryDataByIndex[idx].text}
            categoryIdx={idx}
            selectedCategoryItemByIdx={selectedCategoryItemByIdx}
          /> */}
        </span>
        <LearnMoreBtn
          setSelectedMenuActionMobile={setSelectedMenuActionMobile}
          idx={idx}
          setSelectedCategory={setSelectedCategory}
          selectedCategoryItemByIdx={selectedCategoryItemByIdx}
        />
      </div>
      {/* ) : null} */}
    </div>
  );
};

export const ContactUsText = ({ title = "Contact Us" }) => (
  <div
    className="contact-us-wrapper"
    style={{ position: "absolute", top: "800%", height: "60vh" }}
  >
    {/* <span className="contact-title">Contact us</span>
    <div className="contact-details-wrapper">
      <span>Feel free to contact us via:</span>
      <span style={{ marginTop: "0.5em", fontSize: "1em" }}>
        <span style={{ fontWeight: "bold" }}>Phone:</span>
        <span>+972-54-218-5021 or +1(302)-219-4023</span>
      </span>

      <span>
        <span style={{ fontWeight: "bold" }}>Email: </span>sales@in3d-tech.com
      </span>
      <span style={{ marginTop: "1em" }}>
        We also invite you to meet us at 1 Shefa Tal street, Tel Aviv.
      </span>
      <span>
        Or you can message us
        <span style={{ fontSize: "1.2em", textDecoration: "underline" }}>
          Here
        </span>
      </span>
    </div> */}
  </div>
);

export const AboutUsText = ({ title }) => {
  return <div>{title}</div>;
};

const LearnMoreBtn = ({
  setSelectedMenuActionMobile,
  idx,
  setSelectedCategory,
  selectedCategoryItemByIdx,
}) => {
  return (
    <div
      className={`category-title-no-opacity ${
        selectedCategoryItemByIdx == idx ? "fade-in" : "fade-out"
      }`}
      style={{ marginLeft: "1em" }}
    >
      <button
        // onClick={() => setSelectedMenuActionMobile(`fab-action-${idx + 1}`)}
        onClick={() => {
          if (idx == 8) {
            return;
          }
          setSelectedCategory(idx + 3);
        }}
        className="cta"
      >
        <span className="hover-underline-animation"> Learn more </span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="10"
          viewBox="0 0 46 16"
          style={
            selectedCategoryItemByIdx == idx
              ? { transform: "scale(1.2)", opacity: 0.6 }
              : {}
          }
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
            fill="white"
            stroke="white"
            strokeWidth="2"
          ></path>
        </svg>
      </button>
    </div>
  );
};

const AnimatedText = ({ text, categoryIdx, selectedCategoryItemByIdx }) => {
  if (typeof text !== "string") {
    return null;
  }

  useEffect(() => {
    if (categoryIdx === selectedCategoryItemByIdx) {
      handleAssemble();
    } else {
      handleScatter();
    }
  }, [selectedCategoryItemByIdx]);

  // Split text into words
  const wordsArray = text.split(" ");

  const initialPositions = useMemo(() => {
    return wordsArray.map(() => ({
      x: Math.random() * 100 - 50, // Random x offset
      y: Math.random() * 100 - 50, // Random y offset
    }));
  }, [wordsArray.length]);

  const [words, setWords] = useState(
    wordsArray.map((word, index) => ({
      word,
      ...initialPositions[index],
    }))
  );

  const handleAssemble = () => {
    setWords(wordsArray.map((word) => ({ word, x: 0, y: 0 })));
  };

  const handleScatter = () => {
    setWords(
      words.map((wordDetail, index) => ({
        ...wordDetail,
        ...initialPositions[index],
      }))
    );
  };

  return (
    <div
      className={`animated-text-wrapper ${
        categoryIdx === selectedCategoryItemByIdx
          ? "fade-in-longer"
          : "fade-out"
      }`}
      style={{ maxWidth: "100%", overflowWrap: "break-word" }}
    >
      <div
        className="animated-text-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {words.map((wordDetail, index) => (
          <span
            key={index}
            className="word"
            style={{
              display: "inline-block",
              transform: `translate(${wordDetail.x}px, ${wordDetail.y}px)`,
              transition: "transform 0.5s ease-out",
              margin: "5px",
            }}
          >
            {wordDetail.word}
          </span>
        ))}
      </div>
      <div style={{ marginTop: "1em" }}>
        {/* <button onClick={handleAssemble}>Assemble Text</button>
        <button onClick={handleScatter} style={{ marginLeft: "0.5em" }}>
          Scatter Text
        </button> */}
      </div>
    </div>
  );
};
