import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
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
import { Model } from "./logic/Model";
import { VideoPlayer } from "../../common/Logo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { MenuAboutContact } from "../../navs/mobile/MenuWheel";

const models = {
  [INDUSTRY]: "/assets/models/engenir_model.glb",
  [MEDICINE]: "/assets/models/medical_model1 (1).glb",
  [MICROSOFT]: "/assets/models/microsoft_model.glb",
  [SECURITY]: "/assets/models/security.glb",
  [AI]: "/assets/models/ai_model.glb",
  [MILITARY]: "/assets/models/military.glb",
  [CUSTOMIZATION]: "/assets/models/costimize_model_v02.glb",
};

function SelectedCategory() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [opacity, setOpacity] = useState(1);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);

      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % industryImages.length);
        setOpacity(1);
      }, 1000); // Match with your CSS transition duration
    }, 4000);

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  const isAboutOrContact =
    selectedCategory === "about" || selectedCategory === "contact";

  return (
    <div className="tester fade-in" style={{}}>
      {/* <div className="tester" style={{ opacity: 0.5 }}> */}
      <div style={{ position: "fixed", top: "1em", left: "1em", zIndex: 3 }}>
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
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "3em",
            marginTop: selectedCategory == "about" ? "1em" : "1.5em",
            textAlign: "center",
            // lineHeight: "1.5em",
            // letterSpacing: "0.2em",
            fontFamily: "gotham",
          }}
        >
          {data?.title}
        </div>
        <div
          style={{
            fontSize: selectedCategory == "about" ? "0.79em" : "1em",
            width: "90%",
            marginTop: "4em",
            fontFamily: "gotham",
            textAlign: "center",
            lineHeight: "1.5em",
            // letterSpacing: "1.1em",
          }}
        >
          {data?.text}
        </div>
        {isAboutOrContact ? null : (
          <div
            style={{
              position: "absolute",
              top: "4em",
              left: 0,
              width: "100vw",
              height: "100vh",
            }}
          >
            <div
              style={{
                height: "50%",
                position: "absolute",
                bottom: "0em",
                width: "100%",
                // backgroundImage:
                //   'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
                zIndex: 0,
                backgroundImage: `url(${industryImages[currentImageIndex]})`,
                transition: "opacity 1s ease-in-out",
                opacity: 1,
                // border: "1px solid red",
                // borderRadius: "20%",
                borderRadius: "12px",
              }}
              className="blurred-bg"
            ></div>
            <Canvas>
              <ambientLight intensity={1} />
              <directionalLight intensity={4} />
              <Camera />
              <Sparkles
                count={300}
                scale={10}
                size={2}
                color="pink" //{getSparkleColour(scrollArea.currentSection)}
              />
              <Suspense fallback={null}>
                {models[selectedCategory] ? (
                  <Model
                    url={models[selectedCategory]} //"/assets/models/engenir_model.glb"
                    modelRef={modelRef}
                    selectedCategory={selectedCategory}
                  />
                ) : null}
              </Suspense>
            </Canvas>
            {data?.text2 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: selectedCategory == "about" ? "0.79em" : "1em",
                      width: "90%",
                      marginTop: "5em",
                      fontFamily: "gotham",
                      textAlign: "center",
                      lineHeight: "1.5em",
                    }}
                  >
                    {data?.text2}
                  </div>
                  <MenuAboutContact isFromSelectedCategory />
                </div>
              </>
            )}
          </div>
        )}

        {selectedCategory == "contact" ? <ContactUsMobile test={true} /> : null}
        <div
          style={{
            marginTop: "12em",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // justifyContent: "space-evenly",
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
              }}
            >
              {data?.text3}
            </div>
          )}
        </div>
        <div style={{ height: "50px" }}></div>
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

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => mixer.clipAction(clip).play());

    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}

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
    "/assets/images/backgrounds/customize/BIM Construction with Hololens.mp4",
    "/assets/images/backgrounds/customize/Package scanning and moving pilot.mp4",
    "/assets/images/backgrounds/customize/Hotze - VR Rakal.mp4",
  ],
};

const IndustryPage = ({ selectedCategory, thumbsSwiper, setThumbsSwiper }) => {
  return (
    <>
      <div
        className="industry-page"
        style={{
          marginTop: "34em",
        }}
      >
        {selectedCategory ? <SwiperComponent /> : null}
      </div>
    </>
  );

  return null;
  const mediaContent = content[selectedCategory];
  if (!selectedCategory || !mediaContent) {
    return null;
  }
  return (
    <div
      className="industry-page"
      style={{
        marginTop: "30em",
      }}
    >
      {mediaContent
        ? mediaContent.map((src, index) => (
            <div
              className="video-wrapper"
              key={index}
              style={{
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <VideoPlayer src={src} videoRef={null} isMobile />
            </div>
          ))
        : null}
    </div>
  );
};

const industryImages = [
  "/assets/images/backgrounds/taasia/industry-large.jpg",
  "/assets/images/backgrounds/taasia/industry-hat.png",
  "https://in3dwebsite.blob.core.windows.net/photos/industry-machine-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
];

// switch (hovered) {
//   case "Customization":
//     // url = "/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg";
//     break;
//   case "Artifical Intelligence":
//     // url = "/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg";
//     break;
//   case "Microsoft":
//     // url = "/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg";
//     break;
//   case "Military":
//     // url = "/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg";
//     break;
//   case "Security":
//     // url = "/assets/images/backgrounds/security/Security_Togle_Finish2.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg";
//     break;
//   case "Industry":
//     // url = "/assets/images/backgrounds/taasia/Industry_Togle.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg";
//     break;
//   case "Medicine":
//     // url = "/assets/images/backgrounds/medicine/Medical_Togle.jpg";
//     url =
//       "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg";
//     break;

const SwiperComponent = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{ border: "1px solid red", width: "300px", height: "400px" }}
      >
        <SwiperSlide>
          {" "}
          <VideoPlayer />
        </SwiperSlide>
        <SwiperSlide>
          <VideoPlayer
            src={"https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
};
