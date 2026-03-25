import { useEffect, useRef, useState, memo, useCallback } from "react";
import { useAppContext } from "../../../context/appContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VideoPlayer } from "../../common/Logo";
import { MenuAboutContact } from "../nav/MenuWheel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
  ABOUT_US,
} from "../../common/modelData";
import "./MobileCategoryPage.css";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Data: category content (text, media, colors, tags)
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_CONTENT = {
  [INDUSTRY]: {
    title: "Industry 4.0",
    subtitle: "XR & 3D Solutions",
    accent: "#1a1a2e",
    tags: ["XR", "3D", "AI", "IoT"],
    heroImage:
      "https://in3dwebsite.blob.core.windows.net/photos/industry-large-min.jpg",
    stats: [
      { value: "40%", label: "Efficiency gain" },
      { value: "3×", label: "Faster training" },
      { value: "99%", label: "Uptime SLA" },
    ],
    text1:
      "The world was recently introduced to the wonders of the industry 4.0 revolution. Industry is experiencing a quantum leap forward, with seemingly endless tools that impact everything we know about manufacturing and maintenance.",
    text2:
      "Together with our clients we map out the challenges they face and develop tailor-made solutions using XR and 3D technology — which creates a whole new and improved visual interface platform.",
    text3:
      "3D XR isn't just an innovative experience. We carefully evaluate each solution through business perspectives such as ROI, workplace efficiency, and simplification of complex procedures.",
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4",
        label: "ICL Smart Warehouse",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4",
        label: "Agoran",
      },
    ],
  },
  [MEDICINE]: {
    title: "Medicine",
    subtitle: "Extended Reality in Healthcare",
    accent: "#750414",
    tags: ["VR", "AR", "MR", "Haptics"],
    heroImage:
      "https://in3dwebsite.blob.core.windows.net/photos/medical_overlay_1-min.jpg",
    stats: [
      { value: "XR", label: "Pioneering dev" },
      { value: "VR+AR", label: "Simulators" },
      { value: "MR", label: "Live operations" },
    ],
    text1:
      "The world of medicine is one of the most innovative sectors in the world. Using Extended Reality (XR) we at in3D became pioneers in development of XR products for medical organizations, collaborating together to empower innovation and efficiency for clinics and hospitals.",
    text2:
      "Our team is very conscious of our medical clients' needs, and together we can develop a new and exciting working environment that upgrades working methods and quality of care.",
    text3:
      "Combining the medical need for advanced technological tools with our experience and professional flexibility, we successfully developed VR, AR and MR simulators which include haptic features and assist medical teams using holograms in live operations and for complex maintenance procedures.",
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4",
        label: "Real-time Operation",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4",
        label: "Medical Holoportation",
      },
    ],
  },
  [MICROSOFT]: {
    title: "Microsoft",
    subtitle: "Official MR Partner",
    accent: "#0E3058",
    tags: ["HoloLens", "MR", "Azure", "Mesh"],
    heroImage:
      "https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg",
    stats: [
      { value: "MR", label: "Mixed Reality" },
      { value: "#1", label: "Israel Partner" },
      { value: "HL2", label: "HoloLens 2" },
    ],
    text1:
      "In3D is the official and exclusive Mixed Reality (MR) partner of Microsoft Israel.",
    text2:
      "As partners, in3D is your perfect go-to for any Microsoft MR products. In3D and Microsoft's teams share a strong connection and a combined vision on the important roles of MR technology.",
    text3: null,
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",
        label: "Remote Assist",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4",
        label: "Remote Collaboration",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4",
        label: "HoloLens Guides",
      },
    ],
  },
  [SECURITY]: {
    title: "Security",
    subtitle: "Defense & Public Safety",
    accent: "#1a1a2e",
    tags: ["VR", "Simulators", "AR", "XR"],
    heroImage: null,
    stats: [
      { value: "MOD", label: "MOD Official provider" },
      { value: "IDF", label: "Collaboration" },
      { value: "XR", label: "Platforms" },
    ],
    text1:
      "In3D has strong relations with the security and defense sector and is an MOD (Ministry of Defense) official provider.",
    text2:
      "Working directly with many security bodies such as the fire and rescue department, Israel police, IDF and more.",
    text3:
      "Part of our vision is to promote innovation, which is a big part of what Israel stands for. We succeeded in delivering top-of-the-line technology to all of our important industries, through development of complex simulators, XR platforms, and tailored applications.",
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/VR - Fire Department - Elevator Simulator (1).mp4",
        label: "Fire Dept VR Simulator",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Hololens-Abach-Treatment-Simulator.mp4",
        label: "Treatment Simulator",
      },
    ],
  },
  [AI]: {
    title: "Artificial Intelligence",
    subtitle: "AI-Powered Environments",
    accent: "#e6e6e6",
    tags: ["AI", "ML", "Automation"],
    heroImage: null,
    stats: [
      { value: "AI", label: "Integration" },
      { value: "VR", label: "Environments" },
      { value: "HW", label: "Control" },
    ],
    text1:
      "Navigate through our virtual environments with ease, blending with real-world operations for intuitive control and system management.",
    text2:
      "Harness the potential of AI for virtual collaboration, granting operators fuller control over both software and hardware, paving the way for a future where innovation feels closer than ever before.",
    text3: null,
    videos: [],
  },
  [MILITARY]: {
    title: "Military",
    subtitle: "Defense Innovation",
    accent: "#2a3a2a",
    tags: ["3D Scan", "XR", "Simulators", "ISO"],
    heroImage: null,
    stats: [
      { value: "ISO", label: "Certified" },
      { value: "XR", label: "Platforms" },
      { value: "3D", label: "Scanning" },
    ],
    text1:
      "Thanks to years of collaboration with defense industries, we gained the needed experience, knowledge and tools to provide quick and out of the box solutions that are tailored to the industries unique requirements.",
    text2:
      "In3D is committed to ISO standards and all other needed security measures such as secure development facilities, information security protocols, and personal security clearance for all our employees.",
    text3:
      "The defense industries face unique challenges, such as High-Mix-Low-Volume manufacture, strict information security protocols and a wide and complex content of work.",
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Boat 3D Scan.mp4",
        label: "3D Boat Scan",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Truck (1).mp4",
        label: "Rafael Truck",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Missile (1).mp4",
        label: "Rafael Missile",
      },
    ],
  },
  [CUSTOMIZATION]: {
    title: "Customization",
    subtitle: "Tailored XR Solutions",
    accent: "#19197D",
    tags: ["VR", "AR", "MR", "3D"],
    heroImage: null,
    stats: [
      { value: "XR", label: "Specialization" },
      { value: "All", label: "Platforms" },
      { value: "E2E", label: "Delivery" },
    ],
    text1:
      "We specialize in 3D and Extended Reality (XR), and as specialists we keep an amazing team of developers, 3D generalists, interface and graphics artists, and product designers to deliver the best product.",
    text2:
      "With constant curiosity and accumulated experience, we have successfully developed software products on most of the existing hardware platforms in the market today.",
    text3:
      "With years of experience working with a huge variety of sectors and different businesses, we provide assistance with needed authorizations and hardware modifications for a better design and implementation of tailor-made solutions.",
    videos: [
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4",
        label: "Globe 3D Store",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4",
        label: "BIM Construction",
      },
      {
        src: "https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4",
        label: "Package Scanning",
      },
    ],
  },
  [ABOUT_US]: {
    title: "Who We Are",
    subtitle: "Software House Without Borders",
    accent: "#0d0d0d",
    tags: ["ISO9001", "ISO27001", "XR"],
    heroImage:
      "https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png",
    stats: [
      { value: "IL", label: "HQ Israel" },
      { value: "ISO", label: "9001 & 27001" },
      { value: "XR", label: "Believers" },
    ],
    text1:
      "In3D is an Israeli Software house with ambitions to become a software house without borders. We develop 3D virtual environments for different business sectors in Israel and all over the world.",
    text2:
      "We specialize in Mixed Reality (XR) — but first and foremost, we are firm believers in it.",
    text3:
      "in3D has ISO9001 quality standards and ISO27001 information security, and provides its services under the strictest standard definitions working with well-known businesses and organizations.",
    videos: [],
  },
};

const CATEGORY_KEY_MAP = {
  1: INDUSTRY,
  2: MEDICINE,
  3: MICROSOFT,
  4: SECURITY,
  5: AI,
  6: MILITARY,
  7: CUSTOMIZATION,
  8: ABOUT_US,
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
function MobileCategoryPage() {
  const { setSelectedCategory, selectedCategory } = useAppContext();
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const text1Ref = useRef(null);
  const videosRef = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const [videosReady, setVideosReady] = useState(false);

  const data =
    CATEGORY_CONTENT[
      typeof Number(selectedCategory) == "number" ? selectedCategory : 3
    ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVideosReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  // GSAP — play-once animations, no scrub
  useEffect(() => {
    if (!data || !scrollRef.current) return;

    const scroller = scrollRef.current;

    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll(".mob-stat-card"),
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsRef.current,
                scroller,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        [text1Ref, text2Ref, text3Ref].forEach((ref) => {
          if (!ref.current) return;
          gsap.fromTo(
            ref.current,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                scroller,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        if (videosRef.current) {
          gsap.fromTo(
            videosRef.current.querySelectorAll(".mob-video-card"),
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: videosRef.current,
                scroller,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }, scroller);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!data) return null;

  return (
    <div className="mob-cat-page fade-in">
      {/* ── Back button ── */}
      <button
        className="mob-back-btn"
        onClick={() => setSelectedCategory(null)}
        aria-label="Go back"
      >
        <ArrowBackIcon sx={{ color: "#fff", fontSize: 22 }} />
      </button>

      {/* ── Scrollable content ── */}
      <div className="mob-cat-scroll" ref={scrollRef}>
        {/* ── HERO ── */}
        <section className="mob-hero" ref={heroRef}>
          {data.heroImage && (
            <div className="mob-hero-bg">
              <img src={data.heroImage} alt="" />
              <div className="mob-hero-vignette" />
            </div>
          )}
          <div
            className="mob-hero-bg-fallback"
            style={{
              background: data.heroImage
                ? "none"
                : `linear-gradient(135deg, ${data.accent} 0%, #0d0d0d 100%)`,
            }}
          />
          <div className="mob-hero-content">
            <div className="mob-hero-eyebrow">
              <span className="mob-eyebrow-line" />
              <span>{data.subtitle}</span>
            </div>
            <h1 className="mob-hero-title">{data.title}</h1>
            <div className="mob-hero-divider" />
            <div className="mob-hero-tags">
              {data.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="mob-tag"
                  style={{ animationDelay: `${0.6 + i * 0.08}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── BODY — compact, no gaps ── */}
        <div className="mob-body-flow">
          {/* Stats — small pills, NO mob-glass class */}
          <section className="mob-stats-section" ref={statsRef}>
            {data.stats.map(({ value, label }) => (
              <div key={label} className="mob-stat-card">
                <span className="mob-stat-label">{label}</span>
              </div>
            ))}
          </section>

          {/* Text 1 */}
          <section className="mob-text-section" ref={text1Ref}>
            <p className="mob-text-body mob-text-lead">{data.text1}</p>
          </section>

          {/* Videos */}
          {data.videos.length > 0 && (
            <section className="mob-videos-section" ref={videosRef}>
              {data.videos.map((video, i) => (
                <MobileVideoCard
                  key={i}
                  video={video}
                  ready={videosReady}
                  index={i}
                />
              ))}
            </section>
          )}

          {/* Text 2 — quote */}
          {data.text2 && (
            <section className="mob-text-section mob-text-alt" ref={text2Ref}>
              <div className="mob-quote-mark">"</div>
              <p className="mob-text-body">{data.text2}</p>
              <div className="mob-text-sig">
                <span className="mob-sig-line" />
                <span>in3D Team</span>
              </div>
            </section>
          )}

          {/* Text 3 */}
          {data.text3 && (
            <section className="mob-text-section" ref={text3Ref}>
              <p className="mob-text-body">{data.text3}</p>
            </section>
          )}

          {/* Footer — always last */}
          <div className="mob-cat-footer">
            {selectedCategory !== "contact" && (
              <MenuAboutContact isFromSelectedCategory />
            )}
          </div>

          <div style={{ height: 32 }} />
        </div>
      </div>
    </div>
  );
}

export default MobileCategoryPage;

// ─────────────────────────────────────────────────────────────────────────────
// MobileVideoCard
// ─────────────────────────────────────────────────────────────────────────────
const MobileVideoCard = memo(({ video, ready, index }) => {
  const vidRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleTap = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.muted = true;
      v.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing]);

  return (
    <div
      className={`mob-video-card ${playing ? "mob-video-playing" : ""}`}
      onClick={handleTap}
    >
      {ready ? (
        <VideoPlayer videoRef={vidRef} src={video.src} startTime={2} isMobile />
      ) : (
        <div className="mob-video-placeholder" />
      )}
      <div
        className={`mob-video-overlay ${playing ? "mob-overlay-hidden" : ""}`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      <div className="mob-video-label">{video.label}</div>
    </div>
  );
});
