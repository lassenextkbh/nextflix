import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Hvis anmodningsmetoden ikke er "GET", returneres en statuskode 405 (Metoden er ikke tilladt)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Autentificerer og finder brugeren ved hjælp af serverAuth-funktionen
    const { currentUser } = await serverAuth(req, res);

    // Finder alle favoritfilm for den aktuelle bruger ved hjælp af deres favorit-ids
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    // Returnerer en statuskode 200 (OK) og sender favoritfilmene som JSON
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    // Hvis der opstår en fejl, logges den, og der returneres en statuskode 400 (Bad Request)
    console.log(error);
    return res.status(400).end();
  }
}