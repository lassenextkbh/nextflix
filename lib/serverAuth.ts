import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";

// Funktionen serverAuth håndterer autentifikation af serveren
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    // Henter sessionen fra serveren ved hjælp af getServerSession-funktionen
    const session = await getServerSession( req, res, authOptions );

    // Hvis der ikke er en gyldig session eller brugerens email mangler, opstår en fejl
    if (!session?.user?.email) {
        throw new Error("Uautoriseret");
    }

    // Finder den aktuelle bruger i databasen baseret på emailen fra sessionen
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    // Hvis brugeren ikke findes i databasen, opstår en fejl
    if (!currentUser) {
        throw new Error("Uautoriseret");
    }

    // Returner brugeren
    return { currentUser };
}

export default serverAuth;
