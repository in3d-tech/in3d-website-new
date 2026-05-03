import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../context/appContext";
// import { SeeMoreBtn } from "./SeeMoreBtn";

export const IndustryText = ({ textClass, scrollArea, categoriesObj }) => (
  <>
    <div
      className={`fader ${textClass}`}
      style={{
        width: "100%",
        position: "absolute",
        color: "white",
        fontFamily: "gotham",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="industy-content-wrapper">
        <div className="title-container">
          <div
            className="industry-title scroll-text-animate"
            style={{
              borderBottom: "8px solid white",
              // fontSize: "1em",
            }}
          >
            {/* {categoriesObj[scrollArea.currentSection]}{" "}
            <span style={{ color: "#750414" }}>4.0</span> */}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            // height: "100%",
            flexDirection: "row-reverse",
            // width: "80%",
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
              style={{ marginTop: 0 }}
            >
              <span
                className="scroll-text-animate-one"
                style={{
                  fontSize: "0.7em",
                  textAlign: "initial",
                  fontStyle: "italic",
                  width: "70%",
                }}
              >
                The world was recently introduced to the wonders of the industry
                4.0 revolution.
              </span>
            </div>
            <div className="scrolled-category-text-two">
              <div className="industry-text-two-wrapper">
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
      {/* <div className="scrolled-category-title industry-title-ani">
      <span className="text-animate button-ani">
        {categoriesObj[scrollArea.currentSection]}
      </span>
    </div> */}
      {/* <SeeMoreBtn /> */}
    </div>
  </>
);

export const MedicineText = ({ textClass, scrollArea, categoriesObj }) => (
  <div>
    <div
      className={`fader ${textClass}`}
      style={{
        position: "absolute",
        width: "100vw",
        color: "white",
        fontFamily: "gotham",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="medicine-title ai-title-ani">
        {/* <span style={{ color: "#750414" }}>M</span>
        {categoriesObj[scrollArea.currentSection].substring(1)} */}
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
    {/* <SeeMoreBtn /> */}
  </div>
);

export const MicrosoftText = ({ textClass, scrollArea, categoriesObj }) => (
  <>
    <div
      className={`fader ${textClass}`}
      style={{
        position: "absolute",
        width: "100vw",
        color: "white",
        fontFamily: "gotham",
        height: "100%",
      }}
    >
      <div className="microsoft-title ai-title-ani">
        {/* <span style={{ color: "#750414" }}>M</span>
        {categoriesObj[scrollArea.currentSection].substring(1)} */}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        height: "100%",
        position: "absolute",
        zIndex: 1,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="scrolled-category-text-one"
      >
        <span style={{ color: "#3abce2", width: "40%" }}>
          in3D is the official and the inclusive Mixed Reality (MR) partner of
          Microsoft Israel
        </span>
      </div>

      <div
        className="scrolled-category-text-two"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="microsoft-text-two-placemenet">
          in3D and Microsoft&#39;s teams share a strong connection and a
          combined vison on the important roles of MR technology.
        </span>
      </div>
    </div>
  </>
);

export const SecurityText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      position: "absolute",
      color: "white",
      fontFamily: "gotham",
    }}
  >
    <div className="security-title security-title-ani">
      <span style={{ opacity: 0 }}>
        <span style={{ color: "#750414" }}>S</span>
        {categoriesObj[scrollArea.currentSection].substring(1)}
      </span>
    </div>

    <div style={{ display: "flex" }}>
      <div style={{ flex: 1.5 }}></div>
      <div
        style={{ marginTop: "-1em", flex: 1 }}
        className="scrolled-category-text-one security-text-ani"
      >
        <span style={{ width: "70%", fontSize: "0.75em", textAlign: "right" }}>
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
      top: "12%",
      left: "10%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      zIndex: -1,
      // justifyContent: "space-between",\
    }}
  >
    <div className="ai-title ai-title-ani">
      <span style={{ opacity: 0 }}>
        <div>
          <span style={{ color: "#750414" }}>A</span>rtificial
        </div>
        <div>
          <span style={{ color: "#750414" }}>I</span>ntelligence
        </div>
      </span>

      {/* {categoriesObj[scrollArea.currentSection].substring(1)} */}
    </div>

    <div className="ai-text-margin-top scrolled-category-text-two ai-text-two-ani">
      <span>
        The combination of a 3D XR software environment with A.I creates not
        only an advanced and innovative hardware and software operation but a
        genuine cooperation between man and machine.
      </span>

      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
    {/* <div
      className="scrolled-category-text-one ai-text-one-ani"
      style={{ marginTop: "8em", marginLeft: "18em" }}
    >
      <span>
        E<span className="animated-letter">X</span>hanced{" "}
        <span className="animated-letter">R</span>e
        <span className="animated-letter">A</span>lit
        <span className="animated-letter">i</span>es
      </span>
    </div> */}
  </div>
);

export const MilitaryText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "50%",
      top: "10%",
      right: "17%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="military-title ai-title-ani">
      <span style={{ opacity: 0 }}>
        <span style={{ color: "#750414" }}>M</span>
        {categoriesObj[scrollArea.currentSection].substring(1)}
      </span>
    </div>

    <div className="military-text-one-wrapper scrolled-category-text-one industry-text-one-ani">
      <span style={{ color: "#3abce2" }}>
        Part of our vision is to promote innovation, which is a big part of what
        Israel stands for.
      </span>
    </div>

    <div className="military-text-two-wrapper scrolled-category-text-two industry-text-two-ani">
      <span className="military-text-two">
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
      width: "100%",
      // top: "6%",
      // left: "8%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      display: "flex",
      // flexDirection: "column",
    }}
  >
    <div style={{ flex: 1, width: "300px" }}></div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          textAlign: "center",
          // marginLeft: "10em",
          fontSize: "calc(4.5vw + 4.5vh + 4.5vmin)",
          // borderBottom: "5px solid white",
        }}
        className="scrolled-category-title security-title-ani"
      >
        <span style={{ opacity: 0 }}>
          <span style={{ color: "#750414" }}>C</span>
          {categoriesObj[scrollArea.currentSection].substring(1)}
        </span>
      </div>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="customization-text-one-spacing scrolled-category-text-two">
          <span style={{ fontSize: "1.1em" }}>
            As specialists we keep an amazing team of developers, 3D
            generalists, interface and graphics artists, and product designers
            just so we can provide our clients with the flexibility and
            abilities needed to deliver the best product.
          </span>
        </div>

        <div
          className="scrolled-category-text-one"
          style={{ width: "50%", height: "50%" }}
        >
          <span style={{ color: "#3abce2", marginLeft: "3em" }}>
            We specialize in 3D and Extended Reality (EX).
          </span>
        </div>
      </div>
    </div>

    <div style={{ flex: 1, width: "300px" }}></div>
  </div>
);

export const ContactUsText = ({ test, isFromSelectedCategory }) => {
  const [showTextBox, setShowTextBox] = useState(false);
  const [showSentStatus, setShowSentStatus] = useState(null);
  // const [textAreaInput, setTextAreaInput] = useState("");
  const [animateItems, setAnimateItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const { setIsCursorHovering } = useAppContext();
  const form = useRef();

  useEffect(() => {
    let timeoutIds = [];
    if (animateItems) {
      animateItems.forEach((_, index) => {
        timeoutIds.push(
          setTimeout(
            () => {
              setAnimateItems((prev) => {
                const newItems = [...prev];
                newItems[index] = true;
                return newItems;
              });
            },
            (index + 1) * 1000,
          ),
        ); // Delay each item by 1s
      });
    }
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [animateItems]);

  useEffect(() => emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_ID), []); // "HorIaM2iMYpuvqSef" replace with your real public key from EmailJS

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  const handleSendMessage = (e) => {
    setTimeout(() => {
      setShowTextBox(false);
      setShowSentStatus(true);
      // setTextAreaInput("");
    }, 200);

    setTimeout(() => setShowSentStatus(null), 3000);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, //"service_tv1wlgo", // "YOUR_SERVICE_ID", // from EmailJS dashboard
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, //"template_evr30vn", //"YOUR_TEMPLATE_ID", // from EmailJS dashboard
        form.current,
        // "HorlaM2iMYpuvqSef", //"YOUR_PUBLIC_KEY", // from EmailJS dashboard
      )
      .then(
        (result) => {
          setShowTextBox(false);
          setShowSentStatus(true);
          // setTextAreaInput("");
          setTimeout(() => setShowSentStatus(null), 3000);
        },
        (error) => {
          console.error("Email failed:", error.text);
          // optionally show an error state to the user
        },
      );
  };

  if (isFromSelectedCategory) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            fontFamily: "gotham",
          }}
        >
          <div
            className={`fade-item fade-item-1 ${
              animateItems[0] ? "active" : ""
            }`}
          >
            <span>
              <PhoneIcon fontSize="medium" />
            </span>
            : +972-52-678-7276
          </div>
          <div
            className={`fade-item fade-item-2 ${
              animateItems[1] ? "active" : ""
            }`}
          >
            <PhoneIcon fontSize="medium" />: +1(302)-219-4023
          </div>
        </div>
        <div
          className="flex-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div
            className={`fade-item fade-item-3 ${
              animateItems[2] ? "active" : ""
            }`}
            style={{
              display: "flex",
              marginTop: "0.6em",
              fontFamily: "gotham",
            }}
          >
            <div>
              <EmailIcon />
            </div>
            <div>: sales@in3d-tech.com</div>
          </div>
          <div
            // className={`fade-item fade-item-4 ${
            //   animateItems[3] ? "active" : ""
            // }`}
            style={{ opacity: 0 }}
          >
            <PhoneIcon fontSize="medium" />: +1(302)-219-4023
          </div>
        </div>

        <div
          style={{ textAlign: "center", fontFamily: "gotham" }}
          className={`fade-item fade-item-4 ${animateItems[3] ? "active" : ""}`}
        >
          Or send us a message:{" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "10em",
          }}
          className={`fade-item fade-item-5 ${animateItems[3] ? "active" : ""}`}
        >
          <textarea style={{ width: "90%" }} />
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{contactCss}</style>
      {!test ? null : (
        <div className="cu-wrapper">
          {/* Eyebrow */}
          <div className="cu-eyebrow">
            <span className="cu-eyebrow-line" />
            <span>Get In Touch</span>
            <span className="cu-eyebrow-dot" />
          </div>

          {/* Oversized stacked headline */}
          <h2 className="cu-headline">
            <span className="cu-hl-word">Let's</span>
            <span className="cu-hl-word cu-hl-outline">Build</span>
            <span className="cu-hl-word">Together</span>
          </h2>

          <div className="cu-rule" />

          {/* Contact channels grid */}
          <div className="cu-channels">
            <div className="cu-channel">
              <p className="cu-channel-label">Israel</p>
              <p className="cu-channel-value">
                <PhoneIcon fontSize="small" /> +972-52-678-7276
              </p>
            </div>
            <div className="cu-channel-divider" />
            <div className="cu-channel">
              <p className="cu-channel-label">United States</p>
              <p className="cu-channel-value">
                <PhoneIcon fontSize="small" /> +1(302)-219-4023
              </p>
            </div>
            <div className="cu-channel-divider" />
            <div className="cu-channel">
              <p className="cu-channel-label">Email</p>
              <p className="cu-channel-value">
                <EmailIcon fontSize="small" /> sales@in3d-tech.com
              </p>
            </div>
          </div>

          {/* Message CTA */}
          <div className="cu-message-cta">
            <button
              onClick={toggleTextBox}
              className="cu-send-btn"
              onMouseOver={() => setIsCursorHovering(true)}
              onMouseOut={() => setIsCursorHovering(false)}
            >
              <span className="cu-send-btn-dot" />
              <span>{showTextBox ? "Close" : "Send us a message"}</span>
              <span className="cu-send-btn-arrow">→</span>
            </button>
          </div>

          {/* Expandable form */}
          {showTextBox && (
            <form ref={form} onSubmit={sendEmail} className="cu-form">
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                // onKeyDown={(e) => {
                //   e.stopPropagation();
                //   e.nativeEvent.stopImmediatePropagation();
                // }}
                maxLength={300}
                className="cu-textarea"
                // onChange={(e) => {
                //   let v = e.target.value;
                //   if (v.length > 0) v = v.charAt(0).toUpperCase() + v.slice(1);
                //   setTextAreaInput(v);
                // }}
                // value={textAreaInput}
              />
              <button
                // onClick={handleSendMessage}
                type="submit"
                className="cu-submit"
                onMouseOver={() => setIsCursorHovering(true)}
                onMouseOut={() => setIsCursorHovering(false)}
              >
                Send →
              </button>
            </form>
          )}

          {showSentStatus && (
            <div className="cu-status">
              <span className="cu-status-dot" /> Message transmitted. We'll be
              in touch.
            </div>
          )}
        </div>
      )}
    </>
  );
};

const contactCss = `
@keyframes cuSliceUp {
  from { opacity: 0; transform: translateY(30px) skewX(-4deg); }
  to   { opacity: 1; transform: translateY(0) skewX(0); }
}
@keyframes cuFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cuGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes cuBlink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.3; }
}

.cu-wrapper {
  max-width: 780px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
  color: #fff;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  position: relative;

  /* Frosted glass panel */
  background: linear-gradient(
    135deg,
    rgba(15, 20, 30, 0.55) 0%,
    rgba(10, 12, 20, 0.4) 100%
  );
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
    top: 20%;
    left: 20%;
}

.cu-wrapper::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 40px; height: 40px;
  pointer-events: none;
}
.cu-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 40px; height: 40px;

  pointer-events: none;
}

.cu-eyebrow {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  font-family: 'swiss-medium', sans-serif;
  opacity: 0; animation: cuFadeUp 0.7s ease forwards;
  margin-bottom: 1rem;
}
.cu-eyebrow-line { width: 28px; height: 1px; background: currentColor; }
.cu-eyebrow-dot { width: 3px; height: 3px; border-radius: 50%; background: #c9a84c; }

.cu-headline {
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  line-height: 0.95;
  margin: 0 0 1.2rem;
  display: flex; flex-wrap: wrap; gap: 0.3em;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
}
.cu-hl-word {
  display: inline-block; opacity: 0;
  animation: cuSliceUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
}
.cu-hl-word:nth-child(1) { animation-delay: 0.15s; }
.cu-hl-word:nth-child(2) { animation-delay: 0.3s; }
.cu-hl-word:nth-child(3) { animation-delay: 0.45s; }
.cu-hl-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.85);
}

.cu-rule {
  width: 64px; height: 2px;
  background: linear-gradient(90deg, #c9a84c 0%, rgba(201,168,76,0.1) 100%);
  transform-origin: left center;
  animation: cuGrow 0.9s ease forwards;
  animation-delay: 0.6s;
  transform: scaleX(0);
  margin-bottom: 1.8rem;
}

.cu-channels {
  display: flex; align-items: stretch;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
  opacity: 0; animation: cuFadeUp 0.8s ease forwards; animation-delay: 0.8s;
  flex-wrap: wrap;
}
.cu-channel {
  flex: 1; min-width: 140px;
  display: flex; flex-direction: column; gap: 0.35rem;
}
.cu-channel-label {
  font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(255,255,255,0.4); margin: 0;
  font-family: 'swiss-medium', sans-serif;
}
.cu-channel-value {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.92); margin: 0;
  display: flex; align-items: center; gap: 0.4rem;
  font-family: 'gotham-old', sans-serif;
}
.cu-channel-divider {
  width: 1px; background: rgba(255,255,255,0.12);
}

.cu-message-cta {
  margin-top: 3.5rem;
  opacity: 0; animation: cuFadeUp 0.8s ease forwards; animation-delay: 1s;
}
.cu-send-btn {
  background: transparent;
  border: 1px solid rgba(201,168,76,0.5);
  border-radius: 100px;
  padding: 0.85em 1.8em;
  color: #fff;
  font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
  font-family: 'swiss-medium', sans-serif;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 0.7rem;
  transition: all 0.35s ease;
  backdrop-filter: blur(10px);
}
.cu-send-btn:hover {
  background: rgba(201,168,76,0.12);
  border-color: #c9a84c;
  transform: translateY(-2px);
}
.cu-send-btn-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #c9a84c;
  animation: cuBlink 2s infinite;
}
.cu-send-btn-arrow {
  transition: transform 0.3s ease;
}
.cu-send-btn:hover .cu-send-btn-arrow { transform: translateX(4px); }

.cu-form {
  margin-top: 1.2rem;
  display: flex; flex-direction: column; gap: 0.8rem;
  animation: cuFadeUp 0.5s ease forwards;
}
.cu-textarea {
  width: 100%;
  min-height: 90px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.15);
  border-left: 2px solid #c9a84c;
  border-radius: 4px;
  padding: 1rem 1.2rem;
  color: #fff;
  font-family: 'gotham-old', sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.cu-textarea:focus {
  background: rgba(255,255,255,0.06);
  border-color: rgba(201,168,76,0.5);
  border-left-color: #c9a84c;
}
.cu-textarea::placeholder {
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.04em;
}
.cu-submit {
  align-self: flex-end;
  background: #c9a84c;
  border: none;
  color: #0d0d0d;
  padding: 0.7em 1.8em;
  font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
  font-family: 'swiss-medium', sans-serif; font-weight: 600;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.cu-submit:hover {
  background: #e0bc5a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201,168,76,0.3);
}

.cu-status {
  margin-top: 1.2rem;
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.78rem;
  color: #6ad5db;
  font-family: 'swiss-medium', sans-serif;
  letter-spacing: 0.05em;
  animation: cuFadeUp 0.6s ease;
}
.cu-status-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #6ad5db;
  box-shadow: 0 0 12px #6ad5db;
  animation: cuBlink 1.5s infinite;
}
`;

// export const ContactUsText = ({ test, isFromSelectedCategory }) => {
//   const [showTextBox, setShowTextBox] = useState(false);
//   const [showSentStatus, setShowSentStatus] = useState(null);
//   const [textAreaInput, setTextAreaInput] = useState("");
//   const [animateItems, setAnimateItems] = useState([
//     false,
//     false,
//     false,
//     false,
//   ]);

//   const { setIsCursorHovering } = useAppContext();

//   useEffect(() => {
//     let timeoutIds = [];
//     if (animateItems) {
//       animateItems.forEach((_, index) => {
//         timeoutIds.push(
//           setTimeout(() => {
//             setAnimateItems((prev) => {
//               const newItems = [...prev];
//               newItems[index] = true;
//               return newItems;
//             });
//           }, (index + 1) * 1000)
//         ); // Delay each item by 1s
//       });
//     }
//     return () => {
//       timeoutIds.forEach(clearTimeout);
//     };
//   }, [animateItems]);

//   useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);

//   const toggleTextBox = () => {
//     setShowTextBox(!showTextBox);
//   };

//   const handleSendMessage = (e) => {
//     setTimeout(() => {
//       setShowTextBox(false);
//       setShowSentStatus(true);
//       setTextAreaInput("");
//     }, 200);

//     setTimeout(() => setShowSentStatus(null), 3000);
//   };

//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault(); // prevents the page from reloading when you hit “Send”

//     emailjs
//       .sendForm(
//         "service_tv1wlgo",
//         "template_evr30vn",
//         form.current,
//         "HorIaM2iMYpuvqSef"
//       )
//       .then(
//         (result) => {
//           // show the user a success message
//         },
//         (error) => {
//           // show the user an error
//         }
//       );
//   };

//   if (isFromSelectedCategory) {
//     return (
//       <div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             fontFamily: "gotham",
//           }}
//         >
//           <div
//             className={`fade-item fade-item-1 ${
//               animateItems[0] ? "active" : ""
//             }`}
//           >
//             <span>
//               <PhoneIcon fontSize="medium" />
//             </span>
//             : +972-52-678-7276
//           </div>
//           <div
//             className={`fade-item fade-item-2 ${
//               animateItems[1] ? "active" : ""
//             }`}
//           >
//             <PhoneIcon fontSize="medium" />: +1(302)-219-4023
//           </div>
//         </div>
//         <div
//           className="flex-center"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-evenly",
//           }}
//         >
//           <div
//             className={`fade-item fade-item-3 ${
//               animateItems[2] ? "active" : ""
//             }`}
//             style={{
//               display: "flex",
//               marginTop: "0.6em",
//               fontFamily: "gotham",
//             }}
//           >
//             <div>
//               <EmailIcon />
//             </div>
//             <div>: sales@in3d-tech.com</div>
//           </div>
//           <div
//             // className={`fade-item fade-item-4 ${
//             //   animateItems[3] ? "active" : ""
//             // }`}
//             style={{ opacity: 0 }}
//           >
//             <PhoneIcon fontSize="medium" />: +1(302)-219-4023
//           </div>
//         </div>

//         <div
//           style={{ textAlign: "center", fontFamily: "gotham" }}
//           className={`fade-item fade-item-4 ${animateItems[3] ? "active" : ""}`}
//         >
//           Or send us a message:{" "}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             height: "10em",
//           }}
//           className={`fade-item fade-item-5 ${animateItems[3] ? "active" : ""}`}
//         >
//           <textarea style={{ width: "90%" }} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {!test ? null : (
//         <div className="contact-us-wrapper">
//           <div className="contact-details-wrapper">
//             <span>Feel free to contact us via:</span>

//             <div>
//               <div
//                 style={{
//                   marginTop: "0.5em",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-evenly",
//                   alignItems: "flex-start",
//                   height: "6em",
//                 }}
//               >
//                 <div>
//                   <span>
//                     <PhoneIcon fontSize="small" />
//                   </span>
//                   : +972-52-678-7276
//                 </div>
//                 <div>
//                   <PhoneIcon fontSize="small" />: +1(302)-219-4023
//                 </div>
//                 <div className="flex-center">
//                   <div
//                     style={{
//                       display: "flex",
//                     }}
//                   >
//                     <EmailIcon />
//                   </div>
//                   <div>: sales@in3d-tech.com</div>
//                 </div>
//               </div>
//             </div>
//             <span style={{ marginTop: "0.6em" }}>
//               Or you can send us a message{" "}
//               <button
//                 onClick={toggleTextBox}
//                 className="contact-us-here-btn"
//                 style={{
//                   textDecoration: "underline",
//                   fontWeight: "600",
//                 }}
//                 onMouseOver={() => setIsCursorHovering(true)}
//                 onMouseOut={() => setIsCursorHovering(false)}
//               >
//                 here
//               </button>
//               {showTextBox && (
//                 <div
//                   style={{
//                     marginTop: "1em",
//                     display: "flex",
//                   }}
//                 >
//                   <form
//                     ref={form}
//                     onSubmit={sendEmail}
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <textarea
//                       name="message"
//                       placeholder="Type your message here..."
//                       type="text"
//                       maxLength={300}
//                       className="contact-us-text-area"
//                       onChange={(e) => {
//                         let inputValue = e.target.value;
//                         if (inputValue.length > 0) {
//                           inputValue =
//                             inputValue.charAt(0).toUpperCase() +
//                             inputValue.slice(1);
//                         }
//                         setTextAreaInput(inputValue);
//                       }}
//                       value={textAreaInput}
//                     />
//                     <button
//                       onClick={handleSendMessage}
//                       className="contact-us-send-text-btn"
//                       onMouseOver={() => setIsCursorHovering(true)}
//                       onMouseOut={() => setIsCursorHovering(false)}
//                     >
//                       Send
//                     </button>
//                   </form>
//                 </div>
//               )}
//               {showSentStatus ? (
//                 <div
//                   style={{
//                     marginTop: "4em",
//                     animation: "fadeIn 0.8s ease-in-out",
//                     fontSize: "0.8em",
//                     color: "#6ad5db",
//                   }}
//                 >
//                   Sent! Thank you for reaching out!
//                 </div>
//               ) : null}
//             </span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
