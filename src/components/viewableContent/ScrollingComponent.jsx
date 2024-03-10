import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export const ScrollingComponent = ({
  scrollArea,
  setScrollArea,
  text1Ref,
  text2Ref,
  sect2Ref,
  sect4Ref,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const locoScroll = new LocomotiveScroll({
      el: container,
      smooth: true,
    });

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },

      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.style.transform ? "transform" : "fixed",
    });

    gsap.fromTo(
      "body",
      // section 1
      {
        "--color": "url('/assets/images/backgrounds/Astro_1_Background.webp')",
        opacity: 1,
        scrollTrigger: {},
      },

      // section 2

      {
        "--color": "url('/assets/images/another-med.jpg')",
        duration: 1,
        // opacity: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: ".section-2",
          scroller: container,
          scrub: true,
          start: "top bottom",
          end: "+=100%",
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 2;
            areaObj.prevSection = 1;
            setScrollArea(areaObj);
          },
          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 1;
            areaObj.prevSection = 2;
            setScrollArea(areaObj);
          },
        },
      }
    );

    gsap.fromTo(
      "body",
      {
        "--color": "url('/assets/images/another-med.jpg')",
        // opacity: 0,
      },
      // section 3

      {
        "--color": "url('/assets/images/backgrounds/microsoft.jpg')",
        duration: 1,
        opacity: 1,
        immediateRender: false,
        scrollTrigger: {
          markers: true,
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 3;
            areaObj.prevSection = 2;
            setScrollArea(areaObj);
          },
          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 2;
            areaObj.prevSection = 3;
            setScrollArea(areaObj);
          },

          trigger: ".section-3",
          scroller: container,
          scrub: true,
          start: "top bottom",
          end: "+=100%",
        },
      }
    );

    gsap.fromTo(
      "body",
      {
        "--color": "url('/assets/images/backgrounds/microsoft.jpg')",
        // opacity: 0,
      },
      // section 4

      {
        "--color": "url('/assets/images/backgrounds/taasiya.jpg')",
        duration: 1,
        opacity: 1,
        immediateRender: false,
        scrollTrigger: {
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 4;
            areaObj.prevSection = 3;
            setScrollArea(areaObj);
          },

          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 3;
            areaObj.prevSection = 4;
            setScrollArea(areaObj);
          },

          trigger: ".section-4",
          scroller: container,
          scrub: true,
          start: "top bottom",
          end: "+=100%",
        },
      }
    );

    gsap.fromTo(
      "body",
      {
        "--color": "url('/assets/images/backgrounds/taasiya.jpg')",
        // opacity: 0,
      },
      // section 4

      {
        "--color": "url('/assets/images/backgrounds/where-is-ai-used.jpg')",
        duration: 1,
        opacity: 1,
        immediateRender: false,
        scrollTrigger: {
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 5;
            areaObj.prevSection = 4;
            setScrollArea(areaObj);
          },

          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 4;
            areaObj.prevSection = 5;
            setScrollArea(areaObj);
          },

          trigger: ".section-5",
          scroller: container,
          scrub: true,
          start: "top bottom",
          end: "+=100%",
        },
      }
    );

    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="container">
      <div className="section hero">Scroll to change background color</div>
      <div className="section section-1" style={{ height: "200vh" }}>
        This is a spacer section 1
      </div>
      <div ref={sect2Ref} className="section section-2" id="num2">
        This is a spacer section 2
      </div>
      <div
        className="section section-3"
        style={{ color: "white", fontSize: "2em", border: "1px solid white" }}
        id="test"
      >
        This is a spacer section 3 dsfsdfsdf
      </div>
      <div ref={sect4Ref} className="section section-4">
        This is a spacer section 4
      </div>
      <div className="section section-5" id="num5">
        This is a spacer section 5
      </div>
      <div>
        <h1 style={{ color: "white" }}>HELLO WORLD</h1>
      </div>
    </div>
  );
};
