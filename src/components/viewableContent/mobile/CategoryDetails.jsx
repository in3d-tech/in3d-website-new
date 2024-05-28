import { Suspense, useEffect, useMemo, useState, useRef, lazy } from "react";
import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "../../common/modelData";

const MAX_ROTATION_SPEED = 0.05; // Maximum rotation speed
const DECAY_FACTOR = 0.95; // Decay factor for inertia

const models = {
  [INDUSTRY]: "/assets/models/engenir_model.glb",
  [MEDICINE]: "/assets/models/medical_model1 (1).glb",
  [MICROSOFT]: "/assets/models/microsoft_model.glb",
  [SECURITY]: "/assets/models/security.glb",
  [AI]: "/assets/models/ai_model.glb",
  [MILITARY]: "/assets/models/military.glb",
  [CUSTOMIZATION]: "/assets/models/costimize_model_v02.glb",
};

function SelectedCategory() {
  const { setSelectedCategory, selectedCategory } = useAppContext();
  const data = getCategoryData({ selectedCategory });
  const modelRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const isAboutOrContact =
    selectedCategory === "about" || selectedCategory === "contact";

  return (
    <div className="tester fade-in">
      {/* <div className="tester" style={{ opacity: 0.5 }}> */}
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
            fontSize: "3em",
            marginTop: selectedCategory == "about" ? "1em" : "1.5em",
            textAlign: "center",
          }}
        >
          {data.title}
        </div>
        {isAboutOrContact ? null : (
          <div
            style={{
              // border: "1px solid yellow",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }}
          >
            <Canvas>
              <ambientLight intensity={1} />
              <directionalLight intensity={4} />
              <Camera />
              <Sparkles
                count={300}
                scale={10}
                size={2}
                color="pink" //{getSparkleColour(scrollArea.currentSection)}
              />
              <Suspense fallback={null}>
                <Model
                  url={models[selectedCategory]} //"/assets/models/engenir_model.glb"
                  modelRef={modelRef}
                  selectedCategory={selectedCategory}
                />
              </Suspense>
            </Canvas>
          </div>
        )}

        {selectedCategory == "contact" ? (
          <ContactUsMobile test={true} />
        ) : (
          <div
            style={{
              fontSize: selectedCategory == "about" ? "0.79em" : "1em",
              width: "90%",
              marginTop: "2em",
              fontFamily: "gotham",
              textAlign: "center",
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
      text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals.",
      url: "/assets/models/medical_model1 (1).glb",
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
      text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
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
      text: "We deliver top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications that are now in the service of this significant sector.",
      url: "/assets/models/military.glb",
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
      url: "/assets/models/costimize_model_v02.glb",
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
                  : +972-52-678-7276
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

function Model({ url, modelRef, selectedCategory }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  // const { active, progress, errors, total } = useProgress();

  const [isDragging, setIsDragging] = useState(false); // State to check if user is interacting
  const [initialX, setInitialX] = useState(null); // To store initial pointer or touch position
  const [rotationFactor, setRotationFactor] = useState(0); // Temporarily store the rotation change
  const [inertia, setInertia] = useState(0); // Store inertia for smooth stopping

  const modelAttributes = {
    [INDUSTRY]: {
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5],
      position: [0, -2.25, 0],
    },
    [MEDICINE]: {
      rotation: [0, 0, 0],
      scale: [1.3, 1.3, 1.3],
      position: [2.35, -2, 0],
    },
    [MICROSOFT]: {
      rotation: [0, 0, 0],
      scale: [1.4, 1.4, 1.4],
      position: [0, -2, 0],
    },
    [SECURITY]: {
      rotation: [0, Math.PI, 0],
      scale: [4.4, 4.4, 4.4],
      position: [-0.2, -1.6, 0],
    },
    [AI]: {
      rotation: [0, 0.5, 0],
      scale: [1.25, 1.25, 1.25],
      position: [-0.2, -2.2, 0],
    },
    [MILITARY]: {
      rotation: [0, 0.2, 0],
      scale: [2.4, 2.4, 2.4],
      position: [0, -2.1, 0],
    },
    [CUSTOMIZATION]: {
      rotation: [0, 0.5, 0],
      scale: [1.9, 1.9, 1.9],
      position: [0, -2.3, 0],
    },
  };

  const handlePointerDown = (event) => {
    setIsDragging(true);

    setInitialX(event.clientX); // Get the initial pointer position

    setInertia(0); // Reset inertia on new drag
  };

  const handlePointerMove = (event) => {
    if (isDragging && initialX !== null) {
      const currentX = event.clientX;
      const deltaX = currentX - initialX;
      let newRotationFactor = deltaX * 0.01;
      newRotationFactor = Math.min(
        MAX_ROTATION_SPEED,
        Math.max(-MAX_ROTATION_SPEED, newRotationFactor)
      ); // Clamp the speed

      setRotationFactor(newRotationFactor); // Calculate the rotation factor based on pointer movement
      setInitialX(currentX); // Update initial pointer position for continuous rotation
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setInitialX(null);
    setInertia(rotationFactor); // Store the last rotation factor as inertia
    setRotationFactor(0); // Reset the rotation factor
  };

  const handleTouchStart = (event) => {
    if (event.touches && event.touches.length > 0) {
      setIsDragging(true);
      setInitialX(event.touches[0].clientX); // Get the initial touch position
      setInertia(0); // Reset inertia on new drag
    }
  };

  const handleTouchMove = (event) => {
    if (
      isDragging &&
      initialX !== null &&
      event.touches &&
      event.touches.length > 0
    ) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - initialX;
      let newRotationFactor = deltaX * 0.01;
      newRotationFactor = Math.min(
        MAX_ROTATION_SPEED,
        Math.max(-MAX_ROTATION_SPEED, newRotationFactor)
      ); // Clamp the speed

      setRotationFactor(newRotationFactor); // Calculate the rotation factor based on touch movement
      setInitialX(currentX); // Update initial touch position for continuous rotation
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialX(null);
    setInertia(rotationFactor); // Store the last rotation factor as inertia
    setRotationFactor(0); // Reset the rotation factor
  };

  useFrame(() => {
    if (scene) {
      scene.rotation.y += rotationFactor;

      // Apply inertia if not dragging
      if (!isDragging && Math.abs(inertia) > 0.0001) {
        scene.rotation.y += inertia;
        setInertia(inertia * DECAY_FACTOR); // Decay inertia over time
      }
    }
  });

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp} // Handle pointer cancel event
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // Handle touch cancel event
    >
      <primitive
        ref={modelRef}
        object={scene}
        dispose={null}
        scale={modelAttributes[selectedCategory].scale}
        position={modelAttributes[selectedCategory].position}
        rotation={modelAttributes[selectedCategory].rotation}
      />
    </group>
  );
}

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => mixer.clipAction(clip).play());

    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}
