import { Suspense, useEffect, useMemo, useState, useRef, memo } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Camera } from "../../scene/Camera";
// import * as THREE from "three";
// import { Sparkles } from "@react-three/drei";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "../../common/modelData";
import { getCategoryData } from "./logic/getCategoryDetails";
// import { Model } from "./logic/Model";
import { VideoPlayer } from "../../common/Logo";

// import "swiper/css/navigation";
import { MenuAboutContact } from "../../navs/mobile/MenuWheel";
// import zIndex from "@mui/material/styles/zIndex";

// const models = {
//   [INDUSTRY]: "/assets/models/engenir_model.glb",
//   [MEDICINE]: "/assets/models/medical_model1 (1).glb",
//   [MICROSOFT]: "/assets/models/microsoft_model.glb",
//   [SECURITY]: "/assets/models/security.glb",
//   [AI]: "/assets/models/ai_model.glb",
//   [MILITARY]: "/assets/models/military.glb",
//   [CUSTOMIZATION]: "/assets/models/costimize_model_v02.glb",
// };

function SelectedCategory() {
  const { setSelectedCategory, selectedCategory } = useAppContext();
  const data = getCategoryData({ selectedCategory });
  const modelRef = useRef();

  // console.log({ selectedCategory });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  // document.body.style.overflowY = "scroll";

  const isAboutOrContact =
    selectedCategory === "about" || selectedCategory === "contact";

  return (
    <div className="tester fade-in" style={{ border: "1px solid black" }}>
      {/* <div className="tester" style={{ opacity: 0.5 }}> */}
      <div style={{ position: "fixed", top: "1em", left: "1em" }}>
        <ArrowBackIcon
          fontSize="large"
          onClick={() => setSelectedCategory(null)}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // border: "1px solid yellow",
        }}
      >
        <div
          style={{
            fontSize: "3em",
            marginTop: selectedCategory == "about" ? "1em" : "1.5em",
            textAlign: "left",
            // lineHeight: "1.5em",
            // letterSpacing: "0.2em",
            fontFamily: "gotham",
            color: "white",
            width: "70vw",
            alignSelf: "flex-end",
          }}
        >
          {data?.title}
        </div>
        <div
          style={{
            fontSize: selectedCategory == "about" ? "0.79em" : "1em",
            width: "90%",
            marginLeft: "2em",
            marginTop: "3em",
            fontFamily: "gotham",
            textAlign: "left",
            lineHeight: "1.8em",
            color: "rgb(255,255,255)",
            // letterSpacing: "1.1em",
          }}
        >
          {data?.text}
        </div>
        <div
          style={{
            borderTop: "1px solid white",
            width: "70%",
            marginTop: "3em",
          }}
        ></div>

        {data?.text2 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // border: "1px solid green",
              }}
            >
              <div
                style={{
                  fontSize: selectedCategory == "about" ? "0.79em" : "1em",
                  width: "90%",
                  marginTop: "2em",
                  fontFamily: "gotham",
                  textAlign: "center",
                  lineHeight: "1.5em",
                  color: "white",
                }}
              >
                {data?.text2}
              </div>
            </div>
          </>
        )}
        {selectedCategory == "contact" ? <ContactUsMobile test={true} /> : null}
        <div
          style={{
            // marginTop: "12em",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // border: "1px solid black",
            // justifyContent: "center",
          }}
        >
          <IndustryPage
            selectedCategory={selectedCategory}
            // thumbsSwiper={thumbsSwiper}
            // setThumbsSwiper={setThumbsSwiper}
          />
          {data?.text3 && (
            <div
              style={{
                fontSize: selectedCategory == "about" ? "0.79em" : "1em",
                width: "90%",
                marginTop: "3em",
                fontFamily: "gotham",
                textAlign: "center",
                lineHeight: "1.5em",
                color: "white",
              }}
            >
              {data?.text3}
            </div>
          )}
        </div>

        <div style={{ height: "50px" }}></div>
        <MenuAboutContact isFromSelectedCategory />
      </div>
    </div>
  );
}

export default SelectedCategory;

function ContactUsMobile({ test }) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [showSentStatus, setShowSentStatus] = useState(null);
  const [textAreaInput, setTextAreaInput] = useState("");

  useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  const handleSendMessage = (e) => {
    setTimeout(() => {
      setShowTextBox(false);
      setShowSentStatus(true);
      setTextAreaInput("");
    }, 200);

    setTimeout(() => setShowSentStatus(null), 3000);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tv1wlgo",
        "template_evr30vn",
        form.current,
        "HorIaM2iMYpuvqSef"
      )
      .then(
        (result) => {
          // success msg?
        },
        (error) => {
          // error msg?
        }
      );
  };

  return (
    <>
      {!test ? null : (
        <div className="contact-us-wrapper-mobile">
          {/* <span className="contact-title">Contact us</span> */}
          <div className="contact-details-wrapper-mobile">
            <span style={{ color: "black", fontSize: "2em" }}>
              Feel free to contact us via:
            </span>

            <div>
              <div
                style={{
                  marginTop: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                  height: "6em",
                  color: "black",
                  fontSize: "2.5em",
                }}
              >
                <div>
                  <span>
                    <PhoneIcon fontSize="large" />
                  </span>
                  : +972-52-678-7276
                </div>
                <div>
                  <PhoneIcon fontSize="large" />: +1(302)-219-4023
                </div>
                <div className="flex-center">
                  <div
                    style={{
                      display: "flex",
                      marginTop: "0.8em",
                    }}
                  >
                    <EmailIcon fontSize="large" />
                  </div>
                  <div>: sales@in3d-tech.com</div>
                </div>
              </div>
            </div>
            <span
              style={{
                marginTop: "3em",
                color: "black",
                fontSize: "2em",
                alignSelf: "center",
              }}
            >
              Or you can send us a message
              <button
                onClick={toggleTextBox}
                className="contact-us-here-btn"
                style={{
                  textDecoration: "underline",
                  fontWeight: "600",
                  marginLeft: "0.4em",
                }}
              >
                here
              </button>
              {showTextBox && (
                <div
                  style={{
                    marginTop: "1em",
                    display: "flex",
                  }}
                >
                  <form
                    ref={form}
                    onSubmit={sendEmail}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <textarea
                      name="message"
                      placeholder="Type your message here..."
                      type="text"
                      maxLength={300}
                      className="contact-us-text-area"
                      onChange={(e) => {
                        let inputValue = e.target.value;
                        if (inputValue.length > 0) {
                          inputValue =
                            inputValue.charAt(0).toUpperCase() +
                            inputValue.slice(1);
                        }
                        setTextAreaInput(inputValue);
                      }}
                      value={textAreaInput}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="contact-us-send-text-btn"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
              {showSentStatus ? (
                <div
                  style={{
                    marginTop: "4em",
                    animation: "fadeIn 0.8s ease-in-out",
                    fontSize: "0.8em",
                    color: "#6ad5db",
                  }}
                >
                  Sent! Thank you for reaching out!
                </div>
              ) : null}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

// function useGLTFAnimations(scene, animations) {
//   const { invalidate } = useThree();
//   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

//   useEffect(() => {
//     if (!mixer || !animations) return;

//     animations.forEach((clip) => mixer.clipAction(clip).play());

//     const handler = setInterval(() => invalidate(), 1000 / 60);
//     return () => clearInterval(handler);
//   }, [animations, mixer, invalidate]);

//   useFrame((_state, delta) => mixer && mixer.update(delta));

//   return mixer;
// }

const content = {
  [INDUSTRY]: [
    "https://in3dwebsite.blob.core.windows.net/video/ICL",
    "https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4",
  ],
  [MEDICINE]: [
    "https://in3dwebsite.blob.core.windows.net/photos/medical_overlay_1-min.jpg",
    "https://in3dwebsite.blob.core.windows.net/photos/med-overlay-bot-min.jpg",
    "https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4",
  ],
  [MICROSOFT]: [
    "https://in3dwebsite.blob.core.windows.net/photos/microsoft-shake-cutout-min.png",
    "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",
  ],
  [SECURITY]: [
    "https://in3dwebsite.blob.core.windows.net/video/VR - Fire Department - Elevator Simulator (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens-Abach-Treatment-Simulator.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",
  ],
  [AI]: [],
  [MILITARY]: [
    "https://in3dwebsite.blob.core.windows.net/video/Boat 3D Scan.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Truck (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Missile (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",
  ],
  [CUSTOMIZATION]: [
    "/assets/images/backgrounds/customize/Globe 3D Store - 14.10.20.mp4",
    // "https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4",

    "/assets/images/backgrounds/customize/BIM Construction with Hololens.mp4",
    // "https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4",

    "/assets/images/backgrounds/customize/Package scanning and moving pilot.mp4",
    // "https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4",

    "/assets/images/backgrounds/customize/Hotze - VR Rakal.mp4",
    // "https://in3dwebsite.blob.core.windows.net/video/Hotze - VR Rakal.mp4",

    // "https://in3dwebsite.blob.core.windows.net/video/ar real estate.mp4",
  ],
};

const IndustryPage = ({ selectedCategory, thumbsSwiper, setThumbsSwiper }) => {
  console.log("sexy back");
  const mediaContent = useMemo(
    () => content[selectedCategory],
    [selectedCategory]
  );

  return (
    <>
      <div
        className="industry-page"
        style={{ marginTop: "4em", height: "20em", width: "90vw" }}
      >
        {selectedCategory ? <Example items={mediaContent} /> : null}
      </div>
    </>
  );
};

const industryImages = [
  "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4",
  "https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4",
];

const Example = memo(({ items }) => {
  const vidRef = useRef();
  return (
    <Carousel
      indicators={true}
      indicatorContainerProps={{
        style: {
          height: "150px",
          zIndex: 500,
          position: "absolute",
          bottom: "-6em",
          left: 0,
        },
      }}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          border: "5px solid red",
          height: "4em",
          top: "25%",
          opacity: 1,
        },
      }}
      height={"100%"}
      sx={{ width: "100%" }}
    >
      {industryImages.map((item, i) => (
        <Item vidRef={vidRef} key={i} url={item} />
      ))}
    </Carousel>
  );
});

const Item = memo((props) => {
  useEffect(() => console.log("carousel prop"), []);
  return (
    <Paper style={{ height: "80%", border: "1px solid blue" }}>
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
      <div style={{ position: "absolute" }}>
        <VideoPlayer
          src={
            props.url
            // "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4"
          }
          videoRef={props.vidRef}
        />
      </div>

      {/* <img
        src="https://in3dwebsite.blob.core.windows.net/photos/handshake_newer.png"
        style={{ objectFit: "contain", width: "100%" }}
      /> */}
      {/* <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
});
