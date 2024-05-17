import useSWR from 'swr';
import fetcher from '@/lib//fetcher';

const useBillboard = () => {
    // useSWR hooken bruges til at hente data fra '/api/random' endpointet
    const { data, error, isLoading } = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // Returnerer data, fejl og indlæsningsstatusen
    return {
        data, // Data fra API-kaldet
        error, // Eventuelle fejl, der kunne opstå under API-kaldet
        isLoading // Indlæsningsstatus
    };
}

export default useBillboard;