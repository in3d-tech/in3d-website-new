function HomeScreenMobile() {
  return (
    <>
      <div
        style={{ background: backgrounds[1], height: "100vh", width: "100vw" }}
      >
        <h1 style={{ color: "green", fontFamily: "gotham" }}>
          Hello Wisoncsin!
        </h1>
        <div style={{ fontFamily: "gotham", color: "white" }}>
          Simply Expand
        </div>
        <div className="mobile-categories-wrapper">
          {categories.map((category, idx) => (
            <Category category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeScreenMobile;

const Category = ({ category }) => {
  return <div className="mobile-category-wrapper">{category}</div>;
};

const backgrounds = {
  1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
  2: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
  3: 'url("/assets/images/backgrounds//medicine/medicine_bg.jpg")',
  4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
  5: 'url("/assets/images/backgrounds/security/security.jpg")',
  6: 'url("/assets/images/backgrounds/ai/ai_bg.png',
  7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
  8: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
  9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
};

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICALINTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
];
