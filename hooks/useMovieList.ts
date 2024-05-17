import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data, // Data fra API-kaldet
    error, // Eventuelle fejl, der kunne opstå under API-kaldet
    isLoading, // Indlæsningsstatus
  }
};

export default useMovieList;