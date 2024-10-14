import "../selectedCategories.css";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../../common/Logo";
import Tilt from "react-parallax-tilt";
import emailjs from "@emailjs/browser";
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
  const [messageSentSuccessfully, setMessageSentSuccessfully] = useState(false);
  const [isContactMessageBox, setIsContactMessageBox] = useState(false);

  useEffect(() => {
    if (messageSentSuccessfully) {
      setTimeout(() => {
        setMessageSentSuccessfully(false);
      }, 1500);
    }
  }, [messageSentSuccessfully]);

  return (
    <div style={{ display: "flex", height: "100%" }}>
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
          {isContactMessageBox ? (
            <ContactUsMessage
              setIsContactMessageBox={setIsContactMessageBox}
              setMessageSentSuccessfully={setMessageSentSuccessfully}
            />
          ) : (
            <>
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
                    <span style={{ marginLeft: "0.5em" }}>
                      +972-52-678-7276
                    </span>
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
                    <span style={{ marginLeft: "0.5em" }}></span>
                    +1(302)-219-4023
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
                    <span style={{ marginLeft: "0.5em" }}></span>
                    sales@in3d-tech.com{" "}
                  </span>
                  <span />
                </Tilt>
              </div>
              {messageSentSuccessfully ? (
                <div style={{ color: "#750414" }}>Message sent!</div>
              ) : (
                <div className="contact-us-text-wrapper contact-us-line-4">
                  Or you can send us a message{" "}
                  <span
                    onMouseOver={() => setIsCursorHovering(true)}
                    onMouseOut={() => setIsCursorHovering(false)}
                    style={{ borderBottom: "3px solid black" }}
                    onClick={() => {
                      setIsContactMessageBox(!isContactMessageBox);
                      setIsCursorHovering(false);
                    }}
                  >
                    here
                  </span>
                </div>
              )}
            </>
          )}
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

const ContactUsMessage = ({
  setIsContactMessageBox,
  setMessageSentSuccessfully,
}) => {
  useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    console.log(form.current);

    emailjs
      .sendForm(
        "service_tv1wlgo",
        "template_evr30vn",
        form.current,
        "HorIaM2iMYpuvqSef"
      )
      .then(
        (result) => {
          // show the user a success message
          console.log("message sent successfully");
          console.log("Message sent successfully:", result.text);
          setMessageSentSuccessfully(true);
          setTimeout(() => setIsContactMessageBox(false), 200);
        },
        (error) => {
          // show the user an error
          console.log("error sending message: ", error);
        }
      );
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "1em",
          top: "1em",
          animation: "fadeIn 0.6s forwards ease-in-out",
          zIndex: 2,
        }}
        onClick={() => setIsContactMessageBox(false)}
      >
        X
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        style={{
          opacity: 0,
          height: "90%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // opacity: 0.,
          animation: "fadeIn 0.6s forwards ease-in-out",
          animationDelay: "0.4s",
          flexDirection: "column",
        }}
      >
        <textarea
          name="message"
          placeholder="Type your message here..."
          style={{
            width: "86%",
            height: "66%",
            fontSize: "1.2em",
            fontFamily: "sans-serif",
            padding: "12px",
            borderRadius: "12px",
            // opacity: 0.4,
            background: "rgb(255,255,255,0.3)",
          }}
        />
        <div>
          <button type="submit" className="contact-us-send-text-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
