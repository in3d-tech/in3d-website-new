export const getCategoryData = ({ selectedCategory }) => {
  if (selectedCategory !== 1) {
    // console.log(textContainer);
  }
  const categoryData = {
    0: {
      title: (
        <>
          <span className="rotate">I</span>ndustry{" "}
          <span style={{ color: "#750414" }}>4.0</span>
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      // text: "Together with our clients we map out the challenges they face and develop tailor made solutions using XR and 3D technology that creates an innovative visual interface between men and machine.",
      text: "The world was recently introduced to the wonders of the industry 4.0 revolution Industry is experiencing a quantum leap forward, with seemingly endless tools that impact everything we know about manufacturing and maintenance.",
      text2:
        "Together with our clients we map out the challenges they face and develop tailor made solutions using XR and 3D technology that creates a whole new and improved visual interface platform",
      text3:
        "3D XR isn't just an innovative experience. We carefully evaluate each solution we offer through business perspectives such as ROI,workplace efficiency and simplification of complexed procedures",
      url: "/assets/models/engenir_model.glb",
    },
    1: {
      title: (
        <>
          <span style={{ color: "#750414" }}>M</span>
          edicine
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/medicine/Medical_Togle.jpg")',
      // text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals.",
      text: "The world of medicine is one of the most innovative sectors in the world. Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals",
      url: "/assets/models/medical_model1 (1).glb",
      text2:
        "Our team is very conscious of our medical clients' needs, and together we can develop a new and exciting working environment that upgrades working methods and quality of care",
      text3:
        "Combining the medical need for advanced technological tools with our experience and professional flexibility, we successfully developed VR,AR and MR simulators which include haptic features and assist medical teams using holograms in live operations and for complex maintenance procedures.",
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
      text2:
        "As partners, in3D is your perfect go to for any Microsoft MR products In3D and Microsoft's teams share a strong connection and a combined vison on the important roles of MR technology",
      url: "/assets/models/microsoft_model.glb",
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
      // text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
      text: "In3D has strong relations with the security and defense sector and an MOD (Ministry of Defense) official provider",
      text2:
        "Working directly with many security bodies such as the fire and rescue department, Israel police, IDF and more",
      text3:
        "Part of our vision is to promote innovation, which is a big part of what Israel stands for. We succeeded in delivering top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications that are now in the service of this significant sector",
      url: "/assets/models/security.glb",
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
      url: "/assets/models/ai_model.glb",
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
      // text: "We deliver top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications that are now in the service of this significant sector.",
      text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements",
      url: "/assets/models/military.glb",
      text2:
        "In3D is committed to ISO standards and all other needed security measures such as secure development facilities, information security protocols, and personal security clearance for all our employees.",
      text3:
        "The defense industries face unique challenges, such as High-Mix-Low-Volume manufacture, strict information security protocols and a wide and complex content of work. Such challenges are a common thread in the defense industries and we offer a variety of solutions to overcome any and all challenges",
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
      // text: "As specialists we keep an amazing team of developers, 3D generalists, interface and graphics artists, and product designers just so we can provide our clients with the flexibility and abilities needed to deliver the best product.",
      text: "We specialize in 3D and Extended Reality (EX), and as specialists we keep an amazing team of developers, 3D generalists, interface and graphics artists, and product designers just so we can provide our clients with the flexibility and abilities needed to deliver the best product",
      url: "/assets/models/costimize_model_v02.glb",
      text2:
        "With a constant curiosity and accumulate experience, we have successfully developed software products on most of the existing hardware platforms in the market today, through smartphones, desktops, tablets and all XR headsets including Virtual Reailty (VR), Augmented Reality (AR), Mixed Reality (MR)",
      text3:
        "With years of experience working with a huge variety of sectors and different businesses, we provide assistance with needed authorizations and hardware modifications required by INFOSEC, worker's committees, legal, and collaborating with major company IT teams for a better design and implementation of tailor-made solutions that started as a vision of one diligent employee",
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
            from different sectors from all around the world. We specialize in
            Extended Reality (XR) but first and foremost we are its believers.{" "}
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
              // position: "absolute",
              color: "black",
              fontSize: "8.4px",
              // width: "80%",
              fontFamily: "gotham",
              display: "flex",
              justifyContent: "center",
              marginTop: "5em",
              // marginTop: "2em",
              // bottom: "3em",
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
