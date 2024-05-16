import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-zinc-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Start</div>
        <div className="px-3 text-center text-white hover:underline">
          Serier
        </div>
        <div className="px-3 text-center text-white hover:underline">Film</div>
        <div className="px-3 text-center text-white hover:underline">
          Nyt & Poulært
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Min Liste
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Gennemse Efter Sprog
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
