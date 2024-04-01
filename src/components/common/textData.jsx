export const IndustryText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "22%",
      left: "14%",
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
    <div className="scrolled-category-text-one industry-text-one-ani">
      {/* <span>The world was recently</span>
      <span>introduced to the wonders of</span>
      <span>the industry 4.0 revolution</span> */}
      <span>
        The world was recently introduced to the wonders of the industry 4.0
        revolution.
      </span>
      <br />
    </div>
    <div className="scrolled-category-text-two industry-text-two-ani">
      <span>
        Together with our clients we map out the challenges they face and
        develop tailor made solutions using XR and 3D technology that creates an
        innovative visual interface between men and machine.
      </span>
    </div>
    {/* <div className="scrolled-category-text-two">
      <span>Together with our clients we map out the</span>
      <span>challenges they face and develop tailor-made</span>
      <span>solutions using XR and 3D technology that</span>
      <span>
        creates an innovative visual interface between people and machine.
      </span>
    </div> */}
  </div>
);

export const MedicineText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "16%",
      left: "9%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title ai-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one ai-text-one-ani">
      <span>
        The world of medicine is one of the most innovative sectors in the
        world.
      </span>
      {/* <span>The world of medicine is one</span>
      <span>of the most innovative sectors</span>
      <span>in the world</span> */}
    </div>
    <div className="scrolled-category-text-two ai-text-two-ani">
      <span>
        Using Extended Reality (XR) we at in3D became pioneers in development of
        XR products for medical organizations, collaborating together to empower
        innovation and efficiency for clinics and hospitals.
      </span>
      {/* <span>Using Extended Reality (XR) we at in3D became pioneers in</span>
      <span>development of XR products for medical organizations</span>
      <span>collaborating together to empower innovation and</span>
      <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const MicrosoftText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "22%",
      left: "14%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      animation: "text-reveal 1.2s ease-in-out forwards",
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
      {/* <span>In3D is the official and inclusive</span>
      <span>Mixed Reality (MR) partner</span>
      <span>of Microsoft Israel</span> */}
    </div>
    <div className="scrolled-category-text-two">
      <span>
        In3D and Microsoft&#39;s teams share a strong connection and a combined
        vison on the important roles of MR technology.
      </span>
      {/* <span>
        As partners, in3D is your perfect go to for any Microsoft MR products.
      </span>
      <span>
        In3D and Microsoft's teams share a strong connection and a combined
        vison on the important roles of MR technology
      </span> */}
      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const SecurityText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "18%",
      right: "4%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title security-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div
      style={{ marginTop: "4em" }}
      className="scrolled-category-text-one security-text-ani"
    >
      <span>
        Thanks to years of collaboration with defense industries, we gained the
        needed experience, knowledge and tools to provide quick and out of the
        box solutions that are tailored to the industries unique requirements.
      </span>
    </div>
  </div>
);

export const AiText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "18%",
      left: "10%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title ai-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one ai-text-one-ani">
      <span>
        XR + AI = E<span className="ai-highlight">X</span>T
        <span className="ai-highlight">R</span>A{" "}
        <span className="ai-highlight">A</span>MAZ
        <span className="ai-highlight">I</span>NG
      </span>
    </div>
    <div className="scrolled-category-text-two ai-text-two-ani">
      <span>
        The combination of a 3D XR software environment with A.I creates not
        only an advanced and innovative hardware and software operation but a
        genuine cooperation between man and machine
      </span>

      {/* <span>efficiency for clinics and hospitals</span> */}
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
    <div className="scrolled-category-text-one industry-text-one-ani">
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
        significant sector
      </span>
    </div>
  </div>
);

export const CustomizationText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "18%",
      left: "12%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title security-title-ani">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span style={{ marginTop: "3em" }}>
        We specialize in 3D and Extended Reality (EX).
      </span>
    </div>
    <div className="scrolled-category-text-two security-title-ani">
      <span style={{ marginBottom: "-3em" }}>
        As specialists we keep an amazing team of developers, 3D generalists,
        interface and graphics artists, and product designers just so we can
        provide our clients with the flexibility and abilities needed to deliver
        the best product
      </span>
    </div>
  </div>
);

export const ContactUsText = () => (
  <div className="contact-us-wrapper">
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
        Or you can message us{" "}
        <span
          className="contact-us-here-btn"
          style={{
            fontSize: "1.1em",
            textDecoration: "underline",
            fontWeight: "600",
          }}
        >
          here
        </span>
      </span>
    </div>
  </div>
);
