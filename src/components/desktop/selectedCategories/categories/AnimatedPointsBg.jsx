import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  let inactivityTimeout = null;
  const inactivityDuration = 400; // 1 second of inactivity before fading out

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const target = { x: width / 2, y: height / 2 };
    let points = [];
    let animateHeader = true;
    let isMouseMoving = false;

    canvas.width = width;
    canvas.height = height;

    const gridSpacing = 55;

    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        const px = x + (gridSpacing / 2) * (Math.random() - 0.5);
        const py = y + (gridSpacing / 2) * (Math.random() - 0.5);
        const p = {
          x: px,
          y: py,
          originX: px,
          originY: py,
          closest: [],
          circle: null,
        };
        points.push(p);
      }
    }

    points.forEach((p1) => {
      const closest = [];
      points.forEach((p2) => {
        if (p1 !== p2) {
          const dist = getDistance(p1, p2);
          if (closest.length < 4) {
            closest.push({ point: p2, distance: dist });
            closest.sort((a, b) => a.distance - b.distance);
          } else if (dist < closest[3].distance) {
            closest[3] = { point: p2, distance: dist };
            closest.sort((a, b) => a.distance - b.distance);
          }
        }
      });
      p1.closest = closest.map((c) => c.point);
    });

    points.forEach((p) => {
      p.circle = new Circle(p, 2 + Math.random() * 2, "rgba(51, 181, 229,0.3)");
    });

    function Circle(pos, rad, color) {
      this.pos = pos;
      this.radius = rad;
      this.color = color;
      this.draw = () => {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(51, 181, 229,${this.active})`;
        ctx.fill();
      };
    }

    function drawLines(p) {
      if (!p.active) return;
      p.closest.forEach((closeP) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closeP.x, closeP.y);
        ctx.strokeStyle = `rgba(138,43,226,${
          p.active >= 0.3 ? "0.15" : p.active
        })`;
        ctx.stroke();
      });
    }

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((p) => {
          const distance = Math.abs(getDistance(target, p));
          if (distance < 4000 && isMouseMoving) {
            p.active = 0.6;
            p.circle.active = 0.3;
          } else if (distance < 20000 && isMouseMoving) {
            p.active = 0.3;
            p.circle.active = 0.1;
          } else if (distance < 40000 && isMouseMoving) {
            p.active = 0.1;
            p.circle.active = 0.05;
          } else {
            p.active = Math.max(p.active - 0.02, 0); // Gradually fade out
            p.circle.active = Math.max(p.circle.active - 0.02, 0);
          }
          drawLines(p);
          p.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    animate();

    function shiftPoint(p) {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 20,
        y: p.originY - 50 + Math.random() * 20,
        ease: "circ.inOut",
        onComplete: () => shiftPoint(p),
      });
    }
    points.forEach(shiftPoint);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      target.x = e.clientX || e.pageX;
      target.y = e.clientY || e.pageY;
      isMouseMoving = true;
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, inactivityDuration);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const getDistance = (p1, p2) => {
    return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
  };

  return (
    <div
      id="large-header"
      className="large-header"
      style={{ overflow: "hidden", width: "100%", height: "100vh" }}
    >
      <canvas style={{ position: "fixed" }} id="demo-canvas" ref={canvasRef} />
    </div>
  );
};

// const AnimatedBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const target = { x: width / 2, y: height / 2 };
//     let points = [];
//     let animateHeader = true;

//     canvas.width = width;
//     canvas.height = height;

//     const gridSpacing = 50; // Adjust this for denser or sparser grid

//     // Create points in a grid
//     for (let x = 0; x < width; x += gridSpacing) {
//       for (let y = 0; y < height; y += gridSpacing) {
//         const px = x + (gridSpacing / 2) * (Math.random() - 0.5);
//         const py = y + (gridSpacing / 2) * (Math.random() - 0.5);
//         const p = {
//           x: px,
//           y: py,
//           originX: px,
//           originY: py,
//           closest: [],
//           circle: null,
//         };
//         points.push(p);
//       }
//     }

//     // Find nearest points to form diamonds
//     points.forEach((p1) => {
//       const closest = [];
//       points.forEach((p2) => {
//         if (p1 !== p2) {
//           // Sort points by distance and take a fixed number to draw the diamond shape
//           const dist = getDistance(p1, p2);
//           if (closest.length < 4) {
//             closest.push({ point: p2, distance: dist });
//             closest.sort((a, b) => a.distance - b.distance);
//           } else if (dist < closest[3].distance) {
//             closest[3] = { point: p2, distance: dist };
//             closest.sort((a, b) => a.distance - b.distance);
//           }
//         }
//       });
//       p1.closest = closest.map((c) => c.point);
//     });

//     // Create draw functions for circles and lines
//     points.forEach((p) => {
//       p.circle = new Circle(p, 2 + Math.random() * 2, "rgba(51, 181, 229,0.3)");
//     });

//     function Circle(pos, rad, color) {
//       this.pos = pos;
//       this.radius = rad;
//       this.color = color;

//       this.draw = () => {
//         if (!this.active) return;
//         ctx.beginPath();
//         ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
//         ctx.fillStyle = `rgba(51, 181, 229,${this.active})`;
//         ctx.fill();
//       };
//     }

//     function drawLines(p) {
//       if (!p.active) return;
//       p.closest.forEach((closeP) => {
//         ctx.beginPath();
//         ctx.moveTo(p.x, p.y);
//         ctx.lineTo(closeP.x, closeP.y);
//         ctx.strokeStyle = `rgba(0,0,0,${p.active >= 0.3 ? "0.2" : p.active})`;
//         ctx.stroke();
//       });
//     }

//     const animate = () => {
//       if (animateHeader) {
//         ctx.clearRect(0, 0, width, height);
//         points.forEach((p) => {
//           const distance = Math.abs(getDistance(target, p));
//           if (distance < 4000) {
//             p.active = 0.6;
//             p.circle.active = 0.3;
//           } else if (distance < 20000) {
//             p.active = 0.3;
//             p.circle.active = 0.1;
//           } else if (distance < 40000) {
//             p.active = 0.1;
//             p.circle.active = 0.05;
//           } else {
//             p.active = 0;
//             p.circle.active = 0;
//           }

//           drawLines(p);
//           p.circle.draw();
//         });
//       }
//       requestAnimationFrame(animate);
//     };

//     animate();

//     function shiftPoint(p) {
//       gsap.to(p, {
//         duration: 1 + Math.random(),
//         x: p.originX - 50 + Math.random() * 20,
//         y: p.originY - 50 + Math.random() * 20,
//         ease: "circ.inOut",
//         onComplete: () => shiftPoint(p),
//       });
//     }
//     points.forEach(shiftPoint);

//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       const newHeight = window.innerHeight;
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//     };

//     window.addEventListener("resize", handleResize);

//     const handleMouseMove = (e) => {
//       target.x = e.clientX || e.pageX;
//       target.y = e.clientY || e.pageY;
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const getDistance = (p1, p2) => {
//     return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
//   };

//   return (
//     <div
//       id="large-header"
//       className="large-header"
//       style={{ overflow: "hidden", width: "100%", height: "100vh" }}
//     >
//       <canvas id="demo-canvas" ref={canvasRef} />
//     </div>
//   );
// };

export default AnimatedBackground;
