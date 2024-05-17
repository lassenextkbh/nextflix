import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Kontrollerer om anmodningen er en GET-anmodning
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    // Henter film fra databasen
    const movies = await prismadb.movie.findMany();

    // Sender filmene som en JSON-respons
    return res.status(200).json(movies);
  } catch (error) {
    // Håndterer eventuelle fejl og sender en fejlrespons
    console.log(error);
    return res.status(400).end();
  }
}