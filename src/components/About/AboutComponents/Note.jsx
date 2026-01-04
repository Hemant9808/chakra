import React from "react";
import { Info } from "lucide-react";

function Note() {
  return (
    <div className="flex justify-center my-12 px-4">
      <div className="py-6 px-8 bg-[#FDFBF7] border border-[#715036]/20 text-center w-full max-w-3xl rounded-2xl flex flex-col md:flex-row items-center gap-4 shadow-sm">

        {/* Icon */}
        <div className="flex-shrink-0 text-[#C17C3A]">
          <Info size={24} />
        </div>

        {/* Text */}
        <p className="text-xs md:text-sm text-[#715036]/80 font-medium leading-relaxed italic text-left md:text-center">
          “<span className="font-bold text-[#2A3B28]">Ayucan</span> is not a manufacturer of medicines. All medicines available on our platform are sourced from licensed third-party suppliers and pharmaceutical distributors. We ensure all suppliers comply with regulatory requirements before listing their products on our website.”
        </p>

      </div>
    </div>
  );
}

export default Note;