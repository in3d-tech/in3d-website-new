import { useEffect, useState } from "react";

const backgrounds = {
  1: 'url("/assets/images/backgrounds/taasiya.jpg")',
  2: 'url("/assets/images/backgrounds/another-med.jpg")',
  3: 'url("/assets/images/backgrounds/microsoft.jpg")',
  4: 'url("/assets/images/backgrounds/customize/Costumize_Sky_Background_V01.png")',
  5: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
};

const categoriesObj = {
  1: "TAASIA",
  2: "MEDICINE",
  3: "MICROSOFT",
  4: "MILITARY",
  7: "ARTIFICAL INTELLIGENCE",
  5: "SECURITY",
  5: "CUSTOMIZATION",
};

export function SelectedCategoryPage({ selectedCategory }) {
  const [transitionToPage, setTransitionToPage] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setTransitionToPage(true);
      document.body.style.overflow = "hidden";
    } else {
      setTransitionToPage(false);
      document.body.style.overflow = "auto";
    }
  }, [selectedCategory]);

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
        <Content selectedCategory={selectedCategory} />
      ) : null}
    </div>
  );
}

function Content({ selectedCategory }) {
  return (
    <div className="selected-category-content-wrapper">
      <div
        style={{
          textAlign: "center",
          fontSize: "3em",
          fontFamily: "gotham-bold",
        }}
      >
        <h1>{categoriesObj[selectedCategory]}</h1>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
