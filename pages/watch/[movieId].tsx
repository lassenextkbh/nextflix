import React from "react";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa6";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query; // Henter movieId fra URL'en

  const { data } = useMovie(movieId as string); // Henter filmen fra databasen

  return (
    <div className="h-screen w-screen bg-black">
      {/* Navigationsbar */}
      <nav
        className="
                    fixed
                    w-full
                    p-4
                    z-10
                    flex
                    flex-row
                    items-center
                    gap-8
                    bg-black
                    bg-opacity-70
                "
      >
        {/* Tilbageknap */}
        <FaChevronLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={30}
        />
        {/* Titel */}
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Ser: </span>
          {data?.title}
        </p>
      </nav>
      {/* Videoafspiller */}
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
