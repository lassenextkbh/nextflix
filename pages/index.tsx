import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); // Henter sessionen fra getSession-funktionen

  if (!session) {
    // Hvis der ikke er nogen session, omdirigeres brugeren til login-siden
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList(); // Henter filmene fra databasen via useMovieList-hooken
  const { data: favorites = [] } = useFavorites(); // Henter brugerens favoritter fra databasen via useFavorites-hooken
  const { isOpen, closeModal } = useInfoModal(); // Henter isOpen og closeModal fra useInfoModal-hooken

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Dagens bedste forslag til dig" data={movies} />
        <MovieList title="Min liste" data={favorites} />
      </div>
    </>
  );
}
