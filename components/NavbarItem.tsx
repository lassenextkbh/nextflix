import React from "react";

// Definerer et interface til NavbarItemProps, der specificerer, at det skal have en label-prop af typen string
interface NavbarItemProps {
  label: string;
}

// Definerer en funktionel komponent kaldet NavbarItem, der tager imod NavbarItemProps som argument
const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    // Teksten i div'en er værdien af label-prop'en, altså teksten der skal vises i denne NavbarItem
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
