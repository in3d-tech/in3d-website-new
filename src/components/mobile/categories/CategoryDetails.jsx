import { useEffect, useMemo, useRef, memo } from "react";

import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Camera } from "../../scene/Camera";
// import * as THREE from "three";
// import { Sparkles } from "@react-three/drei";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import "./styles.css";

import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
  ABOUT_US,
} from "../../common/modelData";
import { getCategoryData } from "../logic/getCategoryDetails";
// import { Model } from "./logic/Model";
import { VideoPlayer } from "../../common/Logo";

// import "swiper/css/navigation";
import { MenuAboutContact } from "../nav/MenuWheel";
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
  // const modelRef = useRef();

  // console.log({ selectedCategory });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  // document.body.style.overflowY = "scroll";

  // const isAboutOrContact =
  //   selectedCategory === "about" || selectedCategory === "contact";
  return (
    <div className="tester fade-in" style={{ border: "1px solid black" }}>
      {/* <div className="tester" style={{ opacity: 0.5 }}> */}
      <div style={{ position: "fixed", top: "1em", left: "1em" }}>
        <ArrowBackIcon
          fontSize="large"
          sx={{ color: "black" }}
          onClick={() => setSelectedCategory(null)}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "3em",
            marginTop: selectedCategory == "about" ? "1em" : "1.5em",
            textAlign: "left",
            fontFamily: "gotham",
            color: "black",
            width: selectedCategory == CUSTOMIZATION ? "84vw" : "70vw",
            alignSelf: "flex-end",
          }}
        >
          {data?.title}
        </div>
        <div
          style={{
            fontSize: selectedCategory == "about" ? "0.79em" : "1em",
            width: "88%",
            marginLeft: "2em",
            marginTop: "3em",
            fontFamily: "gotham",
            textAlign: "left",
            lineHeight: "1.8em",
            color: "black",
          }}
          className="medicine-text-one-mobile"
        >
          {data?.text}
        </div>
        <div
          className="medicine-second-underline-mobile"
          style={{
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
              }}
            >
              <div
                style={{
                  fontSize: selectedCategory == "about" ? "0.79em" : "1em",
                  width: "90%",
                  marginTop: "2em",
                  fontFamily: "gotham",
                  textAlign: "right",
                  lineHeight: "1.5em",
                  color: "black",
                }}
                className="medicine-text-two-mobile"
              >
                {data?.text2}
              </div>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {selectedCategory == AI ||
          selectedCategory == "contact" ||
          selectedCategory == ABOUT_US ? null : (
            <MediaContent
              selectedCategory={selectedCategory}
              // thumbsSwiper={thumbsSwiper}
              // setThumbsSwiper={setThumbsSwiper}
            />
          )}
          {data?.text3 && (
            <div
              style={{
                fontSize: selectedCategory == "about" ? "0.79em" : "1em",
                width: "90%",
                marginTop: "1em",
                fontFamily: "gotham",
                textAlign: "left",
                lineHeight: "1.5em",
                color: "black",
              }}
            >
              {data?.text3}
            </div>
          )}
        </div>

        <div style={{ height: "50px" }}></div>
        {selectedCategory == "contact" ? null : (
          <MenuAboutContact isFromSelectedCategory />
        )}
      </div>
    </div>
  );
}

export default SelectedCategory;

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
  [ABOUT_US]: [
    "url(https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png)",
    "https://in3dwebsite.blob.core.windows.net/photos/about-2-min.png",
    "https://in3dwebsite.blob.core.windows.net/photos/about-3-min.png",
    "https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png",
  ],
};

const MediaContent = ({ selectedCategory, thumbsSwiper, setThumbsSwiper }) => {
  // if (selectedCategory == "contact") {
  //   return null;
  // }
  const mediaContent = useMemo(
    () => content[selectedCategory],
    [selectedCategory]
  );

  const media = getCategoryMediaUrls({ selectedCategory });

  return (
    <>
      <div
        className="industry-page"
        style={{
          marginTop: "4em",
          height: "20em",
          width: "90vw",
          borderRadius: "12px",
          zIndex: selectedCategory == "contact" ? -1 : "",
        }}
      >
        {selectedCategory ? (
          <MediaCarousel selectedCategory={selectedCategory} media={media} />
        ) : null}
      </div>
    </>
  );
};

const MediaCarousel = memo(({ media, selectedCategory }) => {
  const vidRef = useRef();
  // console.log({ media });
  return (
    <Carousel
      indicators={true}
      autoPlay={false}
      index={0}
      navButtonsAlwaysVisible
      indicatorContainerProps={{
        style: {
          height: "120px",
          zIndex: 500,
          position: "absolute",
          bottom: "-5em",
          left: 0,
        },
      }}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          // border: "5px solid red",
          height: "5em",
          top: "40%",
          opacity: 1,
        },
      }}
      height={"300px"}
      sx={{ width: "100%" }}
    >
      {media.length
        ? media.map((item, i) => (
            <Item
              selectedCategory={selectedCategory}
              vidRef={vidRef}
              key={i}
              url={item}
              startTime={2}
              itemIndex={i}
            />
          ))
        : null}
    </Carousel>
  );
});

const Item = memo((props) => {
  // useEffect(() => console.log("carousel prop"), []);
  return (
    <Paper
      style={{ height: "100px", borderRadius: "12px", background: "none" }}
    >
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
      <div
        style={{
          position: "absolute",
          borderRadius: "12px",
          width: "100%",
          height: "100%",
        }}
      >
        {props.selectedCategory == 10 ? (
          <ImgCarousel url={props.url} />
        ) : (
          <VideoPlayer
            src={
              props.url
              // "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4"
            }
            videoRef={props.vidRef}
            startTime={2}
            isMobile
            selectedCategory={props.selectedCategory}
            itemIndex={props.itemIndex}
          />
        )}
      </div>

      {/* <img
        src="https://in3dwebsite.blob.core.windows.net/photos/handshake_newer.png"
        style={{ objectFit: "contain", width: "100%" }}
      /> */}
      {/* <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
});

const getCategoryMediaUrls = ({ selectedCategory }) => {
  const content = {
    [INDUSTRY]: [
      "https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4",
    ],
    [MEDICINE]: [
      "https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4",
      "https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4",
    ],
    [MICROSOFT]: [
      "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",

      // "https://in3dwebsite.blob.core.windows.net/photos/microsoft-shake-cutout-min.png",
      "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4",
      "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4",
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
      "https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4",
      "https://in3dwebsite.blob.core.windows.net/video/Hotze - VR Rakal.mp4",
    ],
    [ABOUT_US]: [
      // "https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png",
      // "https://in3dwebsite.blob.core.windows.net/photos/about-2-min.png",
      "https://in3dwebsite.blob.core.windows.net/photos/about-3-min.png",
      "https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png",
    ],
  };
  const categoryMedia = content[selectedCategory] || [];
  return categoryMedia;
};

const ImgCarousel = ({ url }) => {
  return <img src={url} style={{ width: "100%", height: "100%" }} />;
};
