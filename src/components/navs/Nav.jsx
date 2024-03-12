const sections = [
  "Microsoft",
  "Military",
  "Industry",
  "Medicine",
  "Security",
  "Artifical Intelligence",
  "Customization",
];

export function Nav({ scrollArea, handleClickNav }) {
  const buttons = sections.map((topic, idx) => (
    <button
      className={`nav-btn ${
        scrollArea.currentSection == idx + 1 ? "selected" : ""
      }`}
      key={`nav${idx}`}
      // onClick={handleClickNav}
    >
      {topic}
    </button>
  ));

  return <div className="nav-btns-wrapper">{buttons}</div>;
}
