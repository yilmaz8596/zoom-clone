import React from "react";
import Image from "next/image";
function Loader() {
  return (
    <div className="flex-center w-full h-screen">
      <Image
        src="/icons/loading-circle.svg"
        alt="loading"
        width={50}
        height={50}
      />
    </div>
  );
}

export default Loader;
