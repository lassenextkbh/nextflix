import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).end(); // Metoden er ikke tilladt hvis den ikke er GET

    try {
        await serverAuth(req, res);

        const { movieId } = req.query; // Henter movieId

        if (typeof movieId !== "string") { // Hvis movieId ikke er en string, opstår der en fejl
            throw new Error("Invalid ID");
        }

        if (!movieId) { // Hvis movieId ikke er tilgængelig, opstår der en fejl
            throw new Error("Invalid ID");
        }

        const movie = await prismadb.movie.findUnique({ // Finder filmen baseret på movieId
            where: {
                id: movieId
            }
        });

        if (!movie) { // Hvis filmen ikke findes, opstår der en fejl
            throw new Error("Invalid ID");
        }

        return res.status(200).json(movie); // Returnerer filmen
    } catch (error) {
        console.log(error); // Logger eventuelle fejl
        return res.status(400).end();
    }
}