export const categoryObserver = ({
  sectionRef,
  image1Ref,
  image2Ref,
  textRef,
  observerOptions,
  isDoubleAnimation,
}) => {
  if (!observerOptions || !sectionRef) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (textRef) {
          textRef.classList.add("scrolled");
        }
        image1Ref.classList.add("scrolled");
        if (image2Ref) {
          image2Ref.classList.add("scrolled");
          if (isDoubleAnimation) {
            image2Ref.classList.add("activation");
          }
        }
      } else {
        // if (textRef) {
        //   textRef.classList.remove("scrolled");
        // }
        // image1Ref.classList.remove("scrolled");
        // if (image2Ref) {
        //   image2Ref.classList.remove("scrolled");
        // }
      }
    });
  }, observerOptions);

  observer.observe(sectionRef);

  return observer;
};
