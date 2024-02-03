import React from "react";

import instagramLoading from "../assets/instagramLoading.png";

const InstagramLoading = () => {
  return (
    <div
      className="w-full h-screen flex flex-col  justify-evenly pb-48 items-center"
      style={{ overflow: "hidden" }}
    >
      <img src={instagramLoading} className="w-12" />
      <div className="flex justify-center flex-col items-center text-xs text-gray-500">
        <p>from</p>
        <p
          className="text-semibold text-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 150%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
          }}
        >
          lordbakyarou
        </p>
      </div>
    </div>
  );
};

export default InstagramLoading;
