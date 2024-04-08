import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const IndustryText = ({ textClass, scrollArea, categoriesObj }) => (
  <>
    <div
      className={`fader ${textClass}`}
      style={{
        height: "80vh",
        width: "100%",
        // top: "22%",
        // left: "14%",
        position: "absolute",
        color: "white",
        // fontSize: "3em",
        fontFamily: "gotham",
        display: "flex",
        flexDirection: "column",
        // zIndex: 1,
        // justifyContent: "space-between",
      }}
    >
      {/* <div className="scrolled-category-title industry-title-ani">
      <span className="text-animate button-ani">
        {categoriesObj[scrollArea.currentSection]}
      </span>
    </div> */}

      <div className="title-container" style={{ marginTop: "0.7em" }}>
        <span
          className="scroll-text-animate"
          style={{ borderBottom: "8px solid white" }}
        >
          {categoriesObj[scrollArea.currentSection]}{" "}
          <span style={{ color: "#750414" }}>4.0</span>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          // height: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ flex: 1 }}></div>
        {/* // break */}
        <div
          style={{
            flex: 3,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            className="scrolled-category-text-one"
            style={{ width: "100%", marginTop: 0 }}
          >
            <span
              className="scroll-text-animate-one"
              style={{
                fontSize: "0.7em",
                textAlign: "initial",
                color: "#3abce2",
                fontStyle: "italic",
              }}
            >
              The world was recently introduced to the wonders of the industry
              4.0 revolution.
            </span>
          </div>
          <div className="scrolled-category-text-two">
            <div
              className="industry-text-two-wrapper"
              style={{ width: "40%", marginTop: "4em", marginLeft: "6.5em" }}
            >
              <span className="scroll-text-animate-two">
                Together with our clients we map out the challenges they face
                and develop tailor made solutions using XR and 3D technology
                that creates an innovative visual interface between men and
                machine.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div
      style={{
        position: "absolute",
        zIndex: 2234234234,
        right: "7em",
        bottom: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="testy"
    >
      <span style={{ fontSize: "2em" }}>
        Industry <span style={{ color: "#750414" }}>4.0</span>
      </span>
      <button className="see-more-btn">See More</button>
    </div> */}
  </>
);

export const MedicineText = ({ textClass, scrollArea, categoriesObj }) => (
  <div>
    <div
      className={`fader ${textClass}`}
      style={{
        height: "80vh",
        // top: "16%",
        // left: "9%",
        position: "absolute",
        width: "100vw",
        color: "white",
        // fontSize: "3em",
        fontFamily: "gotham",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "12em",
          textAlign: "center",
        }}
        className="scrolled-category-title ai-title-ani"
      >
        <span style={{ color: "#750414" }}>M</span>
        {categoriesObj[scrollArea.currentSection].substring(1)}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        height: "65%",
        zIndex: 1,
        position: "absolute",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      <div
        className="scrolled-category-text-one-new ai-text-one-ani"
        style={{
          width: "25%",
        }}
      >
        <span style={{ color: "#3abce2", width: "40%" }}>
          The world of medicine is one of the most innovative sectors in the
          world.
        </span>
      </div>
      <div
        className="scrolled-category-text-two ai-text-two-ani"
        style={{
          height: "10%",
          zIndex: 5,
          width: "40%",
          marginLeft: "19em",
          textAlign: "right",
          display: "flex",
        }}
      >
        <span style={{ marginTop: "4em" }}>
          Using Extended Reality (XR) we at in3D became pioneers in development
          of XR products for medical organizations, collaborating together to
          empower innovation and efficiency for clinics and hospitals.
        </span>
      </div>
    </div>

    {/* <div
      style={{
        width: "100vw",
        position: "absolute",
        zIndex: 3,
        bottom: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "2em", color: "white" }}>
        <span style={{ color: "#750414" }}>M</span>edicine
      </span>
      <button className="see-more-btn">See More</button>
    </div> */}
  </div>
);

export const MicrosoftText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "30%",
      left: "14%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      animation: "text-reveal 0.6s ease-in-out forwards",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>
        In3D is the official and the inclusive Mixed Reality (MR) partner of
        Microsoft Israel
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        In3D and Microsoft&#39;s teams share a strong connection and a combined
        vison on the important roles of MR technology.
      </span>
    </div>
  </div>
);

export const SecurityText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      // width: "34%",
      // right: "4%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      // display: "flex",
      // flexDirection: "column",
    }}
  >
    <div
      className="scrolled-category-title security-title-ani"
      style={{
        fontSize: "12em",
        textAlign: "center",
      }}
    >
      <span style={{ color: "#750414" }}>S</span>
      {categoriesObj[scrollArea.currentSection].substring(1)}
    </div>

    <div style={{ display: "flex" }}>
      <div style={{ flex: 1.5 }}></div>
      <div
        style={{ marginTop: "8em", flex: 1 }}
        className="scrolled-category-text-one security-text-ani"
      >
        <span style={{ width: "80%" }}>
          Thanks to years of collaboration with defense industries, we gained
          the needed experience, knowledge and tools to provide quick and out of
          the box solutions that are tailored to the industries unique
          requirements.
        </span>
      </div>
    </div>
    {/* <div
      style={{
        position: "absolute",
        zIndex: 13423,
        left: "7em",
        bottom: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "2em" }}>
        <span style={{ color: "#750414" }}>S</span>ecurity
      </span>
      <button className="see-more-btn">See More</button>
    </div> */}
  </div>
);

export const AiText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "40%",
      top: "14%",
      left: "10%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",\
    }}
  >
    <div className="scrolled-category-title ai-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>

    <div
      style={{ marginTop: "6em" }}
      className="scrolled-category-text-two ai-text-two-ani"
    >
      <span>
        The combination of a 3D XR software environment with A.I creates not
        only an advanced and innovative hardware and software operation but a
        genuine cooperation between man and machine.
      </span>

      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
    <div
      className="scrolled-category-text-one ai-text-one-ani"
      style={{ marginTop: "8em", marginLeft: "18em" }}
    >
      <span>
        E<span className="animated-letter">X</span>hanced{" "}
        <span className="animated-letter">R</span>e
        <span className="animated-letter">A</span>lit
        <span className="animated-letter">i</span>es
        {/* <span className="ai-highlight">X</span>T
        <span className="ai-highlight">R</span>A{" "}
        <span className="ai-highlight">A</span>MAZ
        <span className="ai-highlight">I</span>NG */}
      </span>
    </div>
  </div>
);

export const MilitaryText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "20%",
      right: "9%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title industry-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div
      style={{ marginTop: "5em" }}
      className="scrolled-category-text-one industry-text-one-ani"
    >
      <span>
        Part of our vision is to promote innovation, which is a big part of what
        Israel stands for.
      </span>
    </div>
    <div
      style={{ marginTop: "2em" }}
      className="scrolled-category-text-two industry-text-two-ani"
    >
      <span>
        We succeeded in delivering top-of-the-line technology to all of our
        important industries, through development of complex simulators, XR
        platforms, and tailored applications that are now in the service of this
        significant sector.
      </span>
    </div>
  </div>
);

export const CustomizationText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "100vh",
      // top: "6%",
      // left: "8%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div
      style={{
        textAlign: "center",
        // marginLeft: "10em",
        fontSize: "10em",
      }}
      className="scrolled-category-title security-title-ani"
    >
      <span style={{ color: "#750414" }}>C</span>
      {categoriesObj[scrollArea.currentSection].substring(1)}
    </div>

    <div
      style={{
        height: "100%",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "38%",
          height: "50%",
          marginTop: "10em",
          display: "flex",
        }}
        className="scrolled-category-text-two"
      >
        <span style={{ marginLeft: "9em", fontSize: "1.1em" }}>
          As specialists we keep an amazing team of developers, 3D generalists,
          interface and graphics artists, and product designers just so we can
          provide our clients with the flexibility and abilities needed to
          deliver the best product.
        </span>
      </div>
      <div
        className="scrolled-category-text-one"
        style={{ width: "50%", height: "50%" }}
      >
        <span style={{ marginLeft: "8em", color: "#3abce2" }}>
          We specialize in 3D and Extended Reality (EX).
        </span>
      </div>
    </div>
  </div>
);

export const ContactUsText = ({ test }) => {
  const [showTextBox, setShowTextBox] = useState(false);
  const [showSentStatus, setShowSentStatus] = useState(null);
  const [textAreaInput, setTextAreaInput] = useState("");

  useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  const handleSendMessage = (e) => {
    setTimeout(() => setShowTextBox(false), 200);
    setTimeout(() => setShowSentStatus(true), 200);
    setTimeout(() => setShowSentStatus(null), 3000);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

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
        },
        (error) => {
          // show the user an error
        }
      );
  };

  return (
    <>
      {!test ? null : (
        <div className="contact-us-wrapper">
          {/* <span className="contact-title">Contact us</span> */}
          <div className="contact-details-wrapper">
            <span>Feel free to contact us via:</span>
            <span style={{ marginTop: "0.5em" }}>
              <span>Phone: </span>
              <span>+972-54-218-5021 or +1(302)-219-4023</span>
            </span>

            <span>
              <span>Email: </span>sales@in3d-tech.com
            </span>
            <span style={{ marginTop: "1em" }}>
              We also invite you to meet us at 1 Shefa Tal street, Tel Aviv.
            </span>
            <span style={{ marginTop: "0.6em" }}>
              Or you can message us{" "}
              <button
                onClick={toggleTextBox}
                className="contact-us-here-btn"
                style={{
                  textDecoration: "underline",
                  fontWeight: "600",
                }}
              >
                here
              </button>
              {showTextBox && (
                <div
                  style={{
                    marginTop: "1em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <form ref={form} onSubmit={sendEmail}>
                    <textarea
                      name="message"
                      placeholder="Type your message here..."
                      type="text"
                      maxLength={300}
                      style={{
                        width: "80%",
                        height: "8em",
                        borderRadius: "12px",
                        opacity: "0.8",
                        padding: "15px",
                        fontSize: "1em",
                      }}
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
};
