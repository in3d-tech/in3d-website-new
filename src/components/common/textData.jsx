import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
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
  const [textAreaInput, setTextAreaInput] = useState("");
  const [animateItems, setAnimateItems] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let timeoutIds = [];
    if (animateItems) {
      animateItems.forEach((_, index) => {
        timeoutIds.push(
          setTimeout(() => {
            setAnimateItems((prev) => {
              const newItems = [...prev];
              newItems[index] = true;
              return newItems;
            });
          }, (index + 1) * 1000)
        ); // Delay each item by 1s
      });
    }
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [animateItems]);

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

  // export const ContactUsText = ({ test, isFromSelectedCategory }) => {
  //   const [showTextBox, setShowTextBox] = useState(false);
  //   const [showSentStatus, setShowSentStatus] = useState(null);
  //   const [textAreaInput, setTextAreaInput] = useState("");

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
  //           <div>
  //             <span>
  //               <PhoneIcon fontSize="medium" />
  //             </span>
  //             : +972-52-678-7276
  //           </div>
  //           <div>
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

  //           <div style={{ opacity: 0 }}>
  //             <PhoneIcon fontSize="medium" />: +1(302)-219-4023
  //           </div>
  //         </div>

  //         <div style={{ textAlign: "center", fontFamily: "gotham" }}>
  //           Or send us a message:{" "}
  //         </div>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             height: "10em",
  //           }}
  //         >
  //           <textarea style={{ width: "90%" }} />
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <>
      {!test ? null : (
        <div className="contact-us-wrapper">
          {/* <span className="contact-title">Contact us</span> */}
          <div className="contact-details-wrapper">
            <span>Feel free to contact us via:</span>

            <div>
              <div
                style={{
                  marginTop: "0.5em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                  height: "6em",
                }}
              >
                <div>
                  <span>
                    <PhoneIcon fontSize="small" />
                  </span>
                  : +972-52-678-7276
                </div>
                <div>
                  <PhoneIcon fontSize="small" />: +1(302)-219-4023
                </div>
                <div className="flex-center">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <EmailIcon />
                  </div>
                  <div>: sales@in3d-tech.com</div>
                </div>
              </div>
            </div>
            <span style={{ marginTop: "0.6em" }}>
              Or you can send us a message{" "}
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
};
