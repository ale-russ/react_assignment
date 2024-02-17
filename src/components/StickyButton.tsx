import React from "react";

const StickyButton = () => {
  return (
    <button className="h-10 fixed right-10 bottom-10 z-50">
      <img
        className="overflow-clip overflow-cli"
        src="/images/channeltalk.png"
        width={48}
        height={48}
        alt="sticky button"
      />
    </button>
  );
};

export default StickyButton;
