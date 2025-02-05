import "../selectedCategories.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { ContactBtn, Logo, VideoPlayer } from "../../../common/Logo";
import { categoryObserver } from "../../../common/categoryObserver";
// import { Canvas } from "@react-three/fiber";
// import { ModelComponent } from "./ModelComponent";

export function Industry({ selectedCategory }) {
  const [displayVideos, setDisplayVideos] = useState(false);
  const [vids, setVids] = useState(false);
  const headline =
    selectedCategory === "Industry" ? "Industry 4.0" : selectedCategory;

  const middleRef = useRef(null);
  const middleImageRef = useRef(null);
  const overlayRef = useRef(null);
  const middleTextRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomImageRef = useRef(null);
  const bottomImage2Ref = useRef(null);
  const vid1 = useRef(null);
  const vid2 = useRef(null);
  const midVid = useRef(null);
  const botVid1 = useRef(null);
  const botVid2 = useRef(null);

  useEffect(() => {
    // console.log("industry rendered");
    preloadVideos();
    if (!displayVideos) {
      setTimeout(() => setDisplayVideos(true), 1500);
    }
  }, []);

  const preloadVideos = () => {
    if (!vids) {
      const video1Element = vid1.current;
      const video2Element = vid2.current;

      video1Element.preload = "auto";
      video2Element.preload = "auto";

      video1Element.addEventListener("loadedmetadata", () => {
        video1Element.play();
        video1Element.pause();
      });

      video2Element.addEventListener("loadedmetadata", () => {
        video2Element.play();
        video2Element.pause();
      });

      setVids(true);
    }
  };

  useEffect(() => {
    const middleImageElement = middleImageRef.current;
    const middleElement = middleRef.current;
    const overlayElement = overlayRef.current;

    const observerOptions2 = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // 0.55,
    };

    const midObserver2 = categoryObserver({
      sectionRef: middleElement,
      image1Ref: middleImageElement,
      image2Ref: overlayElement,
      // textRef: botTextElement,
      observerOptions: observerOptions2,
      isDoubleAnimation: true,
    });

    return () => {
      // if (midObserver) {
      //   midObserver.unobserve(middleElement);
      // }
      if (midObserver2) {
        // console.log("there is a midoverserver 2");
        midObserver2.unobserve(middleElement);
      }
    };
  }, []);

  useEffect(() => {
    const midTextElement = middleTextRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7, // Trigger when 80% of the middle section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          midTextElement.classList.add("scrolled");
        } else {
          // midTextElement.classList.remove("scrolled");
        }
      });
    }, observerOptions);

    if (midTextElement) {
      observer.observe(midTextElement);
    }

    return () => {
      if (midTextElement) {
        observer.unobserve(midTextElement);
      }
    };
  }, []);

  useEffect(() => {
    const botElement = bottomRef.current;
    const botTextElement = bottomTextRef.current;
    const botImageElement = bottomImageRef.current;
    const botImage2Element = bottomImage2Ref.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 80% of the middle section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          botTextElement.classList.add("scrolled");
          botImageElement.classList.add("scrolled");
          botImage2Element.classList.add("scrolled");
        } else {
          // botTextElement.classList.remove("scrolled");
          // botImageElement.classList.remove("scrolled");
          // botImage2Element.classList.remove("scrolled");
        }
      });
    }, observerOptions);

    if (botElement) {
      observer.observe(botElement);
    }

    return () => {
      if (botElement) {
        observer.unobserve(botElement);
      }
    };
  }, []);

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "300vh" }}
      // style={{ height: "370vh" }}
    >
      <Logo />
      <Top vid1={vid1} vid2={vid2} />
      <Middle
        middleRef={middleRef}
        middleImageRef={middleImageRef}
        overlayRef={overlayRef}
        middleTextRef={middleTextRef}
        displayVideos={displayVideos}
        midVid={midVid}
      />
      <Bottom
        bottomImageRef={bottomImageRef}
        bottomTextRef={bottomTextRef}
        bottomRef={bottomRef}
        bottomImage2Ref={bottomImage2Ref}
        displayVideos={displayVideos}
        botVid1={botVid1}
        botVid2={botVid2}
      />
      {/* <BottomModel /> */}
    </div>
  );
}

const ImageOverlay = ({ vid1, vid2 }) => {
  return (
    <div className="sc-right-half">
      <div className="image-container" style={{ marginTop: "2em" }}>
        <span
          className="large-image-industry sc-image-glass-bg"
          style={{ marginTop: "3em", height: "60%" }}
        >
          <img
            src="https://in3dwebsite.blob.core.windows.net/photos/industry-large-min.jpg"
            alt="Large"
            style={{ width: "100%" }}
          />
        </span>
        <span
          className="small-image-industry top-left-industry sc-image-glass-bg"
          style={{ width: "70%", marginTop: "-1.5em", left: "-8em" }}
        >
          <img
            src="https://in3dwebsite.blob.core.windows.net/photos/industry-hat-min.png" //"/assets/images/backgrounds/taasia/industry-hat.png"
            alt="Top Left"
            style={{ width: "55%", borderRadius: "12px" }}
          />
        </span>
        <span
          className="small-image-industry top-right-industry sc-image-glass-bg"
          style={{ left: "10em", marginTop: "-1em", height: "13em" }}
        >
          <VideoPlayer
            videoRef={vid1}
            src="https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4"
          />
        </span>

        <span
          className="small-image-industry bottom-left-industry sc-image-glass-bg"
          style={{ top: "13em", left: "-8em" }}
        >
          <VideoPlayer
            videoRef={vid2}
            src="https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4"
            startTime={2}
          />
        </span>
      </div>
    </div>
  );
};

const Top = ({ vid1, vid2 }) => {
  const modelRef = useRef();
  const headline = "Industry 4.0";
  return (
    <div style={{ display: "flex" }} className="top-top">
      <div className="selected-content-first-divider">
        <div className="sc-content-left-half industry-left-half-top">
          <div className="industry-headline">
            <h1 className="headline-animation">{headline}</h1>
          </div>

          <div
            className="no-opacity industry-top-text text-animation"
            style={{ zIndex: 1 }}
          >
            The world was recently introduced to the wonders of the industry 4.0
            revolution. <br />
            Industry is experiencing a quantum leap forward, with seemingly
            endless tools that impact everything we know about manufacturing and
            maintenance.
          </div>
        </div>
      </div>
      <div
        className="selected-content-first-divider"
        style={{ marginTop: "5em" }}
      >
        <ImageOverlay vid1={vid1} vid2={vid2} />
      </div>
    </div>
  );
};

const Middle = ({
  middleRef,
  middleImageRef,
  overlayRef,
  middleTextRef,
  displayVideos,
  midVid,
}) => {
  return (
    <div
      ref={middleRef}
      style={{ height: "100vh", display: "flex", position: "relative" }}
      className="mid-mid"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
        }}
        className="overlay-image"
      >
        <img
          ref={overlayRef}
          className="overlay-color"
          // src="/assets/images/backgrounds/taasia/industry-machine.jpg"
          src="https://in3dwebsite.blob.core.windows.net/photos/industry-machine-min.jpg"
          alt="background"
          style={{
            width: "100%",
            // transform: "scale(.5)",
            // transform: "translateX(-400px)",
          }}
        />
      </div>
      <div style={{ flex: 1 }}></div>
      <div
        className="idk-man"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          // border: "1px solid black",
          // marginLeft: "2em",
        }}
      >
        <div
          className="middle-image"
          style={{
            width: "30%",
            height: "70%",
            marginRight: "10%",
          }}
          // style={{ border: "1px solid red", height: "100%" }}
          ref={middleImageRef}
        >
          <img
            // src="https://in3dwebsite.blob.core.windows.net/photos/phone-3.png"
            src="/assets/images/phone_frame_2.png"
            // style={{ width: "100%", height: "100%" }}
            style={{
              width: "100%",
              height: "100%",
              zIndex: 2,
              position: "relative",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "10%", // Adjust the height of the fold
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Style as needed
              zIndex: 3,
            }}
          />
          <div
            // style={{
            //   position: "absolute",
            //   top: "8%",
            //   // height: "100%",
            //   width: "82%",
            //   height: "78%",
            //   left: "9%",
            //   // top: "-80%",
            //   zIndex: -1,
            //   // border: "5px solid red",
            // }}
            style={{
              position: "absolute",
              top: "20%",
              left: 0,
              right: 0,
              height: "50%", // Adjust the height of the fold
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Style as needed
              zIndex: 3,
            }}
          >
            {displayVideos ? (
              <VideoPlayer
                videoRef={midVid}
                isHaveBorderRadius
                // startTime={1}
                src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4"
              />
            ) : null}
          </div>
        </div>

        <div
          ref={middleTextRef}
          className="mid-text mid-industry-text-size"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            width: "36%",
            top: "55%",
            right: "25%",
            zIndex: -1,
          }}
        >
          <p
            style={{
              width: "70%",
            }}
            className="text-animation industry-top-text "
          >
            <span style={{ opacity: 1 }}>Together with our clients </span>
            <span style={{ opacity: 0.8 }}>
              we map out the challenges they face and develop tailor made
              solution using
            </span>
            <span style={{ opacity: 1, fontSize: "1.15em" }}> XR</span>{" "}
            <span style={{ opacity: 0.8 }}>and</span>
            <span style={{ opacity: 1, fontSize: "1.15em" }}> 3D </span>
            <span style={{ opacity: 0.8 }}>
              technology - which creates a whole new and improved visual
              interface platform
            </span>
          </p>
        </div>
      </div>
      <div
        style={{
          width: "60%",
          border: "1px solid black",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      ></div>
      {/* <div
        style={{
          position: "absolute",
          bottom: "-168%",
          left: "2em",
          zIndex: 1,
        }}
      >
        <ContactBtn isFromSelectedCategory />
      </div> */}
    </div>
  );
};

const Bottom = ({
  bottomImageRef,
  bottomTextRef,
  bottomRef,
  bottomImage2Ref,
  displayVideos,
  botVid1,
  botVid2,
}) => (
  <div ref={bottomRef} style={{ height: "100vh", display: "flex" }}>
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "gotham",
          fontSize: "1.3em",
          width: "80%",
          lineHeight: "1.8em",
          borderTop: "5px solid black",
          padding: "40px",
          marginTop: "5em",
        }}
        ref={bottomTextRef}
        className="bottom-text"
      >
        <span style={{ fontSize: "1.15em" }}>3D XR </span>
        <span>
          isn't just an innovative experience. We carefully evaluate each
          solution we offer through business perpectives such as ROI, workplace
          efficiency and simplification of complexed procedures
        </span>
      </div>
    </div>

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginTop: "6em",
        justifyContent: "center",
      }}
    >
      <div
        className="image-container"
        style={{
          marginLeft: "18em",
          transform: "grayscale(100%)",
          height: "100%",
        }}
      >
        <span
          className="large-image-customize sc-image-glass-bg industry-bottom"
          ref={bottomImageRef}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            ref={bottomImageRef}
            src="/assets/images/backgrounds/taasia/Industry_Togle.jpg"
            alt="Large"
            className="bottom-image"
          /> */}
          {displayVideos ? (
            <VideoPlayer
              src="https://in3dwebsite.blob.core.windows.net/video/Kornit Guide (1).mp4"
              startTime={1}
              videoRef={botVid1}
            />
          ) : null}
        </span>
        <span
          className="large-image-customize bottom-industry sc-image-glass-bg bottom-image industry-bottom"
          style={{ marginTop: "2em" }}
          ref={bottomImage2Ref}
          // className="bottom-image"
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/taasia/Industry_Togle.jpg"
            alt="Large"
            className="bottom-image"
            ref={bottomImage2Ref}
          /> */}
          {displayVideos ? (
            // <VideoPlayer src="/assets/images/backgrounds/taasia/AR Factory Real Time Control Panel Data - 2 level.mp4" />

            <VideoPlayer
              src="https://in3dwebsite.blob.core.windows.net/video/Intel Remote Assist and Guides (1).mp4"
              startTime={1}
              videoRef={botVid2}
            />
          ) : null}
        </span>
      </div>
    </div>
    <div
      style={{
        border: "1px solid black",
        position: "absolute",
        bottom: "-195%",
        right: 0,
        width: "60%",
      }}
    ></div>
  </div>
);

// const BottomModel = ({ modelRef }) => (
//   <div style={{ height: "70vh", display: "flex" }}>
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
//             url={"/assets/models/engenir_model.glb"}
//             modelRef={modelRef}
//             position={[0, -3, -3]}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   </div>
// );
