import fetcher from "@/lib/fetcher";
import useSWR from "swr";

// Hook til at hente klientens bruger fra databasen
const useCurrentUser = () => {
  // SWR-hooken henter data fra "/api/current" ved hjælp af fetcher-funktionen
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  // Fe forskellige værdier fra SWR-hook'en retuneres
  return {
    data, // Data fra API-kaldet
    error, // Eventuelle fejl, der kunne opstå under API-kaldet
    isLoading, // Indlæsningsstatus
    mutate, // Funktion til at opdatere data selv
  };
};

export default useCurrentUser;