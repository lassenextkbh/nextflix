import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  // Bruger hooks til at hente brugerens favoritter og den aktuelle bruger
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  // Tjekker om filmen er en favorit ved at sammenligne dens id med brugerens favoritliste
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Funktion til at tilføje eller fjerne filmen fra favoritterne
  const toggleFavorites = useCallback(async () => {
    let response;

    // Hvis filmen allerede er en favorit, skal den fjernes fra favoritterne
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      // Hvis filmen ikke er en favorit, skal den tilføjes til favoritterne
      response = await axios.post("/api/favorite", { movieId });
    }

    // Opdaterer brugerens favoritliste med den opdaterede liste fra serveren
    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    // Opdaterer favorit-hooks for at refetche data
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // Vælger ikon baseret på om filmen er en favorit eller ej
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  // Returnerer en knap, der kan tilføje eller fjerne filmen fra favoritterne
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon
        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
        size={25}
      />
    </div>
  );
};

export default FavoriteButton;
