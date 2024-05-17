import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser(); // Henter data om den aktuelle bruger ved hjælp af hooken useCurrentUser

  if (!visible) return null; // Hvis "visible" er falsk, returneres intet (komponenten er usynlig)

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-zinc-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="w-8 rounded-md"
            src="/images/default-red.png"
            alt="Profile"
            width="320"
            height="320"
          />
          <p
            className="text-white text-sm group-hover/item:underline"
            // Viser brugerens navn, hvis det er tilgængeligt
          >
            {data?.name}
          </p>
        </div>
        <hr className="bg-zinc-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()} // Logger brugeren ud ved at kalde signOut-funktionen
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Log ud af Nextflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
