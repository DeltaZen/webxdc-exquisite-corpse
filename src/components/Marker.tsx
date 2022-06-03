import React from "react";

const Marker = () => {
  return (
    <div className="absolute top-0 right-0 text-red-900 -translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
    </div>
  );
};

export default Marker;
