import { useQuery } from "@tanstack/react-query"

import { fetchCoinLists } from "../queries"

export const useGetCoinLists = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) => {
  return useQuery({
    queryKey: ["Coins Lists", page, pageSize],
    queryFn: () => fetchCoinLists({ page, pageSize }),
    placeholderData: (prevData) => prevData || [],
  })
}
