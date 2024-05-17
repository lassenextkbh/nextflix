import { create } from "zustand";

// Definerer brugergrænsefladen for infoModal'en
export interface ModalStoreInterface {
    movieId?: string; // ID på den film, der skal vises i modalen
    isOpen: boolean; // Angiver om modalen er åben
    openModal: (movieId: string) => void; // Funktion til at åbne modalen
    closeModal: () => void; // Funktion til at lukke modalen
}

// Opretter en brugerdefineret hook ved hjælp af Zustand-biblioteket til at håndtere statusen af infoModal
const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => set({ isOpen: true, movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined}),
}));

export default useInfoModal;