import { useEffect, useState } from "react";

import Tilt from "react-parallax-tilt";

export const AboutUsText = ({
  scrollArea,
  fixedCategoryColumn,
  setSelectedCategory,
}) => {
  // useEffect(()=>)
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (showText) {
      return;
    }
    if (scrollArea.currentSection == 9) {
      setShowText(true);
    }
  }, [scrollArea]);
  const textBg = {
    color: "white",
    animation: "fadeIn 1.8s forwards",
    fontSize: "0.5em",
    // background: "rgb(0,0,0,0.7)",
    borderRadius: "8px",
    padding: "8px",
  };

  return (
    <div>
      {/* bg scroll left half */}
      <div
        className={`background-scroll-glass-bg ${
          fixedCategoryColumn
            ? "homepage-about-us-fade-out"
            : "homepage-about-us-fade-in"
        }`}
      >
        <div className="glass-effect">
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
              style={{
                // width: "90%",
                // marginLeft: "0.6em",
                padding: "8px",
                marginTop: "2em",
                borderRight: "1px solid rgba(255, 255,255,0.4)",
                borderLeft: "1px solid rgba(255, 255,255,0.4)",
                borderRadius: "20px",
              }}
            >
              <div
                // className="glass-effect-title"
                // className="glass-effect"
                style={{ ...textBg, fontSize: "1.4em" }}
              >
                We are on a mission to evolve
              </div>
            </Tilt>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "3em",
            }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
              style={{
                width: "25%",
                // marginLeft: "0.6em",
                // border: "1px solid rgba(255, 255,255,0.4)",
                borderRadius: "20px",
                marginTop: "1em",
                padding: "12px",
                height: "45%",
                // marginTop: "1em",
              }}
            >
              <div
                // className="glass-effect"
                style={{
                  ...textBg,
                  // marginTop: "1.4em",
                }}
              >
                <span style={{ color: "orange" }}>
                  3D isn&#39;t only a technology
                </span>
                , it’s a different way of thinking, with more perspective
              </div>
            </Tilt>
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
              style={{
                padding: "12px",
                width: "30%",
                // marginRight: "1em",
                height: "40%",
                marginTop: "3em",
                // border: "1px solid rgba(255, 255,255,0.4)",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  color: "white",
                  animation: "fadeIn 1.8s forwards",
                  fontSize: "0.5em",
                  // background: "rgb(0,0,0,0.7)",
                  borderRadius: "8px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Our goal is to gather all senses into the virtual world and blur
                the boundaries between realities
              </div>
            </Tilt>
          </div>

          <button
            onClick={() => setSelectedCategory("Who we Are")}
            className="see-more-btn hp-about-btn-hover"
            style={{
              width: "10%",
              // height: "580px",
              fontSize: "0.4em",
              // marginLeft: "4.5em",
              // marginTop: "15em",
              bottom: "-5em",
              right: "10em",
              position: "absolute",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
      {/* bg scroll right half */}
    </div>
  );
};
