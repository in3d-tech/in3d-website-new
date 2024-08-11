import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Industry } from "./categories/Industry";
import { Security } from "./categories/Security";
import { Customize } from "./categories/Customize";
import { Medicine } from "./categories/Medicine";
import { Microsoft } from "./categories/Microsoft";
import { Military } from "./categories/Military";
import { Ai } from "./categories/Ai";
import { About } from "./categories/About";
import { Contact } from "./categories/Contact";

const backgrounds = {
  1: 'url("/assets/images/backgrounds/taasiya.jpg")',
  2: 'url("/assets/images/backgrounds/another-med.jpg")',
  3: 'url("/assets/images/backgrounds/microsoft.jpg")',
  4: 'url("/assets/images/backgrounds/customize/Costumize_Sky_Background_V01.png")',
  5: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
};

function SelectedCategoryPage() {
  const [transitionToPage, setTransitionToPage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { selectedCategory } = useAppContext();

  useEffect(() => {
    if (selectedCategory) {
      setTransitionToPage(true);
      setTimeout(() => (document.body.style.overflow = "hidden"), 750);
    } else {
      setTransitionToPage(false);
      document.body.style.overflow = "auto";
    }
  }, [selectedCategory]);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);

    () => {
      setShowContent(false);
    };
  }, [selectedCategory]);

  const categories = {
    Industry: <Industry />,
    Medicine: <Medicine />,
    Microsoft: <Microsoft />,
    Security: <Security />,
    "Artifical Intelligence": <Ai />,
    Military: <Military />,
    Customization: <Customize />,
    "Who we Are": <About />,
    Contact: <Contact />,
  };

  return (
    <div
      className={`selected-category-wrapper ${
        transitionToPage ? "horizontal-nav-wrapper-open" : ""
      }`}
      style={{
        background: `${backgrounds[selectedCategory]} no-repeat center`,
      }}
    >
      {selectedCategory ? (
        showContent ? (
          <>{categories[selectedCategory] || null}</>
        ) : null
      ) : null}
    </div>
  );
}

export default SelectedCategoryPage;
