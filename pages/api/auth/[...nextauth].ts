import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb"

export const authOptions: AuthOptions = {
    providers: [
        // Tilføjer GitHub som en login-metode (oAuth)
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        // Tilføjer Google som en login-metode (oAuth)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        // Tilføjer brugernavn og adgangskode som en login-metode
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                // Kontrollerer om brugernavnet og adgangskoden er angivet
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Finder brugeren i databasen baseret på brugerens e-mail
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });

                // Kontrollerer om brugeren eksisterer og om adgangskoden er korrekt
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid email or password");
                }

                const isCorrectPassword = await compare(
                    credentials.password, 
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid password");
                }

                // Returnerer brugeren, hvis autentifikationen lykkes
                return user;
            }
        })
    ],
    pages: {
        signIn: "/auth" // Angiver URL'en til login-siden
    },
    debug: process.env.NODE_ENV === "development", // Aktiverer debug-tilstand i udviklingsmiljøet
    adapter: PrismaAdapter(prismadb), // Bruger PrismaAdapter til at forbinde NextAuth med Prisma-databasen
    session: {
        strategy: "jwt", // Bruger JWT (JSON Web Token) til fejlhåndtering
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); // Eksporterer NextAuth med de angivne indstillinger