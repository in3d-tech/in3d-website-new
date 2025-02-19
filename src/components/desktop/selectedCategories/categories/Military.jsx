import "../selectedCategories.css";
import { Logo, VideoPlayer } from "../../../common/Logo";
// import { ModelComponent } from "./ModelComponent";
// import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export function Military({ selectedCategory }) {
  const headline =
    selectedCategory == "Industry" ? "Industry 4.0" : selectedCategory;

  const bottomVideoRef1 = useRef(null);
  const bottomVideoRef2 = useRef(null);
  const topVid1Ref = useRef(null);
  const topVid2Ref = useRef(null);
  const midVidContainerRef = useRef(null);
  const midVidRef = useRef(null);
  const modelRef = useRef(null);
  const middleElementRef = useRef(null);
  const midTextContainerRef = useRef(null);
  const midTextRef = useRef(null);

  useEffect(() => {
    const middleElement = middleElementRef.current;
    const midTextContainer = midTextContainerRef.current;
    const midText = midTextRef.current;
    const midVidContainer = midVidContainerRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          midTextContainer.classList.add("top-border-animation-container");
          midText.classList.add("fade-in-sc-right-mid-vid");
          midVidContainer.classList.add("fade-in-sc-shorter");
          // setIsTwoOneTextInView(true);
          // midTxtTwo.classList.add("border-right-animation-container");
        } else {
          //   botElement.classList.remove("scrolled");
        }
      });
    }, observerOptions);

    if (middleElement) {
      observer.observe(middleElement);
    }

    return () => {
      if (observer) {
        observer.unobserve(middleElement);
      }
    };
  }, []);

  return (
    <div className="selected-category-content-wrapper">
      <Logo />
      <Top topVid1Ref={topVid1Ref} topVid2Ref={topVid2Ref} />
      <Middle
        midVidRef={midVidRef}
        middleElementRef={middleElementRef}
        midTextContainerRef={midTextContainerRef}
        midTextRef={midTextRef}
        midVidContainerRef={midVidContainerRef}
      />
      <Bottom
        bottomVideoRef1={bottomVideoRef1}
        bottomVideoRef2={bottomVideoRef2}
      />
      {/* <BottomModel modelRef={modelRef} /> */}
    </div>
  );
}

const ImageOverlay = ({ topVid1Ref, topVid2Ref }) => {
  return (
    <div className="sc-right-half" style={{ height: "60%", marginTop: "2em" }}>
      <div className="image-container">
        <span
          className="large-image-industry sc-image-glass-bg"
          style={{ top: "3em", zIndex: 4 }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Boat 3D Scan.mp4"
            videoRef={topVid2Ref}
          />
        </span>
        <span
          className="small-image-military top-left-military sc-image-glass-bg"
          style={{ top: "-4em", left: "-7em", height: "15em", width: "26em" }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Truck (1).mp4"
            startTime={1}
            videoRef={topVid1Ref}
          />
        </span>
      </div>
    </div>
  );
};

const Top = ({ topVid1Ref, topVid2Ref }) => {
  const headline = "Military";
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div className="selected-content-first-divider">
        <div className="sc-content-left-half">
          <div className="sc-title-container">
            <h1>{headline}</h1>
          </div>
          <div
            style={{
              fontSize: "1.5em",
              fontFamily: "gotham",
              opacity: 0.72,
              width: "80%",
              lineHeight: "1.8em",
              marginTop: "2em",
            }}
          >
            Thanks to years of collaboration with defense industries, we gained
            the needed experience, knowledge and tools to provide quick and out
            of the box solutions that are tailored to the industries unique
            requirements
          </div>
        </div>
      </div>
      <div
        className="selected-content-first-divider"
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <ImageOverlay topVid1Ref={topVid1Ref} topVid2Ref={topVid2Ref} />
        {/* <MiddleThird /> */}
      </div>
    </div>
  );
};

const Middle = ({
  midVidRef,
  middleElementRef,
  midTextContainerRef,
  midTextRef,
  midVidContainerRef,
}) => {
  return (
    <div ref={middleElementRef} style={{ height: "100vh", display: "flex" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          ref={midTextContainerRef}
          className=""
          style={{
            display: "flex",
            justifyContentl: "center",
            // borderTop: "4px solid black",
            // marginTop: "8em",
            alignItems: "center",
            width: "70%",
          }}
        >
          <p
            ref={midTextRef}
            style={{
              fontSize: "1.5em",
              fontFamily: "gotham",
              // opacity: 0.72,
              width: "100%",
              lineHeight: "1.8em",
              textAlign: "center",
              marginLeft: "2em",
              marginTop: "1.5em",
            }}
            className="no-opacity"
          >
            In3D is committed to ISO standards and all other needed security
            measures such as secure development facilities, information security
            protocols, and personal security clearance for all our employees
          </p>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "4px solid black",
          height: "100%",
        }}
      >
        <span
          className="no-opacity sc-image-glass-bg "
          style={{ height: "24em", marginTop: "4em" }}
          ref={midVidContainerRef}
        >
          {/* <img
            src="/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg"
            alt="work-example"
            style={{ height: "25em", width: "100%" }}
          /> */}
          {/* <VideoPlayer src="/assets/images/backgrounds/security/Hololens 2 - Guides (1).mp4" /> */}
          <VideoPlayer
            videoRef={midVidRef}
            src="https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Missile (1).mp4"
          />
        </span>
      </div>
    </div>
  );
};

const Bottom = ({ bottomVideoRef1, bottomVideoRef2 }) => (
  <div style={{ height: "100vh", display: "flex" }}>
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>

    <div
      style={{
        flex: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        // width: "",
      }}
    >
      <div
        style={{
          fontFamily: "gotham",
          fontSize: "1.5em",
          width: "60%",
          lineHeight: "1.8em",
          opacity: 0.8,
          marginTop: "2em",
        }}
      >
        The defense industries face unique challenges, such as
        High-Mix-Low-Volume manufacture, strict information security protocols
        and a wide and complex content of work
      </div>
      <div
        // className="image-container"
        style={{
          borderBottom: "3px solid rgb(0,0,0,0.8)",
          display: "flex",
          padding: "3em",
        }}
      >
        <span
          className="large-image-customize  sc-image-glass-bg"
          style={{ flex: 1, height: "18em", width: "50%" }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
            videoRef={bottomVideoRef1}
            startTime={5}
          />
        </span>
        <span
          className="large-image-customize   sc-image-glass-bg"
          style={{ flex: 1, height: "18em", width: "94%" }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
            videoRef={bottomVideoRef2}
            startTime={3}
          />
        </span>
      </div>
    </div>
  </div>
);

// const BottomModel = ({ modelRef }) => (
//   <div style={{ height: "80vh", display: "flex" }}>
//     <div
//       style={{
//         flex: 1,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Canvas
//         // style={{ border: "1px solid black", zIndex: 54433 }}
//         camera={{ position: [0, 0, 10], fov: 75 }}
//       >
//         <ambientLight intensity={1} />
//         <pointLight position={[10, 10, 10]} />
//         <directionalLight position={[0, 10, 0]} intensity={1} />
//         {/* <OrbitControls /> */}
//         {/* <Stars count={2/000} /> */}
//         {/* <Camera /> */}
//         <Suspense fallback={null}>
//           {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
//           <ModelComponent
//             url={"/assets/models/military.glb"}
//             modelRef={modelRef}
//             // dontRotate
//             position={[0, -3, 0]}
//             scale={[9, 9, 9]}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//     <div
//       style={{
//         position: "absolute",
//         bottom: "-198%",
//         left: "2em",
//         zIndex: 1,
//       }}
//     >
//       <ContactBtn isFromSelectedCategory />
//     </div>
//   </div>
// );
