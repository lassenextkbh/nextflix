import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            // Henter den brugeren ved hjælp af serverAuth-funktionen
            const { currentUser } = await serverAuth(req, res);

            // Henter movieId fra req.body (Denne metode bruges til at hente data fra POST-anmodninger)
            const { movieId } = req.body;

            // Finder filmen i databasen baseret på movieId
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            // Hvis filmen ikke findes, opstår der en fejl
            if (!existingMovie) {
                throw new Error("Ugyldig ID");
            }

            // Opdaterer brugerens favoriteIds ved at tilføje movieId til arrayet
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });

            // Returnerer brugeren som JSON med en HTTP-statuskode 200 (OK)
            return res.status(200).json(user);
        }

        if (req.method === "DELETE") { // Hvis metoden er DELETE
            // Henter brugeren ved hjælp af serverAuth-funktionen
            const { currentUser } = await serverAuth(req, res);

            // Henter movieId fra req.body
            const { movieId } = req.body;

            // Finder filmen i databasen baseret på movieId
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            // Hvis filmen ikke findes, opstår der en fejl
            if (!existingMovie) {
                throw new Error("Ugyldig ID");
            }

            // Opdaterer favoriteIds ved at fjerne movieId fra arrayet
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

            // Opdaterer brugeren med de opdaterede favoriteIds
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || "", // Finder brugeren baseret på email
                },
                data: {
                    favoriteIds: updatedFavoriteIds, // Opdaterer favoriteIds
                }
            });

            // Returnerer den opdaterede bruger som JSON med en HTTP-statuskode 200 (OK)
            return res.status(200).json(updatedUser);
        }

        // Hvis metoden ikke er POST eller DELETE, returneres en 405-fejl (Metoden ikke tilladt)
        return res.status(405).end();
    } catch (error) {
        // Hvis der opstår en fejl, logges den og der returneres en 400-fejl (Bad Request)
        console.log(error)
        return res.status(400).end();
    }
}