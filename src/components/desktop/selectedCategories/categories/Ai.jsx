import { Logo } from "../../../common/Logo";

export function Ai() {
  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "100vh" }}
    >
      <Logo />
      <Top />
    </div>
  );
}

const Top = () => {
  return (
    <div className="ai-wrapper">
      <div style={{ height: "40%", marginTop: "6em" }}>
        <div className="ai-title-container">
          <h1
            style={{
              fontSize: "5em",
              fontFamily: "gotham",
              animationDelay: "0.8s",
              zIndex: 1,
              // textAlign: "right",
            }}
            className="contact-us-text-wrapper"
          >
            Artificial <br /> Intelligence
          </h1>
        </div>
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            animationDelay: "1.4s",
          }}
          className="contact-us-text-wrapper ai-text-one"
        >
          Navigate through our virtual environments with ease, <br />
          blending with real-world operations for intuitive control <br /> and
          system management. Additionally, harness the <br />
          potential of AI for virtual collaboration, granting <br />
          operators fuller control over both software and <br />
          hardware, paving the way for a future where innovation <br />
          feels closer than ever before.
        </div>
      </div>

      <div className="ai-main-img">
        <img
          src="https://in3dwebsite.blob.core.windows.net/photos/ai-2-min.png"
          alt="right-eye"
          className="ai-eye-image"
        />
        {/* <img src="/assets/images/overlay-images/ai-1.png" st /> */}
      </div>
    </div>
  );
};
