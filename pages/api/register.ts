import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    // Tjek om der allerede findes en bruger med emailen
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email optaget :(" });
    }

    // Krypter passwordet før det gemmes i databasen
    const hashedPassword = await bcrypt.hash(password, 12);

    // Opret en ny bruger i databasen
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user); // Returnerer brugeren som JSON med en HTTP-statuskode 200 (OK)
  } catch (error) {
    console.log(error); // Udskriver eventuelle fejl i konsollen.
    return res.status(400).end(); // Hvis der opstår fejl, returneres en HTTP-statuskode 400 (Bad Request)
  }
}
