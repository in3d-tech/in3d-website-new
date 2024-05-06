import { useEffect } from "react";
import { useAppContext } from "../../../context/appContext";
import { INDUSTRY } from "../../common/modelData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SelectedCategory({ title = "Industry" }) {
  const { setSelectedCategory } = useAppContext();
  const data = getCategoryData();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="tester">
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
        <div style={{ fontSize: "3.5em", marginTop: "1.5em" }}>
          {data.title}
        </div>
        <div style={{ width: "90%", marginTop: "2em" }}> {data.text}</div>
      </div>
    </div>
  );
}

export default SelectedCategory;

const getCategoryData = () => {
  const categoryData = {
    0: {
      title: (
        <>
          Industry <span style={{ color: "#750414" }}>4.0</span>
        </>
      ),
      bgImage: 'url("/assets/images/backgrounds/taasia/Industry_Togle.jpg")',
      text: "Together with our clients we map out the challenges they face and develop tailor made solutions using XR and 3D technology that creates an innovative visual interface between men and machine.",
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
      text: "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
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
    },
  };

  return categoryData[0];
};
