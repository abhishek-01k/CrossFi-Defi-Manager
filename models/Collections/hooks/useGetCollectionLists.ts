import { useQuery } from "@tanstack/react-query"

import { fetchCollectionLists } from "../queries"

export const useGetCollectionLists = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) => {
  return useQuery({
    queryKey: ["CollectionLists", page, pageSize],
    queryFn: () => fetchCollectionLists({ page, pageSize }),
    placeholderData: (prevData) => prevData || [],
  })
}
