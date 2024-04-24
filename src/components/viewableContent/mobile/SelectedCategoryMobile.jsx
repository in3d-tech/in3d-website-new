import { useEffect } from "react";
import { gsap } from "gsap";

function SelectedCategoryMobile({ titleKey, astroRef, setMobileBackground }) {
  useEffect(() => {
    if (astroRef.current) {
      console.log("in leat onse");
      let timeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".industry-test",
          start: "top bottom",
          endTrigger: ".medical-test",
          end: "top bottom",
          scrub: 1,
          // fastScrollEnd: true, // 2250,
          markers: true,
          onEnter: () => {
            console.log("entered medicla section on mobile");
            setMobileBackground([2]);
          },
          onLeaveBack: () => {
            console.log("left back babby");
            setMobileBackground([1]);
          },
          onEnterBack: () => setMobileBackground([2]),
        },
      });

      timeline
        .to(
          astroRef.current.position,
          { z: -1, x: -3, y: -7.5 },
          "simultaneously"
        )
        .to(
          astroRef.current.rotation,
          { x: 0.1, y: Math.PI - 0.6 },
          "simultaneously"
        );

      let medicalTimeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".medical-test",
          start: "center bottom",
          endTrigger: ".micro-test",
          end: "top center",
          scrub: 1,
          // fastScrollEnd: true, // 2250,
          // markers: true,
          onEnter: () => {
            setMobileBackground([3]);
          },
        },
      });

      // medicalTimeline.to(
      //   astroRef.current.position,
      //   { y: -4 },
      //   "simultaneously"
      // );

      let securityTimeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".security-test",
          start: "center bottom",
          endTrigger: ".ai-test",
          end: "top center",
          scrub: 1,
          // fastScrollEnd: true, // 2250,
          // markers: true,
          onEnter: () => {
            setMobileBackground([4]);
          },
        },
      });

      // securityTimeline
      //   .to(
      //     astroRef.current.position,
      //     { z: 3, x: 0, y: -6.5 },
      //     "simultaneously"
      //   )
      //   .to(
      //     astroRef.current.rotation,
      //     { x: 0.5, y: 4.2, z: 0 },
      //     "simultaneously"
      //   );
    }
  }, [astroRef.current]);

  return (
    <div
      style={{
        // height: "330vh",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "96vh" }}></div>
      <div
        style={{
          height: "20vh",
          marginTop: "2em",
        }}
      ></div>
      <IndustryText title={"Industry"} />
      <MedicineText title={"Medicine"} />
      <MicrosoftText title={"Microsoft"} />
      <SecurityText title={"Security"} />
      <AiText title={"Artifical Intelligence"} />
      <MilitaryText title={"Military"} />
      <CustomizationText title={"Customization"} />
    </div>
  );
}

export default SelectedCategoryMobile;

const IndustryText = ({ title }) => (
  <div
    className={`industry-test`}
    style={{
      color: "white",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      height: "30vh",
      // opacity: "0.8",
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "4px",
        textAlign: "center",
        position: "absolute",
      }}
    >
      <div className="scrolled-category-title" style={{ marginTop: "1em" }}>
        {title} <span style={{ color: "#750414" }}>4.0</span>
      </div>
      <LearnMoreBtn />
      {/* <div className="scrolled-category-text-one" style={{ marginTop: "2em" }}>
        <span>The world was recently</span>
        <span>introduced to the wonders of</span>
        <span>the industry 4.0 revolution</span>
      </div>
      <div
        className="scrolled-category-text-two"
        style={{ marginTop: "1em", fontSize: "1.2em" }}
      >
        <span>Together with our clients we map out the</span>
        <span>challenges they face and develop tailor-made</span>
        <span>solutions using XR and 3D technology that</span>
      </div> */}
    </div>
  </div>
);

const MedicineText = ({ title }) => (
  <div
    className={`medical-test fader`}
    style={{
      height: "30vh",
      top: "200%",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
      padding: "4px",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title" style={{ marginTop: "1em" }}>
      <span style={{ color: "#750414" }}>M</span>
      {title.substring(1)}
    </div>
    <LearnMoreBtn />

    {/* <div className="scrolled-category-text-one" style={{ marginTop: "2em" }}>
      <span>The world of medicine is one</span>
      <span>of the most innovative sectors</span>
      <span>in the world</span>
    </div>
    <div
      className="scrolled-category-text-two"
      style={{ marginTop: "4em", fontSize: "1.2em" }}
    >
      <span>Using Extended Reality (XR) we at in3D became pioneers in</span>
      <span>development of XR products for medical organizations</span>
    </div> */}
  </div>
);

const MicrosoftText = ({ title }) => (
  <div
    className={`micro-test fader`}
    style={{
      height: "30vh",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title">
      <span style={{ color: "#750414" }}>M</span>
      {title.substring(1)}
    </div>
    <LearnMoreBtn />

    {/* <div className="scrolled-category-text-one">
      <span>In3D is the official and inclusive</span>
      <span>Mixed Reality (MR) partner</span>
      <span>of Microsoft Israel</span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        As partners, in3D is your perfect go to for any Microsoft MR products.
      </span>
      <span>
        In3D and Microsoft's teams share a strong connection and a combined
        vison on the important roles of MR technology
      </span>
    </div> */}
  </div>
);

export const SecurityText = ({ title }) => (
  <div
    className={`security-test fader`}
    style={{
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // justifyContent: "space-between",
      height: "30vh",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/security/Security_Togle_Finish2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title">
      <span style={{ color: "#750414" }}>S</span>
      {title.substring(1)}
    </div>
    <div className="scrolled-category-text-one">
      <LearnMoreBtn />

      {/* <span>
        Thanks to years of collaboration with defense industries, we gained the
      </span>
      <span>
        needed experience, knowledge and tools to provide quick and out of the
        box solutions that are tailored to the industries unique requirements
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        As partners, in3D is your perfect go to for any Microsoft MR products.
      </span> */}

      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const AiText = ({ title }) => (
  <div
    className={`ai-test fader`}
    style={{
      // width: "34%",

      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "30vh",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title">
      <span style={{ color: "#750414" }}>A</span>
      {title.substring(1)}
    </div>
    <LearnMoreBtn />

    {/* <div className="scrolled-category-text-one">
      <span>Here is some basic information about our work with AI.</span>
      <span>
        needed experience, knowledge and tools to provide quick and out of the
        box
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        Were here to let you know, in3D is your perfect go to for any AI
        products.
      </span>

    </div> */}
  </div>
);

export const MilitaryText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      // width: "34%",

      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "30vh",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title">
      <span style={{ color: "#750414" }}>M</span>
      {title.substring(1)}
    </div>
    <LearnMoreBtn />

    {/* <div className="scrolled-category-text-one">
      <span>Thanks to years of collaboration with defense industries, s</span>
      <span>we gained the needed experience, knowledge and</span>
      <span>
        tools to provide quick and out of the box solutions that are tailored to
        the industries unique requirement
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        Were here to let you know, in3D is your perfect
        <span style={{ fontStyle: "italic" }}> go to</span> for any AI products.
      </span>

    </div> */}
  </div>
);

export const CustomizationText = ({ title }) => (
  <div
    className={`fader`}
    style={{
      // width: "34%",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "30vh",
      marginTop: "2em",
    }}
  >
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        height: "30vh",
        width: "100%",
        backgroundImage:
          'url("/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    ></div>
    <div className="scrolled-category-title">
      <span style={{ color: "#750414" }}>C</span>
      {title.substring(1)}
    </div>
    <LearnMoreBtn />

    {/* <div className="scrolled-category-text-one">
      <span>We specialize in 3D and Extended Reality (EX),</span>
      <span>and as specialists we keep an amazing team of developers,</span>
      <span>
        3D generalists, interface and graphics artists, and product designers
        just so we can provide our clients with the flexibility and abilities
        needed to deliver the best product
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        Were here to let you know, in3D is your perfect go to for any AI
        products.
      </span>

    </div> */}
  </div>
);

export const ContactUsText = ({ title }) => (
  <div
    className="contact-us-wrapper"
    style={{ position: "absolute", top: "800%", height: "60vh" }}
  >
    <span className="contact-title">Contact us</span>
    <div className="contact-details-wrapper">
      <span>Feel free to contact us via:</span>
      <span style={{ marginTop: "0.5em", fontSize: "1em" }}>
        <span style={{ fontWeight: "bold" }}>Phone:</span>
        <span>+972-54-218-5021 or +1(302)-219-4023</span>
      </span>

      <span>
        <span style={{ fontWeight: "bold" }}>Email: </span>sales@in3d-tech.com
      </span>
      <span style={{ marginTop: "1em" }}>
        We also invite you to meet us at 1 Shefa Tal street, Tel Aviv.
      </span>
      <span>
        Or you can message us
        <span style={{ fontSize: "1.2em", textDecoration: "underline" }}>
          Here
        </span>
      </span>
    </div>
  </div>
);

const LearnMoreBtn = () => {
  return (
    <div style={{ marginTop: "1em" }}>
      <button className="cta">
        <span className="hover-underline-animation"> Learn more </span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="10"
          viewBox="0 0 46 16"
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
          ></path>
        </svg>
      </button>
    </div>
  );
};
