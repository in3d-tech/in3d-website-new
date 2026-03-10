import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { Industry } from "./categories/Industry";
import { Security } from "./categories/Security";
import { Customize } from "./categories/Customize";
import { Medicine } from "./categories/Medicine";
import { Microsoft } from "./categories/Microsoft";
import { Military } from "./categories/Military";
import { Ai } from "./categories/Ai";
import { About } from "./categories/About";
import { Contact } from "./categories/Contact";
import { Logo } from "../../common/Logo";
import { Lenis } from "lenis/react";
import { gsap } from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: ".selected-category-wrapper" });

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
    if (!selectedCategory) return;

    const wrapper = document.querySelector(".selected-category-wrapper");
    if (!wrapper) return;

    const handleWheel = (e) => {
      e.stopPropagation(); // prevent it reaching root Lenis
      // Don't preventDefault — let the browser scroll the wrapper natively
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
    };
  }, [selectedCategory, transitionToPage]); // transitionToPage ensures wrapper exists in DOM

  useEffect(() => {
    if (!transitionToPage || !showContent) return;

    const tl = gsap.timeline({ delay: 0.1 }); // small delay after showContent mounts the DOM
    tl.from(".category-headline", {
      y: 80,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    })
      .from(
        ".category-body-text",
        { y: 40, opacity: 0, duration: 0.6 },
        "-=0.3",
      )
      .from(
        ".category-image-1",
        { scale: 0.92, opacity: 0, duration: 0.8 },
        "-=0.4",
      );

    return () => tl.kill();
  }, [showContent]); // fires every time showContent flips to true (i.e. new category opens)

  useEffect(() => {
    if (selectedCategory) {
      setTransitionToPage(true);
      setTimeout(() => {
        document.body.style.overflow = "hidden";
        // Reset scroll position on the wrapper when opening
        const wrapper = document.querySelector(".selected-category-wrapper");
        if (wrapper) wrapper.scrollTop = 0;
      }, 750);
    } else {
      setTransitionToPage(false);
      document.body.style.overflow = "auto";
    }
  }, [selectedCategory]);

  useEffect(() => {
    setShowContent(false); // reset immediately when category changes
    const t = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(t);
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
          <>
            <Logo />
            {categories[selectedCategory] || null}
          </>
        ) : null
      ) : null}
    </div>
  );
}

export default SelectedCategoryPage;
