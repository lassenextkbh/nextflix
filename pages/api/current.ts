import serverAuth from "@/lib/serverAuth";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Tjekker om HTTP-metoden er GET
  if (req.method !== "GET") {
    return res.status(405).end(); // Hvis metoden ikke er GET, returneres en HTTP-statuskode 405 da metoden ikke er tilladt
  }

  try {
    const { currentUser } = await serverAuth(req, res); // Henter currentUser fra serverAuth-funktionen, som håndterer autentifikation af brugeren

    return res.status(200).json(currentUser); // Returnerer currentUser som JSON med en HTTP-statuskode 200 (OK)
  } catch (error) {
    console.log(error); // Udskriver eventuelle fejl i konsollen hvis der opstår fejl
    return res.status(400).end(); // Hvis der opstår fejl, returneres en HTTP-statuskode 400 (Bad Request)
  }
}
