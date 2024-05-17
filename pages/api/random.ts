import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end(); // Hvis metoden ikke er GET, returneres en HTTP-statuskode 405 (Metoden er ikke tilladt)
    }

    try {
        await serverAuth(req, res); // Funktionen serverAuth bruges til at autentificere brugeren

        const movieCount = await prismadb.movie.count(); // Tæller antallet af film i databasen
        const randomIndex = Math.floor(Math.random() * movieCount); // Genererer et tilfældigt indeks baseret på antallet af film

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        }); // Finder en tilfældig film ved at tage en film fra det tilfældige indeks

        return res.status(200).json(randomMovies[0]); // Sender den tilfældige film som JSON-respons med en HTTP-statuskode 200 (OK)
    } catch (error) {
        console.log(error); // Udskriver eventuelle fejl i konsollen
        return res.status(400).end(); // Hvis der opstår en fejl, returneres en HTTP-statuskode 400 (Anmodningen kunne ikke behandles)
    }
}
