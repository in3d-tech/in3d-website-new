import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SelectedCategory() {
  const { setSelectedCategory, selectedCategory } = useAppContext();
  const data = getCategoryData({ selectedCategory });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="tester fade-in">
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
            fontSize: "3.5em",
            marginTop: selectedCategory == "about" ? "1em" : "1.5em",
          }}
        >
          {data.title}
        </div>

        {selectedCategory == "contact" ? (
          <ContactUsMobile test={true} />
        ) : (
          <div
            style={{
              fontSize: selectedCategory == "about" ? "0.79em" : "1em",
              width: "90%",
              marginTop: "2em",
              fontFamily: "gotham",
            }}
          >
            {data.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectedCategory;

const getCategoryData = ({ selectedCategory }) => {
  const categoryData = {
    0: {
      title: (
        <>
          Industry <span style={{ color: "#750414" }}>4.0</span>
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      text: "Together with our clients we map out the challenges they face and develop tailor made solutions using XR and 3D technology that creates an innovative visual interface between men and machine.",
    },
    1: {
      title: (
        <>
          <span style={{ color: "#750414" }}>M</span>
          edicine
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
      text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals.",
    },
    2: {
      title: (
        <>
          <span style={{ color: "#750414" }}>M</span>
          icrosoft
        </>
      ),
      bgImage:
        'url("/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg")',
      text: "In3D is the official and the inclusive Mixed Reality (MR) partner of Microsoft Israel",
    },
    3: {
      title: (
        <>
          <span style={{ color: "#750414" }}>S</span>
          ecurity
        </>
      ),
      bgImage:
        'url("/assets/images/backgrounds/security/Security_Togle_Finish2.jpg")',
      text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
    },
    4: {
      title: (
        <>
          <span style={{ color: "#750414" }}>A</span>
          rtifical Intelligence
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg")',
      text: " The combination of a 3D XR software environment with A.I creates not only an advanced and innovative hardware and software operation but a genuine cooperation between man and machine.",
    },
    5: {
      title: (
        <>
          <span style={{ color: "#750414" }}>M</span>
          ilitary
        </>
      ),
      bgImage:
        'url("/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg")',
      text: "We deliver top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications that are now in the service of this significant sector.",
    },
    6: {
      title: (
        <>
          <span style={{ color: "#750414" }}>C</span>
          ustomization
        </>
      ),
      bgImage:
        'url("/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg")',
      text: "As specialists we keep an amazing team of developers, 3D generalists, interface and graphics artists, and product designers just so we can provide our clients with the flexibility and abilities needed to deliver the best product.",
    },
    about: {
      title: (
        <>
          <span style={{ color: "#750414" }}>A</span>
          bout Us
        </>
      ),
      text: (
        <>
          <div style={{ color: "black", textAlign: "center" }}>
            in3D is an Israeli based company with worldwide aspirations. <br />
            <br />
            We develop 3D virtual environment software for different clients
            from different sectors from all around the world We specialize in
            Extended Reality (XR) but first and most we are its believers.{" "}
            <br />
            <br /> WE ARE NOT A START-UP, WE WOULD RATHER START-WORKING WITH
            YOU! We push ourselves hard to be innovative each day, and it has
            required us to trailblaze both our technology and our way,
            designating ourselves to a significant role in the tech industry for
            years to come. <br /> <br />
            in3D is an ISO9001 and ISO27001 certified company. We operate by the
            most demanding requirements so please feel comfortable to choose
            in3D for your next project
          </div>

          <div
            style={{
              color: "black",
              fontSize: "8.3px",
              // width: "80%",
              fontFamily: "gotham",
              display: "flex",
              justifyContent: "center",
              marginTop: "2em",
            }}
          >
            <div style={{ width: "90%", textAlign: "center" }}>
              in3D does not disclose, collect, edit, transfer to a third party
              or use private information of its customers or website users. In
              any case in which in3D is asked to transfer private information,
              it will immediately notify the relevant customer and act under his
              guidance. For any inquiry or request for additional information on
              privacy statements, contact by email: Nathanael@in3D-Tech.com
              <br />
              in3D works according to international quality policies in
              development and production, information security and privacy
              security – ISO9001, ISO27001, ISO27701. The company undertakes and
              complies with legal and privacy requirements, engraves on its
              banner a high standard of service assembly, while maintaining
              accuracy, confidentiality and information security.
              <br />
              If you need more information, contact us at the email listed at
              the above.
            </div>
          </div>
        </>
      ),
    },
    contact: {
      title: (
        <>
          <span style={{ color: "#750414" }}>C</span>
          ontact Us
        </>
      ),
    },
  };

  if (selectedCategory == "about") {
    return categoryData["about"];
  }
  if (selectedCategory == "contact") {
    return categoryData["contact"];
  }

  return categoryData[selectedCategory - 2];
};

function AboutUs() {
  return (
    <div>
      <h2>About Us</h2>
      <div style={{ border: "1px solid red", color: "black" }}>
        in3D is an Israeli based company with worldwide aspirations. <br /> We
        develop 3D virtual environment software for different clients from
        different sectors from all around the world We specialize in Extended
        Reality (XR) but first and most we are its believers. <br /> WE ARE NOT
        A START-UP, WE WOULD RATHER START-WORKING WITH YOU! We push ourselves
        hard to be innovative each day, and it has required us to trailblaze
        both our technology and our way, designating ourselves to a significant
        role in the tech industry for years to come. <br /> in3D is an ISO9001
        and ISO27001 certified company. We operate by the most demanding
        requirements so please feel comfortable to choose in3D for your next
        project
      </div>
    </div>
  );
}

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
                  : +972-54-218-5021
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
