import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id?: string) => {
    // useSWR hooken bruges til at hente data fra API endpointet "/api/movies/{id}" ved hjælp af fetcher-funktionen
    const { data, error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data, // Data fra API-kaldet
        error, // Eventuelle fejl, der kunne opstå under API-kaldet
        isLoading // Indlæsningsstatus
    }
}

export default useMovie;