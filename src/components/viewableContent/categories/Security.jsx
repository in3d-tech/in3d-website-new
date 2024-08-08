import { useRef, useEffect, Suspense } from "react";
import { Logo, VideoPlayer } from "../../common/Logo";
import { categoryObserver } from "../../common/categoryObserver";
import { ModelComponent } from "./ModelComponent";
import { Canvas } from "@react-three/fiber";

export function Security() {
  const headline = "Security";
  const bottomImageRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomVideoRef1 = useRef(null);
  const bottomVideoRef2 = useRef(null);

  useEffect(() => {
    const botElement = bottomRef.current;
    const botTextElement = bottomTextRef.current;
    const botImageElement = bottomImageRef.current;

    const observerOptionsBottom = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Trigger when 80% of the middle section is in view
    };

    const bottomObserver = categoryObserver({
      sectionRef: botElement,
      image1Ref: botImageElement,
      textRef: botTextElement,
      observerOptions: observerOptionsBottom,
    });

    return () => {
      if (bottomObserver && botElement) {
        bottomObserver.unobserve(botElement);
      }
    };
  }, []);

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "270vh" }}
    >
      <Logo />
      <Top />
      <Bottom
        bottomImageRef={bottomImageRef}
        bottomTextRef={bottomTextRef}
        bottomRef={bottomRef}
        bottomVideoRef1={bottomVideoRef1}
        bottomVideoRef2={bottomVideoRef2}
      />
      {/* <BottomModel /> */}
    </div>
  );
}

const Top = () => {
  return (
    <div style={{ display: "flex" }}>
      <div className="selected-content-first-divider">
        <div className="sc-content-left-half">
          <div
            style={{
              marginTop: "5em",
              fontSize: "1.5em",
              fontFamily: "gotham",
              // opacity: 0.72,
              width: "70%",
              lineHeight: "1.8em",
            }}
            className="headline-animation"
          >
            In3D has strong relations with the security and defense sector and
            an MOD (Ministry of Defense) official provider. <br /> <br />
            Working directly with many security bodies such as the fire and
            rescue department, Israel Police, IDF and more
          </div>
          <div
            style={{
              fontSize: "5em",
              fontFamily: "gotham-bold",
              width: "80%",
            }}
            className="text-animation"
          >
            <h1
              style={{
                borderTop: "4px solid black",
              }}
            >
              {"Security"}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="selected-content-first-divider"
        style={{ justifyContent: "center" }}
      >
        <ImageOverlay />
      </div>
    </div>
  );
};

const Bottom = ({
  bottomImageRef,
  bottomTextRef,
  bottomRef,
  bottomVideoRef1,
  bottomVideoRef2,
}) => {
  return (
    <div
      className="selected-content-second-divider"
      style={{ display: "flex", height: "100%" }}
      ref={bottomRef}
    >
      <div
        className="left-half-placeholder"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          borderTop: "4px solid black",
          height: "60%",
          marginTop: "12em",
        }}
      >
        <p
          style={{
            width: "50%",
            fontFamily: "gotham",
            fontSize: "1.4em",
            // opacity: 0.7,
            lineHeight: "1.9em",
            marginTop: "4em",
          }}
          ref={bottomTextRef}
          className="bottom-text-security"
        >
          Part of our vision is to promote innovation, which is a big part of
          what Israel stands for. We succeeded in delivering top-of-the-line
          technology to all our of our important industries, through development
          of complex simulators, XR platforms, and tailored applications that
          are now in the service of this significant sector
        </p>
      </div>
      <div
        className="right-half-placeholder bottom-text-security"
        style={{ flex: 1, marginTop: "10em", padding: "2em" }}
        ref={bottomImageRef}
      >
        <ImageOverlay
          isBottom
          bottomVideoRef2={bottomVideoRef2}
          bottomVideoRef1={bottomVideoRef1}
        />
      </div>
    </div>
  );
};

const ImageOverlay = ({ isBottom, bottomVideoRef2, bottomVideoRef1 }) => {
  return (
    <div
      className="sc-right-half"
      style={{
        height: "80%",
        marginTop: "7em",
        alignItems: isBottom ? "flex-start" : "center",
      }}
    >
      <div className="image-container">
        <span
          className="large-image-industry sc-image-glass-bg"
          style={{ height: "22em" }}
        >
          <VideoPlayer
            src={
              isBottom
                ? "https://in3dwebsite.blob.core.windows.net/video/VR - Fire Department - Elevator Simulator (1).mp4"
                : "https://in3dwebsite.blob.core.windows.net/video/Hololens-Abach-Treatment-Simulator.mp4"
            }
          />
        </span>
        <span
          className="small-image-industry top-left-industry sc-image-glass-bg"
          style={{ height: "18em" }}
        >
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4" />
        </span>

        <span className="small-image-industry bottom-left-industry sc-image-glass-bg">
          <VideoPlayer
            src={
              isBottom
                ? "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
                : "https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4"
            }
            videoRef={isBottom ? bottomVideoRef1 : null}
            startTime={isBottom ? 7 : null}
          />
        </span>
        {isBottom ? (
          <span
            className="small-image-industry bottom-right-industry sc-image-glass-bg"
            style={{ left: "9em" }}
          >
            <VideoPlayer
              src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
              videoRef={isBottom ? bottomVideoRef2 : null}
              startTime={isBottom ? 28 : null}
            />
          </span>
        ) : null}
      </div>
    </div>
  );
};

const BottomModel = ({ modelRef }) => (
  <div style={{ height: "70vh", display: "flex" }}>
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
      // style={{ border: "1px solid black", zIndex: 54433 }}
      // camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        {/* <OrbitControls /> */}
        {/* <Stars count={2/000} /> */}
        {/* <Camera /> */}
        <Suspense fallback={null}>
          {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
          <ModelComponent
            url={"/assets/models/security.glb"}
            modelRef={modelRef}
            dontRotate
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            // scale={(10, 10, 10)}
          />
        </Suspense>
      </Canvas>
    </div>
  </div>
);
