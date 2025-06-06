import {useQuery} from "@tanstack/react-query"
import {client} from "@/lib/hono"

export const usegetCategories= ()=> {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async ()=> {
            const response = await client.api.categories.$get();

            if(!response.ok){
throw new Error("failed to fetch Categories")
            }

            const {data} = await response.json()

            return data;
        }
    })

    return query;
}