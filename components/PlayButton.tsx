import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

// Komponenten PlayButton modtager en prop kaldet movieId. Dette er id'et på den film, der skal afspilles.
const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  // Når knappen klikkes, navigerers brugeren til "/watch/{movieId}"
  const handleButtonClick = () => {
    router.push(`/watch/${movieId}`);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="
                bg-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-neutral-300
                transition
            "
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Afspil
    </button>
  );
};

export default PlayButton;
