import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export function ContactUsMobile({ test }) {
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
      <div className="contact-us-wrapper-mobile">
        <div className="contact-details-wrapper-mobile">
          <div>
            <div
              style={{
                marginTop: "0.5em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                height: "6em",
                color: "white",
                fontSize: "2.5em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhoneIcon fontSize="medium" sx={{ color: "white" }} />:
                <a style={{ all: "unset" }} href="+972526787276">
                  <span style={{ marginLeft: "5px" }}>+972-52-678-7276</span>
                </a>
              </div>
              <div style={{ marginTop: "1em" }}>
                <PhoneIcon fontSize="medium" sx={{ color: "white" }} />:
                <a style={{ all: "unset" }} href="+13022194023">
                  {" "}
                  +1(302)-219-4023
                </a>
              </div>
              <div className="flex-center" style={{ marginTop: "1em" }}>
                <EmailIcon sx={{ color: "white" }} fontSize="medium" />
                <div>: sales@in3d-tech.com</div>
              </div>
            </div>
          </div>
          <span
            style={{
              marginTop: "3em",
              color: "white",
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
    </>
  );
}
