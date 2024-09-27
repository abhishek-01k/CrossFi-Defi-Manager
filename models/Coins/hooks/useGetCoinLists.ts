import { useQuery } from "@tanstack/react-query"

import { fetchCoinLists } from "../queries"

export const useGetCoinLists = ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  return useQuery({
    queryKey: ["Coins Lists", page, limit],
    queryFn: () => fetchCoinLists({ page, limit }),
    placeholderData: (prevData) => prevData || [],
  })
}
