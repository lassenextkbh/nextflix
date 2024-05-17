import React from "react";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[]; // En liste af objekter, der repræsenterer senere hen mappes for at få dataen om filmene fra databasen.
  title: string; // Titlen på filmlisten
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    // Hvis filmdata er tom, returneres intet
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p
          className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4"
          // Viser titlen på filmlisten (f.eks. "Dagens bedste forslag til dig" eller "Min Liste")
        >
          {title}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} /> // Genererer en MovieCard-komponent for hver film i databasen
        ))}
      </div>
    </div>
  );
};

export default MovieList;
