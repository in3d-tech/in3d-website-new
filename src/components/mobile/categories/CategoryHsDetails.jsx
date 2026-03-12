import { MenuAboutContact } from "../nav/MenuWheel";
import { gsap } from "gsap";
import { useEffect, useMemo, useState, useRef, useCallback, memo } from "react";

/* ─── Category data (static, outside component) ─── */

const categoryDataByIndex = {
  0: {
    title: (
      <>
        Industry <span>4.0</span>
      </>
    ),
    scrolledName: "industry",
    text: "Together with our clients we develop tailor made solutions using XR and 3D technology.",
  },
  1: {
    title: (
      <>
        <span>M</span>edicine
      </>
    ),
    scrolledName: "medicine",
    text: "Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations.",
  },
  2: {
    title: (
      <>
        <span>M</span>icrosoft
      </>
    ),
    text: "In3D is the official and the inclusive Mixed Reality (MR) partner of Microsoft Israel",
  },
  3: {
    title: (
      <>
        <span>S</span>ecurity
      </>
    ),
    scrolledName: "security",
    text: "Thanks to years of collaboration with defense industries, we provide reliable and out of the box solutions tailored to the industries unique requirements.",
  },
  4: {
    title: (
      <>
        <span>A</span>rtifical Intelligence
      </>
    ),
    scrolledName: "ai",
    text: "The combination of a 3D XR software environment with A.I creates advanced and innovative operations",
  },
  5: {
    title: (
      <>
        <span>M</span>ilitary
      </>
    ),
    scrolledName: "military",
    text: "Through development of complex simulators, XR platforms, and tailored applications, we deliver top-of-the-line technology in the service of this significant sector.",
  },
  6: {
    title: (
      <>
        <span>C</span>ustomization
      </>
    ),
    scrolledName: "customize",
    text: "With our amazing team, we provide the flexibility and abilities needed to deliver the best tailor-made product.",
  },
  7: {
    title: <span>About us</span>,
    text: (
      <div>
        We are on a mission to evolve
        <br />
        <br />
        3D isn't only a technology, it's a different way of thinking, with more
        perspective Our goal is to gather all senses into the virtual world and
        blur the boundaries between realities
      </div>
    ),
  },
  8: {
    text: (
      <div
        style={{
          color: "white",
          position: "absolute",
          fontSize: "6px",
          fontFamily: "gotham",
          bottom: "1em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%", textAlign: "center" }}>
          in3D does not disclose, collect, edit, transfer to a third party or
          use private information of its customers or website users. In any case
          in which in3D is asked to transfer private information, it will
          immediately notify the relevant customer and act under his guidance.
          For any inquiry or request for additional information on privacy
          statements, contact by email: Nathanael@in3D-Tech.com
          <br />
          in3D works according to international quality policies in development
          and production, information security and privacy security – ISO9001,
          ISO27001, ISO27701. The company undertakes and complies with legal and
          privacy requirements, engraves on its banner a high standard of
          service assembly, while maintaining accuracy, confidentiality and
          information security.
          <br />
          If you need more information, contact us at the email listed at the
          above.
        </div>
      </div>
    ),
  },
};

const hsTextBgs = {
  0: "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg",
  1: "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
  2: "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg",
  3: "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg",
  4: "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
  5: "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg",
  6: "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
  7: "/assets/images/backgrounds/moving-bg.jpg",
};

/* ─── Accent colors per category for the glow/border ─── */
const accentColors = {
  0: "rgba(13, 168, 136, 0.6)", // teal — Industry
  1: "rgba(61, 220, 233, 0.6)", // cyan — Medicine
  2: "rgba(80, 120, 255, 0.6)", // blue — Microsoft
  3: "rgba(200, 160, 60, 0.6)", // gold — Security
  4: "rgba(61, 217, 233, 0.6)", // cyan — AI
  5: "rgba(80, 123, 63, 0.6)", // olive — Military
  6: "rgba(240, 183, 94, 0.6)", // amber — Customization
  7: "rgba(180, 140, 220, 0.6)", // purple — About
};

/* ─── Main category text component ─── */

export const HomeScreenCategoryText = memo(
  ({
    idx,
    setSelectedMenuActionMobile,
    setSelectedCategory,
    setSelectedCategoryItemByIdx,
    selectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    const triggerRef = useRef(null);

    useEffect(() => {
      const trigger = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: `.category-${idx}`,
            start: "top 50%",
            end: "bottom center",
            onEnter: () => {
              setSelectedCategoryItemByIdx(idx);
              categoryIdxRef.current = idx;
            },
            onEnterBack: () => {
              setSelectedCategoryItemByIdx(idx);
              categoryIdxRef.current = idx;
            },
            onLeaveBack: () => {
              if (idx === 0) {
                setSelectedCategoryItemByIdx(-1);
                categoryIdxRef.current = -1;
              }
            },
          },
        },
      );

      triggerRef.current = trigger;

      return () => {
        trigger.scrollTrigger?.kill();
      };
    }, [idx, setSelectedCategoryItemByIdx, categoryIdxRef]);

    // ── Contact / privacy section ──
    if (idx === 8) {
      return (
        <div
          style={{
            color: "white",
            fontFamily: "gotham",
            display: "flex",
            flexDirection: "column",
            padding: "4px",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <MenuAboutContact isFromHomeScreen />
          <br />
          <br />
        </div>
      );
    }

    const isActive = selectedCategoryItemByIdx === idx;
    const accent = accentColors[idx] || "rgba(255,255,255,0.3)";

    return (
      <div
        className={`mobile-hs-category-wrapper category-${idx}`}
        style={{
          "--accent": accent,
          "--accent-glow": accent.replace("0.6)", "0.25)"),
        }}
      >
        <div className="mobile-category-glass-inner">
          {/* Faint background image — visible but doesn't block the 3D scene */}
          <div
            className="mobile-category-bg-image"
            style={{
              backgroundImage: `url(${hsTextBgs[idx]})`,
              opacity: isActive ? 0.12 : 0.05,
            }}
          />

          {/* Top accent line */}
          <div className="mobile-category-accent-line" />

          {/* Category title */}
          <div
            className={`mobile-category-title ${
              isActive ? "fade-in-longer" : "fade-out"
            }`}
          >
            {categoryDataByIndex[idx]?.title}
          </div>

          {/* Description text */}
          <div
            className={`mobile-category-description ${
              isActive ? "fade-in-longer" : "fade-out"
            }`}
          >
            {idx === 7 ? (
              categoryDataByIndex[idx].text
            ) : (
              <AnimatedText
                text={categoryDataByIndex[idx].text}
                categoryIdx={idx}
                selectedCategoryItemByIdx={selectedCategoryItemByIdx}
              />
            )}
          </div>

          {/* CTA button */}
          <LearnMoreBtn
            idx={idx}
            setSelectedCategory={setSelectedCategory}
            selectedCategoryItemByIdx={selectedCategoryItemByIdx}
            setSelectedMenuActionMobile={setSelectedMenuActionMobile}
          />
        </div>
      </div>
    );
  },
);

/* ─── "Learn more" button ─── */

const LearnMoreBtn = memo(
  ({ idx, setSelectedCategory, selectedCategoryItemByIdx }) => {
    const handleClick = useCallback(() => {
      if (idx === 8) return;
      setSelectedCategory(idx + 3);
    }, [idx, setSelectedCategory]);

    const isActive = selectedCategoryItemByIdx === idx;

    return (
      <div
        className={`mobile-category-cta-wrapper ${
          isActive ? "fade-in" : "fade-out"
        }`}
      >
        <button onClick={handleClick} className="mobile-category-cta-btn">
          <span>Explore</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    );
  },
);

/* ─── Animated scatter/assemble text ─── */

const AnimatedText = memo(
  ({ text, categoryIdx, selectedCategoryItemByIdx }) => {
    if (typeof text !== "string") return null;

    const wordsArray = useMemo(() => text.split(" "), [text]);

    const initialPositions = useMemo(
      () =>
        wordsArray.map(() => ({
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
        })),
      [text], // eslint-disable-line react-hooks/exhaustive-deps
    );

    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
      setAssembled(categoryIdx === selectedCategoryItemByIdx);
    }, [categoryIdx, selectedCategoryItemByIdx]);

    const isActive = categoryIdx === selectedCategoryItemByIdx;

    return (
      <div
        className={`animated-text-wrapper ${
          isActive ? "fade-in-longer" : "fade-out"
        }`}
        style={{ maxWidth: "100%", overflowWrap: "break-word" }}
      >
        <div
          className="animated-text-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {wordsArray.map((word, index) => {
            const pos = assembled ? { x: 0, y: 0 } : initialPositions[index];
            return (
              <span
                key={index}
                className="word"
                style={{
                  display: "inline-block",
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  transition: "transform 0.5s ease-out",
                  margin: "5px",
                  willChange: assembled ? "auto" : "transform",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
);

/* ─── Unused exports kept for compatibility ─── */

export const ContactUsText = ({ title = "Contact Us" }) => (
  <div
    className="contact-us-wrapper"
    style={{ position: "absolute", top: "800%", height: "60vh" }}
  />
);

export const AboutUsText = ({ title }) => <div>{title}</div>;
