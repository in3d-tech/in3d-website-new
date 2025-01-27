import { useRef, useEffect, useState } from "react";
import { Logo, VideoPlayer } from "../../../common/Logo";
import { categoryObserver } from "../../../common/categoryObserver";
// import { ModelComponent } from "./ModelComponent";
// import { Canvas } from "@react-three/fiber";

export function Security() {
  const headline = "Security";
  const bottomImageRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomVideoRef1 = useRef(null);
  const bottomVideoRef2 = useRef(null);

  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const botElement = bottomRef.current;
    const botTextElement = bottomTextRef.current;
    const botImageElement = bottomImageRef.current;

    const observerOptionsBottom = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 80% of the middle section is in view
    };

    const bottomObserver = categoryObserver({
      sectionRef: botElement,
      image1Ref: botImageElement,
      textRef: botTextElement,
      observerOptions: observerOptionsBottom,
      setShowBottom,
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
      style={{ height: "200vh" }}
    >
      <Logo />
      <Top />
      <Bottom
        bottomImageRef={bottomImageRef}
        bottomTextRef={bottomTextRef}
        bottomRef={bottomRef}
        bottomVideoRef1={bottomVideoRef1}
        bottomVideoRef2={bottomVideoRef2}
        showBottom={showBottom}
      />
      {/* <BottomModel /> */}
    </div>
  );
}

const Top = () => {
  return (
    <div style={{ display: "flex" }}>
      <div className="selected-content-first-divider-security">
        <div className="sc-content-left-half">
          <div className="security-font-one security-txt-one-fade-in">
            In3D has strong relations with the security and defense sector and
            an MOD (Ministry of Defense) official provider. <br /> <br />
            Working directly with many security bodies such as the fire and
            rescue department, Israel Police, IDF and more
          </div>
          <div className="no-opacity text-animation security-headline">
            <h1
              // style={{
              //   borderTop: "4px solid black",
              // }}
              className="headline-animation-security"
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
  showBottom,
}) => {
  return (
    <div
      className="selected-content-second-divider"
      style={{ display: "flex", height: "100%" }}
      ref={bottomRef}
    >
      <div
        className={`left-half-placeholder ${
          showBottom ? "border-top-animation" : ""
        }`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          // borderTop: "4px solid black",
          height: "60%",
          marginTop: "12em",
        }}
      >
        <p
          ref={bottomTextRef}
          className="bottom-text-security security-font-two"
          // style={{ opacity: 0.7 }}
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
        style={{
          flex: 1,
          marginTop: "10em",
          padding: "2em",
        }}
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
        height: "86%",
        marginTop: "4em",
        alignItems: isBottom ? "center" : "center",
      }}
    >
      <div
        className="image-container"
        style={isBottom ? { marginBottom: "3em" } : {}}
      >
        <span
          className={`large-image-industry sc-image-glass-bg ${
            isBottom ? "security-vid-one-bottom" : "security-vid-one-top"
          }`}
          style={{ height: isBottom ? "15em" : "18em" }}
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
          className="small-image-industry top-left-industry sc-image-glass-bg security-top-vid"
          style={
            isBottom
              ? { height: "12em", top: "-4em", left: "-4em" }
              : { top: "-4em", left: "-7em" }
          }
        >
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4" />
        </span>

        <span
          className="small-image-industry bottom-left-industry sc-image-glass-bg"
          style={
            isBottom
              ? { marginLeft: "-5em", marginBottom: "-1em" }
              : { marginBottom: "-1em", left: "-7em" }
          }
        >
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
            style={{ left: "20em", bottom: "-2em", height: "12em" }}
          >
            <VideoPlayer
              src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
              videoRef={isBottom ? bottomVideoRef2 : null}
              startTime={isBottom ? 2 : null}
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
      {/* <Canvas

      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 10, 0]} intensity={1} />

        <Suspense fallback={null}> */}
      {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
      {/* <ModelComponent
            url={"/assets/models/security.glb"}
            modelRef={modelRef}
            dontRotate
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            // scale={(10, 10, 10)}
          />
        </Suspense>
      </Canvas> */}
    </div>
  </div>
);
