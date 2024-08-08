import "../selectedCategories.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { ContactBtn, Logo } from "../../common/Logo";
import Tilt from "react-parallax-tilt";
import { useAppContext } from "../../../context/appContext";

export function Contact({ selectedCategory }) {
  const { setIsCursorHovering } = useAppContext();

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "100vh" }}
    >
      <Logo />
      <Top setIsCursorHovering={setIsCursorHovering} />
    </div>
  );
}
const Top = ({ setIsCursorHovering }) => {
  const [isBorderFull, setIsBorderFull] = useState(false);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* <div
        style={{
          flex: 1.1,

          border: "10px solid red",
        }}
      > */}
      {/* <img
          src="/assets/images/overlay-images/astronaut6.png"
          style={{ width: "100%", marginTop: "10em" }}
        /> */}
      {/* </div> */}
      <AnimatedDiv />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="contact-us-header-font contact-us-text-wrapper contact-us-line-0"
          // style={{ fontSize: "2.5em" }}
        >
          Feel free to contact us via:
        </div>
        <div className="contant-us-text contact-us-borders">
          <div className="contact-us-alignment contact-us-text-wrapper contact-us-line-1">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
            >
              <span className="contact-us-alignment">
                <img
                  src="https://in3dwebsite.blob.core.windows.net/photos/telefon-min.png"
                  style={{ width: "1.4em" }}
                />
                <span style={{ marginLeft: "0.5em" }}>+972-52-678-7276</span>
              </span>
            </Tilt>
          </div>
          <div className="contact-us-alignment contact-us-text-wrapper contact-us-line-2">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
            >
              <span className="contact-us-alignment">
                <img
                  src="https://in3dwebsite.blob.core.windows.net/photos/telefon-min.png"
                  style={{ width: "1.4em" }}
                />
                <span style={{ marginLeft: "0.5em" }}></span>+1(302)-219-4023
              </span>{" "}
              <span />
            </Tilt>
          </div>
          <div className="contact-us-alignment contact-us-text-wrapper contact-us-line-3">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              glareBorderRadius="20px"
            >
              <span className="contact-us-alignment">
                <img
                  src="https://in3dwebsite.blob.core.windows.net/photos/mail-min.png"
                  style={{ width: "1.4em" }}
                />
                <span style={{ marginLeft: "0.5em" }}></span>sales@in3d-tech.com{" "}
              </span>
              <span />
            </Tilt>
          </div>
          <div className="contact-us-text-wrapper contact-us-line-4">
            Or you can send us a message{" "}
            <span
              onMouseOver={() => setIsCursorHovering(true)}
              onMouseOut={() => setIsCursorHovering(false)}
              style={{ borderBottom: "3px solid black" }}
              onClick={() => setIsBorderFull(!isBorderFull)}
              className={`contact-border-transition ${
                isBorderFull ? "contact-full-border" : ""
              }`}
            >
              here
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          color: "black",
          position: "absolute",
          fontSize: "0.65em",
          width: "100%",
          fontFamily: "gotham",
          bottom: "1em",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="in3d-contact-disclaimer">
          in3D does not disclose, collect, edit, transfer to a third party or
          use private information of its customers or website users. In any case
          in which in3D is asked to transfer private information, it will
          immediately notify the relevant customer and act under his guidance.
          For any inquiry or request for additional information on privacy
          statements, contact by email: Nathanael@in3D-Tech.com
          <br />
          in3D works according to international quality policies in development
          and production, information security and privacy security – ISO9001,
          ISO27001, ISO27701. The company undertakes and complies with legal and
          privacy requirements, engraves on its banner a high standard of
          service assembly, while maintaining accuracy, confidentiality and
          information security.
          <br />
          If you need more information, contact us at the email listed at the
          above.
        </div>
      </div>
    </div>
  );
};

const AnimatedDiv = () => {
  return (
    <div
      style={{
        flex: 1.1,
      }}
    >
      <img
        src="https://in3dwebsite.blob.core.windows.net/photos/astronaut6-min.png"
        className="animated-img"
        style={{ width: "100%", marginTop: "10em" }}
        alt="astronaut"
      />
    </div>
  );
};
