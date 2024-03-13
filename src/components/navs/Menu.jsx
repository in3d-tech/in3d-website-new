export const Header = ({
  menuOpened,
  setMenuOpened,
  setSelectedCategory,
  selectedCategory,
}) => {
  const toggleNav = () => {
    setMenuOpened(!menuOpened);

    if (selectedCategory) {
      setTimeout(() => setSelectedCategory(null), 300);
    }
  };

  const topics = [
    { key: 1, title: "Industry" },
    { key: 2, title: "Medicine" },
    { key: 3, title: "Microsoft" },
    { key: 4, title: "Military" },
    { key: 5, title: "Artifical Intelligence" },
    { key: 6, title: "Security" },
    { key: 7, title: "Customization" },
  ];

  return (
    <header>
      <div className="hamburger-icon" id="icon" onClick={toggleNav}>
        <div className={menuOpened ? "icon-1 a" : "icon-1"}></div>
        <div className={menuOpened ? "icon-2 c" : "icon-2"}></div>
        <div className={menuOpened ? "icon-3 b" : "icon-3"}></div>
        <div className="clear"></div>
      </div>

      <nav id="nav" className={menuOpened ? "show" : ""}>
        <ul>
          {topics.map((topic, idx) => (
            <li
              onClick={() => {
                console.log({ idx });
                setSelectedCategory(topic.key);
                // toggleNav();
                // setTimeout(() => toggleNav(), 800);
              }}
              key={topic.key}
              className="nav-open-list-item"
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </nav>

      <div className="dark-blue" id="blue"></div>

      {/* <section className="content">
          <h1>Hello We are animated!</h1>
          <p className="small">Lorem ipsum dolor sit amet</p>
        </section> */}
    </header>
  );
};
