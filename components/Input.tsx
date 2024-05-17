import React from "react";

interface InputProps {
  id: string; // Unik id for input-elementet
  onChange: any; // Funktionen der kaldes når værdien ændres
  value: string; // Den aktuelle værdi der er i input-elementet
  label: string; // Teksten der vises som label for input-elementet
  type?: string; // Valgfri attribut der angiver input-typen (f.eks. "text", "password" osv.)
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        onChange={onChange} // Kalder onChange-funktionen når værdien ændres
        type={type} // Angiver input-typen (hvis angivet)
        value={value} // Sætter den aktuelle værdi af input-elementet
        id={id} // Sætter id-attributten for input-elementet
        className="
                    block
                    rounded-md
                    px-6
                    pt-6
                    pb-1
                    w-full
                    text-md
                    text-white
                    bg-neutral-700
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer
                "
        placeholder=" "
      />
      <label
        className="
        absolute
        text-md
        text-zinc-400
        duration-150
        transform
        -translate-y-3
        scale-75
        top-4
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
        htmlFor={id} // Sætter id-attributten for label-elementet
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
