import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Hook til at håndtere favoritfilm
const useFavorites = () => {
    // SWR-hook til at hente data fra "/api/favorites" endpointet ved hjælp af fetcher-funktionen
    const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data, // Data fra API-kaldet
        error, // Eventuelle fejl, der kunne opstå under API-kaldet
        isLoading, // Indlæsningsstatus
        mutate // Funktion til at opdatere data manuelt
    }
};

export default useFavorites;
