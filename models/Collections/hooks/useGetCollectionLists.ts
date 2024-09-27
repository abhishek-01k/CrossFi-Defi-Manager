import { useQuery } from "@tanstack/react-query"

import { fetchCollectionLists } from "../queries"

export const useGetCollectionLists = ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  return useQuery({
    queryKey: ["CollectionLists", page, limit],
    queryFn: () => fetchCollectionLists({ page, limit }),
    placeholderData: (prevData) => prevData || [],
  })
}
