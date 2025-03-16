import "../selectedCategories.css";
import { Logo, VideoPlayer } from "../../../common/Logo";
import { useRef, useEffect } from "react";
// import { ModelComponent } from "./ModelComponent";
// import { Canvas } from "@react-three/fiber";
// import AnimatedBackground from "./AnimatedPointsBg";

export function Medicine({ selectedCategory }) {
  const topVideoRef = useRef();
  const middleVideoRef = useRef();
  const middleText = useRef();
  const middleTopBorder = useRef();
  const middleBottomBorder = useRef();
  const middleElementRef = useRef();

  useEffect(() => {
    const middleElement = middleElementRef.current;
    const middleTop = middleTopBorder.current;
    const middleBottom = middleBottomBorder.current;
    const middleTopText = middleText.current;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 80% of the middle section is in view
    };

    const observerOptionsTwo = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9, // Trigger when 80% of the middle section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("now intersectin numero 1");
          middleTop.classList.add("medicine-top-border");
          middleTopText.classList.add("medicine-bottom-text");
        }
      });
    }, observerOptions);

    const observerTwo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("now intersecting number deux");
          middleBottom.classList.add("grow-border");
        }
      });
    }, observerOptionsTwo);

    if (middleElement) {
      observer.observe(middleElement);
    }

    if (middleElement) {
      observerTwo.observe(middleElement);
    }

    return () => {
      if (middleElement) {
        observer.unobserve(middleElement);
      }
      if (middleElement) {
        observerTwo.unobserve(middleElement);
      }
    };
  }, []);

  return (
    <div
    // className="selected-category-content-wrapper"
    // style={{ height: "100vh" }}
    >
      {/* <AnimatedBackground /> */}
      <Logo />
      <Top topVideoRef={topVideoRef} />
      <Middle
        middleVideoRef={middleVideoRef}
        middleTopBorder={middleTopBorder}
        middleBottomBorder={middleBottomBorder}
        middleElementRef={middleElementRef}
        middleText={middleText}
      />
      {/* <ModelComponent /> */}
      {/* <Bottom modelRef={modelRef} /> */}
    </div>
  );
}

const Top = ({ topVideoRef }) => {
  const headline = "Medicine";
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          // border: "1px solid rgb(0,0,0,0.2)",
        }}
        className="overlay-image-med-one"
      >
        <img
          className="overlay-image-med-top"
          style={{ height: "100%", width: "100%" }}
          // src="/assets/images/backgrounds/medicine/medical_overlay_1.jpg"
          src="https://in3dwebsite.blob.core.windows.net/photos/medical_overlay_1-min.jpg"
          alt="medicalOverlay"
        />
      </div>
      <div className="selected-content-first-divider">
        <div className="sc-content-left-half">
          <div className="medicine-top-header-container">
            <h1
              className="med-titled"
              style={{ animation: "fadeInMoveUp 2.3s ease-in-out" }}
            >
              {headline}
            </h1>
          </div>
          <div className="medicine-top-text">
            The world of medicine is one of the most innovative sectors in the
            world. <br />
            Using Extended Reality (XR) we at in3D became pioneers in
            development of XR products for medical organizations, collaborating
            together to empower innovation and efficiency for clinics and
            hospitals
          </div>
        </div>
      </div>
      <div className="selected-content-first-divider">
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid black",
            height: "100%",
          }}
        >
          <span className="sc-image-glass-bg" style={{ marginTop: "20em" }}>
            {/* <img
              src="/assets/images/backgrounds/medicine/Medical_Togle.jpg"
              alt="work-example"
              style={{ width: "100%" }}
            /> */}
            {/* <VideoPlayer src="/assets/images/backgrounds/medicine/Medical Holoportation - Ichilov (1).mp4" /> */}
            <VideoPlayer
              videoRef={topVideoRef}
              src="https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4"
              startTime={2}
            />
          </span>
        </div>
        {/* <MiddleThird /> */}
      </div>
      {/* <div
        style={{
          position: "absolute",
          bottom: "-178%",
          left: "2em",
          zIndex: 1,
        }}
      >
        <ContactBtn isFromSelectedCategory />
      </div> */}
    </div>
  );
};

const Middle = ({
  middleVideoRef,
  middleTopBorder,
  middleBottomBorder,
  middleElementRef,
  middleText,
}) => {
  return (
    <div ref={middleElementRef} style={{ display: "flex" }}>
      <div
        style={{
          position: "absolute",
          top: "100%",
          width: "100%",
          height: "100%",
        }}
        className="overlay-image-med-one"
      >
        <img
          className="overlay-image-med-bot"
          style={{ height: "100%", width: "100%" }}
          // src="/assets/images/backgrounds/medicine/med-overlay-bot.jpg"
          src="https://in3dwebsite.blob.core.windows.net/photos/med-overlay-bot-min.jpg"
          alt="medicalSkeletons"
        />
      </div>
      <div style={{ flex: 1 }}>
        <div
          ref={middleTopBorder}
          // style={{
          //   display: "flex",
          //   marginTop: "9em",
          //   borderTop: "4px solid rgb(0,0,0,0.6)",
          // }}
          // className="medicine-top-border"
          className=""
        >
          <p className="no-opacity" ref={middleText}>
            Our team is very conscious of our medical clients' needs, and
            together we can develop a new and exciting working environment that
            upgrades working methods and quality of care
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
          // border: "1px solid black",
          height: "100%",
        }}
      >
        <span
          className="sc-image-glass-bg med-mid-vid-wrapper"
          // style={{ marginTop: "20em", height: "25em" }}
        >
          {/* <img
            src="/assets/images/backgrounds/medicine/Medical_Togle.jpg"
            alt="work-example"
            style={{ width: "100%" }}
          /> */}
          {/* <VideoPlayer src="/assets/images/backgrounds/medicine/Medical - Real time operation.mp4" /> */}
          <VideoPlayer
            videoRef={middleVideoRef}
            src="https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4"
          />
        </span>
      </div>
      <div
        ref={middleBottomBorder}
        // className="grow-border"
        // style={{
        //   position: "absolute",
        //   width: "50%",
        //   border: "1px solid black",
        //   bottom: "-90%",
        //   right: 0,
        // }}
      ></div>
    </div>
  );
};

// const Bottom = ({ modelRef }) => (
//   <div style={{ height: "100vh", display: "flex" }}>
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
//             url={"/assets/models/medical_model1 (1).glb"}
//             modelRef={modelRef}
//             dontRotate
//             position={[9, -5, -3]}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   </div>
// );
