import { MenuAboutContact } from "../../navs/mobile/MenuWheel";

export const HomeScreenCategoryText = ({
  title,
  idx,
  selectedMenuActionMobile,
  setSelectedMenuActionMobile,
}) => {
  const categoryDataByIndex = {
    0: {
      title: (
        <>
          Industry <span style={{ color: "#750414" }}>4.0</span>
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      text: "Together with our clients we develop tailor made solutions using XR and 3D technology.",
    },
    1: {
      title: (
        <>
          <span style={{ color: "#750414" }}>M</span>
          edicine
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
      text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations.",
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
      text: "Thanks to years of collaboration with defense industries, we provide reliable and out of the box solutions tailored to the industries unique requirements.",
    },
    4: {
      title: (
        <>
          <span style={{ color: "#750414" }}>A</span>
          rtifical Intelligence
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg")',
      text: "The combination of a 3D XR software environment with A.I creates advanced and innovative operations",
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
      text: "Through development of complex simulators, XR platforms, and tailored applications, we deliver top-of-the-line technology in the service of this significant sector.",
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
      text: "With our amazing team, we provide the flexibility and abilities needed to deliver the best tailor-made product.",
    },
    7: {
      text: (
        <div
          style={{
            color: "white",
            position: "absolute",
            fontSize: "6px",
            // width: "80%",
            fontFamily: "gotham",
            bottom: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "90%" }}>
            in3D does not disclose, collect, edit, transfer to a third party or
            use private information of its customers or website users. In any
            case in which in3D is asked to transfer private information, it will
            immediately notify the relevant customer and act under his guidance.
            For any inquiry or request for additional information on privacy
            statements, contact by email: Nathanael@in3D-Tech.com
            <br />
            in3D works according to international quality policies in
            development and production, information security and privacy
            security – ISO9001, ISO27001, ISO27701. The company undertakes and
            complies with legal and privacy requirements, engraves on its banner
            a high standard of service assembly, while maintaining accuracy,
            confidentiality and information security.
            <br />
            If you need more information, contact us at the email listed at the
            above.
          </div>
        </div>
      ),
    },
  };

  if (idx == 7) {
    return (
      <div
        style={{
          height: "30vh",
          color: "white",
          fontFamily: "gotham",
          display: "flex",
          flexDirection: "column",
          padding: "4px",
          // marginTop: "3em",
          justifyContent: "space-evenly",
        }}
      >
        <MenuAboutContact />
        {categoryDataByIndex[idx].text}
      </div>
    );
  }

  return (
    <div
      className={`industry-test fader`}
      style={{
        height: "30vh",
        color: "white",
        fontFamily: "gotham",
        display: "flex",
        flexDirection: "column",
        padding: "4px",
        marginTop: "3em",
        borderTop: "1px solid rgb(255, 255, 255, 0.4)",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          height: "30vh",
          width: "100%",
          backgroundImage:
            categoryDataByIndex[idx]?.bgImage ||
            'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "blur(40px)",
        }}
      ></div>

      <div
        className="scrolled-category-title"
        style={{ marginTop: "1em", marginLeft: "0.5em" }}
      >
        {categoryDataByIndex[idx]?.title}
      </div>
      <span style={{ textAlign: "center", padding: "1em", fontSize: "0.8em" }}>
        {categoryDataByIndex[idx]?.text}
      </span>
      <LearnMoreBtn
        setSelectedMenuActionMobile={setSelectedMenuActionMobile}
        idx={idx}
      />
    </div>
  );
};

export const ContactUsText = ({ title = "Contact Us" }) => (
  <div
    className="contact-us-wrapper"
    style={{ position: "absolute", top: "800%", height: "60vh" }}
  >
    {/* <span className="contact-title">Contact us</span>
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
    </div> */}
  </div>
);

export const AboutUsText = ({ title }) => {
  return <div>{title}</div>;
};

const LearnMoreBtn = ({ setSelectedMenuActionMobile, idx }) => {
  return (
    <div style={{ marginTop: "1em", marginLeft: "1em" }}>
      <button
        // onClick={() => setSelectedMenuActionMobile(`fab-action-${idx + 1}`)}
        className="cta"
      >
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
