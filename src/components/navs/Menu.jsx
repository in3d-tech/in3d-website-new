export const Header = ({ menuOpened, setMenuOpened }) => {
  const toggleNav = () => {
    setMenuOpened(!menuOpened);
  };

  const topics = [
    { key: 0, title: "Medicine" },
    { key: 1, title: "Customization" },
    { key: 2, title: "Artifical Intelligence" },
    { key: 3, title: "Military" },
    { key: 4, title: "Industry" },
    { key: 5, title: "Security" },
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
          {topics.map((topic) => (
            <li key={topic.key} className="nav-open-list-item">
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
