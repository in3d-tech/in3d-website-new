import { ContactUsMobile } from "../nav/ContactUsMobile";
import "../categories/styles.css";

const COLOR_1 = "#7D1919";
const COLOR_2 = "#19197D";
const COLOR_3 = "#1C4921";

export const getCategoryData = ({ selectedCategory }) => {
  if (selectedCategory !== 1) {
    // console.log(textContainer);
  }
  const categoryData = {
    1: {
      title: (
        <div className="medicine-title-mobile">
          <div
            className="medicine-top-text-mobile"
            style={{ fontSize: "0.85em" }}
          >
            Industry 4.0
          </div>
        </div>
      ),
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      // text: "Together with our clients we map out the challenges they face and develop tailor made solutions using XR and 3D technology that creates an innovative visual interface between men and machine.",
      text: (
        <>
          <span style={{ fontSize: "1.2em" }}>
            The world was recently introduced to the wonders of the industry 4.0
            revolution.
          </span>
          <br />
          <br />
          <span style={{ opacity: 0.8 }}>
            <span style={{ color: COLOR_1 }}>
              Industry is experiencing a quantum leap forward,
            </span>{" "}
            with seemingly endless tools that impact everything we know about
            manufacturing and maintenance.
          </span>
        </>
      ),
      text2: (
        <>
          Together with our clients we map out the challenges they face and
          develop{" "}
          <span style={{ color: COLOR_2 }}>
            tailor made solutions using XR and 3D technology
          </span>{" "}
          that creates a whole new and improved visual interface platform
        </>
      ),
      text3: (
        <>
          <span style={{ fontSize: "1.2em", color: COLOR_3 }}>
            3D XR isn't just an innovative experience.{" "}
          </span>
          <span style={{ opacity: 0.8 }}>
            We carefully evaluate each solution we offer through business
            perspectives such as ROI, workplace efficiency and simplification of
            complexed procedure
          </span>
          s
        </>
      ),
      url: "/assets/models/engenir_model.glb",
    },
    2: {
      title: (
        <>
          <div className="medicine-title-mobile">
            <div className="medicine-top-text-mobile">Medicine</div>
          </div>
          {/* <span style={{ color: "#750414" }}>M</span> */}
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
      // text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals.",
      text: (
        <>
          The world of medicine is one of the most innovative sectors in the
          world. Using{" "}
          <span style={{ color: COLOR_1, fontSize: "1.1em" }}>
            Extended Reality
          </span>{" "}
          (XR) we at in3D became pioneers in development of{" "}
          <span style={{ color: COLOR_1, fontSize: "1.1em" }}>XR</span> products
          for medical organizations, collaborating together to empower
          innovation and efficiency for clinics and hospitals
        </>
      ),
      url: "/assets/models/medical_model1 (1).glb",
      text2: (
        <>
          Our team is very conscious of our medical clients' needs, and{" "}
          <span style={{ color: "#19197D", fontSize: "1.1em" }}>
            together we can develop a new and exciting working environment
          </span>{" "}
          that upgrades working methods and quality of care
        </>
      ),
      text3: (
        <>
          Combining the medical need for advanced technological tools with our
          experience and professional flexibility, we successfully developed{" "}
          <span style={{ color: COLOR_3, fontSize: "1.1em" }}>
            VR, AR and MR
          </span>{" "}
          simulators which include haptic features and assist medical teams
          using holograms in live operations and for complex maintenance
          procedures.
        </>
      ),
    },
    3: {
      title: (
        <div className="medicine-title-mobile">
          <div className="medicine-top-text-mobile">Microsoft</div>
        </div>
      ),
      bgImage:
        'url("/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg")',
      text: (
        <span style={{ color: "#0E3058", fontSize: "1.1em" }}>
          In3D is the official and the inclusive Mixed Reality (MR) partner of
          Microsoft Israel
        </span>
      ),
      text2:
        "As partners, in3D is your perfect go to for any Microsoft MR products. In3D and Microsoft's teams share a strong connection and a combined vison on the important roles of MR technology",
      url: "/assets/models/microsoft_model.glb",
    },
    4: {
      title: (
        <div className="medicine-title-mobile">
          <div className="medicine-top-text-mobile">Security</div>
        </div>
      ),
      bgImage:
        'url("/assets/images/backgrounds/security/Security_Togle_Finish2.jpg")',
      // text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
      text: "In3D has strong relations with the security and defense sector and is an MOD (Ministry of Defense) official provider",
      text2: (
        <span style={{ fontSize: "1.1em", color: COLOR_1 }}>
          Working directly with many security bodies such as the fire and rescue
          department, Israel police, IDF and more
        </span>
      ),
      text3: (
        <>
          <span style={{ fontSize: "1.1em", color: "#19197D" }}>
            Part of our vision is to promote innovation, which is a big part of
            what Israel stands for.
          </span>{" "}
          We succeeded in delivering top-of-the-line technology to all of our
          important industries, through development of complex simulators, XR
          platforms, and tailored applications that are now in the service of
          this significant sector
        </>
      ),
      url: "/assets/models/security.glb",
    },
    5: {
      title: (
        <div className="medicine-title-mobile">
          <div
            className="medicine-top-text-mobile"
            style={{ fontSize: "0.82em" }}
          >
            Artificial Intelligence
          </div>
        </div>
      ),
      bgImage: 'url("/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg")',
      text: (
        <>
          Navigate through our virtual environments with ease, blending with
          real-world operations for intuitive control and system management.
        </>
      ),
      text2: (
        <>
          Additionally, harness the potential of AI for virtual collaboration,
          granting operators fuller control over both software and hardware,
          paving the way for a future where innovation feels closer than ever
          before.
        </>
      ),
      url: "/assets/models/ai_model.glb",
    },
    6: {
      title: (
        <div className="medicine-title-mobile">
          <div className="medicine-top-text-mobile">Military</div>
        </div>
      ),
      bgImage:
        'url("/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg")',
      // text: "We deliver top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications that are now in the service of this significant sector.",
      text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements",
      url: "/assets/models/military.glb",
      text2: (
        <>
          <span style={{ color: COLOR_3, fontSize: "1.1em" }}>
            In3D is committed to ISO standards and all other needed security
            measures
          </span>{" "}
          such as secure development facilities, information security protocols,
          and personal security clearance for all our employees.
        </>
      ),
      text3:
        "The defense industries face unique challenges, such as High-Mix-Low-Volume manufacture, strict information security protocols and a wide and complex content of work. Such challenges are a common thread in the defense industries and we offer a variety of solutions to overcome any and all challenges",
    },
    7: {
      title: (
        <div className="medicine-title-mobile">
          <div
            className="medicine-top-text-mobile"
            style={{
              fontSize: "0.82em",
            }}
          >
            Customization
          </div>
        </div>
      ),
      bgImage:
        'url("/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg")',
      // text: "As specialists we keep an amazing team of developers, 3D generalists, interface and graphics artists, and product designers just so we can provide our clients with the flexibility and abilities needed to deliver the best product.",
      text: (
        <>
          <span style={{ color: COLOR_1, fontSize: "1.1em" }}>
            We specialize in 3D and Extended Reality (EX)
          </span>
          , and as specialists we keep an amazing team of developers, 3D
          generalists, interface and graphics artists, and product designers
          just so we can provide our clients with the flexibility and abilities
          needed to deliver the best product
        </>
      ),
      url: "/assets/models/costimize_model_v02.glb",
      text2: (
        <>
          With a constant curiosity and accumulate experience,{" "}
          <span style={{ color: COLOR_2, fontSize: "1.1em" }}>
            we have successfully developed software products on most of the
            existing hardware platforms
          </span>{" "}
          in the market today, through smartphones, desktops, tablets and all XR
          headsets including Virtual Reailty (VR), Augmented Reality (AR), Mixed
          Reality (MR)
        </>
      ),
      text3: (
        <>
          With years of experience working with a huge variety of sectors and
          different businesses, we provide assistance with needed authorizations
          and hardware modifications required by INFOSEC, worker's committees,
          legal, and collaborating with major company IT teams for{" "}
          <span style={{ color: COLOR_3, fontSize: "1.1em" }}>
            a better design and implementation of tailor-made solutions
          </span>{" "}
          that started as a vision of one diligent employee
        </>
      ),
    },

    8: {
      title: (
        <div className="medicine-title-mobile">
          <div
            className="medicine-top-text-mobile"
            style={{ fontSize: "0.82em" }}
          >
            Who We Are
          </div>
        </div>
      ),
      text: (
        <>
          <div
            style={{
              // color: "black",
              textAlign: "left",
              color: "black",
              // backgroundImage:
              //   "url(https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png)",
              // backgroundSize: "cover",
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
            }}
          >
            In3D is an Israeli Software house with ambitions to become a
            software house without borders <br />
            <br />
            We develop 3D virtual environments for different business sectors in
            Israel and all over the world
          </div>
        </>
      ),
      text2: (
        <div style={{ textAlign: "right" }}>
          WE SPECIALIZE IN MIXED REALITY (XR)
          <br />
          But first and foremost, we are firm believers in it.
          <div>
            <img
              style={{
                width: "100%",
                transform: "scaleX(-1)",
                // position: "absolute",
                left: 0,
                top: "-2em",
              }}
              src="https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png"
            />
          </div>
        </div>
      ),
      text3: (
        <div style={{ fontSize: "1.1em" }}>
          in3D has ISO9001 quality standards and ISO27001 information secuity,
          and provides its services under the strictest standard definitions
          working with well-known businesses and organizations.
          <br />
          <br />
          So please feel free to choose us for your next project
        </div>
      ),
    },
    contact: {
      title: (
        <div className="medicine-title-mobile">
          <div
            className="medicine-top-text-mobile"
            style={{ fontSize: "0.82em" }}
          >
            Contact Us
          </div>
        </div>
      ),
      text: <></>,
      text2: <ContactUsMobile />,
    },
  };

  if (selectedCategory == "contact") {
    return categoryData["contact"];
  }

  return categoryData[selectedCategory - 2];
};

{
  /* <div style={{ width: "90%", textAlign: "right" }}>
in3D does not disclose, collect, edit, transfer to a third party or
use private information of its customers or website users. In any case
in which in3D is asked to transfer private information, it will
immediately notify the relevant customer and act under his guidance.
For any inquiry or request for additional information on privacy
statements, contact by email: Nathanael@in3D-Tech.com
<br />
in3D works according to international quality policies in development
and production, information security and privacy security – ISO9001,
ISO27001, ISO27701. The company undertakes and complies with legal and
privacy requirements, engraves on its banner a high standard of
service assembly, while maintaining accuracy, confidentiality and
information security.
<br />
If you need more information, contact us at the email listed at the
above.
</div> */
}
