export function OpenWhatsapp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+972526787276"; // Your phone number in international format
    const message = ""; // Default message
    const url = `https://wa.me/${phoneNumber}`;
    // ?text=${encodeURIComponent(
    //   message
    // )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <button
        style={{
          borderRadius: "20px",
          border: "1px solid rgb(255,255,255,0.4)",
          height: "2em",
          fontFamily: "gotham",
          background: "rgb(0,0,0,0.5)",
          fontSize: "0.75em",
          color: "white",
        }}
        onClick={handleWhatsAppClick}
      >
        Chat with us on WhatsApp
      </button>
    </>
  );
}
