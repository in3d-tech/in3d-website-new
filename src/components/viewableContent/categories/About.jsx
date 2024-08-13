import "../selectedCategories.css";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../../common/Logo";

export function About() {
  const topImageRef = useRef();
  const midOneTextOne = useRef();
  const midOneTextTwo = useRef();
  const midOneTextThree = useRef();
  const midOneImageRef = useRef();
  const midTwoRef = useRef();
  const midTwoImageRef = useRef();
  const midTwoTextOneRef = useRef();
  const bottomImageRef = useRef();
  const bottomTextContainerRef = useRef();
  const bottomTextRef = useRef();

  const [isTwoOneTextInView, setIsTwoOneTextInView] = useState(false);

  useEffect(() => {
    const botElement = midOneImageRef.current;
    const ele = midOneTextOne.current;
    const midTxtTwo = midOneTextTwo.current;
    const midTwo = midTwoImageRef.current;
    const bottomRef = bottomImageRef.current;
    const bottomTextContainer = bottomTextContainerRef.current;
    const bottomText = bottomTextRef.current;
    const midTwoTxtOne = midTwoTextOneRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 80% of the middle section is in view
    };

    const observerOptionsTwo = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 80% of the middle section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          botElement.classList.add("animated-img");
          setIsTwoOneTextInView(true);
          // midTxtTwo.classList.add("border-right-animation-container");
        } else {
          //   botElement.classList.remove("scrolled");
        }
      });
    }, observerOptions);

    const observerTwo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          midTxtTwo.classList.add("border-right-animation-container");
        } else {
          //   botElement.classList.remove("scrolled");
        }
      });
    }, observerOptionsTwo);

    const midTwoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          midTwo.classList.add("fade-in");
          midTwoTxtOne.classList.add("border-left-animation");
        }
      });
    }, observerOptions);

    const bottomObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bottomRef.classList.add("fade-in");
        }
      });
    }, observerOptions);

    const bottomTextContainerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bottomTextContainer.classList.add(
            "border-bottom-animation-container"
          );
          bottomText.classList.add("contact-us-text-wrapper");
          bottomText.classList.add("contact-us-line-0");
        }
      });
    }, observerOptions);

    // const bottomTextObserver = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       console.log("bottom text is in sight");
    //       bottomText.classList.add("contact-us-text-wrapper contact-us-line-0");
    //     }
    //   });
    // }, observerOptions);

    if (botElement) {
      observer.observe(botElement);
    }

    if (midTxtTwo) {
      observerTwo.observe(midTxtTwo);
    }

    if (midTwo) {
      midTwoObserver.observe(midTwo);
    }

    if (bottomRef) {
      bottomObserver.observe(bottomRef);
    }

    if (bottomTextContainer) {
      bottomTextContainerObserver.observe(bottomTextContainer);
    }

    // if (bottomTextContainer) {
    //   bottomTextObserver.observe(bottomTextContainer);
    // }

    return () => {
      if (botElement) {
        observer.unobserve(botElement);
      }
      if (midTxtTwo) {
        observerTwo.unobserve(midTxtTwo);
      }
      if (midTwo) {
        midTwoObserver.unobserve(midTwo);
      }
      if (bottomRef) {
        bottomObserver.unobserve(bottomRef);
      }
      if (bottomTextContainer) {
        bottomTextContainerObserver.unobserve(bottomTextContainer);
      }
    };
  }, []);

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "400vh" }}
    >
      <Logo />
      <Top />
      <Middle
        midOneImageRef={midOneImageRef}
        midOneTextOne={midOneTextOne}
        isTwoOneTextInView={isTwoOneTextInView}
        midOneTextTwo={midOneTextTwo}
      />
      <MiddleTwo
        midTwoImageRef={midTwoImageRef}
        midTwoRef={midTwoRef}
        midTwoTextOneRef={midTwoTextOneRef}
      />
      <Bottom
        bottomRef={bottomImageRef}
        bottomTextContainerRef={bottomTextContainerRef}
        bottomTextRef={bottomTextRef}
      />
    </div>
  );
}

const Top = () => (
  <div>
    {/* <h1>About Us</h1> */}
    <div
      style={{
        height: "100vh",
        background:
          "url(https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png)",
        // "url(https://in3dwebsite.blob.core.windows.net/photos/about_P1-min.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition: "",
      }}
    >
      <div className="about-us-title-container">
        <span className="contact-us-text-wrapper contact-us-line-0 contact-header">
          Who We Are
        </span>
      </div>
      {/* <img
        src="/assets/images/overlay-images/about_P1.png"
        style={{ width: "100%", border: "1px solid green" }}
      /> */}
    </div>
    <div className="in3d-description-container">
      <div
        className="contact-us-text-wrapper contact-us-line-0 contact-text-one"
        style={{ animationDelay: "1s" }}
      >
        In3D is an Israeli Software house with ambitions to become a software
        house without borders
      </div>
    </div>
  </div>
);

const Middle = ({
  midOneImageRef,
  midOneTextOne,
  isTwoOneTextInView,
  midOneTextTwo,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        // alignItems: "space-between",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div
        // style={{
        //   borderBottom: "3px solid black",
        //   width: "88%",
        //   marginTop: "7em",
        //   padding: "8px",
        // }}
        // className="about-us-two-title"
        // className="border-animation-container"
        className={
          isTwoOneTextInView ? "border-animation-container" : "no-opacity"
        }
      >
        <div
          // ref={midOneTextOne}
          style={{
            fontSize: "1.4em",
            fontFamily: "gotham",
            color: "rgb(0,0,0,0.8)",
          }}
          className={
            isTwoOneTextInView
              ? "contact-us-text-wrapper contact-us-line-0"
              : "no-opacity"
          }
        >
          We develop 3D virtual environments <br />{" "}
          <div style={{ marginTop: "0.5em" }}>
            for different business sectors in Israel and all over the world
          </div>
        </div>
      </div>

      <div className="no-opacity about-text-three" ref={midOneTextTwo}>
        <div
          style={{ marginTop: "2em", textAlign: "right", marginRight: "2em" }}
        >
          WE SPECIALIZE IN MIXED REALITY (XR)
        </div>
        <div style={{ marginTop: "3em", marginRight: "5em" }}>
          But first and foremost, we are firm believers in it.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "10%",
          height: "100%",
          zIndex: -1,
          transform: "scaleX(-1)",
          opacity: isTwoOneTextInView ? 1 : 0,
        }}
      >
        <img
          ref={midOneImageRef}
          className="about-us-mid-one-image"
          src="https://in3dwebsite.blob.core.windows.net/photos/about-2-min.png"
          style={
            {
              //   width: "100%",
              //   height: "100%",
              //   border: "4px solid red",
            }
          }
        />
      </div>
    </div>
  );
};

const MiddleTwo = ({ midTwoImageRef, midTwoTextOneRef }) => {
  return (
    <div
      ref={midTwoImageRef}
      style={{
        background:
          "url(https://in3dwebsite.blob.core.windows.net/photos/about-3-min.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="no-opacity"
    >
      <div
        className="about-overlay"
        style={{
          position: "absolute",
          left: "13%",
          top: "10%",
          width: "82%",
          height: "90%",
          // backgroundColor: "white",
          transform: "skew(-61deg)",
          mixBlendMode: "difference",
          pointerEvents: "none",
          // opacity: 0,
          zIndex: 2,
        }}
      ></div>
      <div style={{ height: "42%" }}>
        <div
          ref={midTwoTextOneRef}
          className="" //"border-left-animation"
          style={{ fontFamily: "gotham", fontSize: "1.4em" }}
        >
          <p
            style={{
              marginLeft: "1em",
              animation: "fadeIn 2s ease-in-out",
              animationDelay: "1s",
            }}
          >
            We are not a startup, <br />
            we are ready to start working with you! <br /> We push ourselves to
            continue <br /> to be called innovative every day, <br /> this
            requires us to break our way <br />
            and the way of our technology{" "}
          </p>
        </div>
      </div>
      <div
        style={{
          fontFamily: "gotham",
          fontSize: "1.4em",

          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "8px",
        }}
      >
        <div style={{ marginBottom: "1em", textAlign: "right" }}>
          Our mission is to play an important <br />
          role in the technology market for <br /> many years to come
        </div>
      </div>
    </div>
  );
};

const Bottom = ({ bottomRef, bottomTextContainerRef, bottomTextRef }) => {
  return (
    <div
      ref={bottomRef}
      className="about-bottom-wrapper no-opacity"
      style={{
        background:
          "url(https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div
        ref={bottomTextContainerRef}
        className="about-us-text-bottom-container"
        // className="border-bottom-animation-container"
      >
        <div ref={bottomTextRef} className="no-opacity about-us-bottom-text">
          <span>in3D has ISO9001 quality standards</span>
          <br />
          <span>and ISO27001 information secuity</span>
          <br />
          <span>
            and provides its services under the strictest standard definitions
          </span>
          <br />
          <span>
            {" "}
            and for well-known and large businesses and organizations,
          </span>
          <br />
          <span>so please feel free to choose us for your next project</span>
          <br />
        </div>
      </div>
    </div>
  );
};

{
  /* <div>
  <div
    style={{
      position: "absolute",
      left: "25%",
      top: "5%",
      width: "8em",
      height: "5em",
    }}
  ></div>
  <div>
    This is the best text in the world <br /> I love this text <br /> wouldn't
    any real person want to recieve an awesome text just like this one? <br />
  </div>
  <div>
    {" "}
    This is the worst text in the world <br /> I hate this text <br /> wouldn't
    any real person not want to recieve an awesome text just like this one?{" "}
    <br />
  </div>
</div>; */
}
