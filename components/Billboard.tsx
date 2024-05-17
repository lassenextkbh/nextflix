import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard(); // Henter data fra hooken useBillboard. Denne hook henter informationen om en tilfældig film fra databasen
  const { openModal } = useInfoModal(); // Henter funktionen openModal fra hooken useInfoModal

  const handleOpenModal = useCallback(() => {
    openModal(data?.id); // Åbner en modal med filmens id, når der klikkes på knappen
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="
        w-full
        h-[56.25vw]
        object-cover
        brightness-[60%]
      "
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl} // Viser thumbnail for videoen
        src={data?.videoUrl} // Viser videoen
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
            text-white 
            text-1xl 
            md:text-5xl 
            h-full 
            w-[50%] 
            lg:text-6xl 
            font-bold 
            drop-shadow-xl"
          // Viser titlen på videoen
        >
          {data?.title}
        </p>
        <p
          className="
            text-white
            text-[8px]
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow-xl
        "
          // Viser beskrivelsen af videoen
        >
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton
            movieId={data?.id}
            // Viser en afspilningsknap for videoen
          />
          <button
            onClick={handleOpenModal} // Kalder handleOpenModal-funktionen, når der klikkes på knappen
            className="
                bg-white
                text-white
                bg-opacity-30
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-opacity-20
                transition
            "
          >
            <AiOutlineInfoCircle
              // Viser et ikon samt teksten "Mere Info" på knappen. Knappen kan klikkes for at åbne en modal med information om filmen
              className="mr-2"
            />
            Mere Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
