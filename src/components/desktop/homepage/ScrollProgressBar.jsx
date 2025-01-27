import { gsap } from "gsap";
import { useAppContext } from "../../../context/appContext";
import { getSparkleColour } from "./scene/ornaments/getSparkleColour";
import { useEffect } from "react";

export function ScrollProgressBar() {
  const { scrollArea } = useAppContext();

  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: ".section-ten",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(".inner-line", {
      y: () => {
        return (
          window.innerHeight -
          document.querySelector(".inner-line").offsetHeight
        );
      },
      duration: 1,
    });
  }, []);

  return (
    <div className="viewable-content-wrapper">
      <div className="homepage-scroll-bar">
        <div
          style={{
            backgroundColor: getSparkleColour(scrollArea.currentSection),
          }}
          className="inner-line"
        ></div>
      </div>
      <div className="bg-scale-effect"></div>
    </div>
  );
}
