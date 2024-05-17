import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState(""); // Opretter en usestatevariabel til email
  const [name, setName] = useState(""); // Opretter en usestatevariabel til brugernavn
  const [password, setPassword] = useState(""); // Opretter en usestatevariabel til password

  const [variant, setVariant] = useState("login"); // Opretter en usestatevariabel til varianten (login eller register)

  const toggleVariant = useCallback(() => {
    // Skifter varianten fra login til register og omvendt
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    // Login-funktion
    try {
      await signIn("credentials", {
        // Logger ind med email og password
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    // Registreringsfunktion
    try {
      await axios.post("/api/register", {
        // Opretter en ny bruger i databasen
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error); // Udskriver eventuelle fejl i konsollen
    }
  }, [email, name, password, login]);

  return (
    <div className="realtive h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Log ind" : "Opret konto"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Brugernavn"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Log ind" : "Opret konto"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  "
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  "
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "Første gang på Nextflix?"
                  : "Har du allerede en konto?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Opret en konto." : "Log ind."}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
