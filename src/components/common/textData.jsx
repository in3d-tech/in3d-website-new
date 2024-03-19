export const IndustryText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "18%",
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
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>The world was recently</span>
      <span>introduced to the wonders of</span>
      <span>the industry 4.0 revolution</span>
    </div>
    <div className="scrolled-category-text-two">
      <span>Together with our clients we map out the</span>
      <span>challenges they face and develop tailor-made</span>
      <span>solutions using XR and 3D technology that</span>
      <span>
        creates an innovative visual interface between people and machine.
      </span>
    </div>
  </div>
);

export const MedicineText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "14%",
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
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>The world of medicine is one</span>
      <span>of the most innovative sectors</span>
      <span>in the world</span>
    </div>
    <div className="scrolled-category-text-two">
      <span>Using Extended Reality (XR) we at in3D became pioneers in</span>
      <span>development of XR products for medical organizations</span>
      <span>collaborating together to empower innovation and</span>
      <span>efficiency for clinics and hospitals</span>
    </div>
  </div>
);

export const MicrosoftText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "16%",
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
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
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
      top: "16%",
      right: "3%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>
        Thanks to years of collaboration with defense industries, we gained the
      </span>
      <span>
        needed experience, knowledge and tools to provide quick and out of the
        box solutions that are tailored to the industries unique requirements
      </span>
      {/* <span>of Microsoft Israel</span> */}
    </div>
    <div className="scrolled-category-text-two">
      <span>
        As partners, in3D is your perfect go to for any Microsoft MR products.
      </span>
      <span>
        In3D and Microsoft's teams share a strong connection and a combined
        vison on the important roles of MR technology
      </span>
      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const AiText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "16%",
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
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>Here is some basic information about our work with AI.</span>
      <span>
        needed experience, knowledge and tools to provide quick and out of the
        box
      </span>
      {/* <span>of Microsoft Israel</span> */}
    </div>
    <div className="scrolled-category-text-two">
      <span>
        Were here to let you know, in3D is your perfect go to for any AI
        products.
      </span>
      <span>
        In3D and Artifical Intelligence share a strong connection and a combined
        vison on the important roles of MR technology
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
      top: "16%",
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
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
      <span>Thanks to years of collaboration with defense industries, s</span>
      <span>we gained the needed experience, knowledge and</span>
      <span>
        tools to provide quick and out of the box solutions that are tailored to
        the industries unique requirement
      </span>
    </div>
    <div className="scrolled-category-text-two">
      <span>
        Were here to let you know, in3D is your perfect go to for any AI
        products.
      </span>
      <span>
        In3D and Artifical Intelligence share a strong connection and a combined
        vison on the important roles of MR technology
      </span>
      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const CustomizationText = ({ textClass, scrollArea, categoriesObj }) => (
  <div
    className={`fader ${textClass}`}
    style={{
      height: "80vh",
      width: "34%",
      top: "16%",
      left: "12%",
      position: "absolute",
      color: "white",
      // fontSize: "3em",
      fontFamily: "gotham",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
    }}
  >
    <div className="scrolled-category-title">
      {categoriesObj[scrollArea.currentSection]}
    </div>
    <div className="scrolled-category-text-one">
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
      <span>
        In3D and Artifical Intelligence share a strong connection and a combined
        vison on the important roles of MR technology
      </span>
      {/* <span>efficiency for clinics and hospitals</span> */}
    </div>
  </div>
);

export const ContactUsText = () => (
  <h1
    style={{
      color: "white",
      fontSize: "6em",
      position: "absolute",
      fontFamily: "gotham",
      top: "2em",
      left: "1em",
    }}
  >
    Contact us
  </h1>
);
