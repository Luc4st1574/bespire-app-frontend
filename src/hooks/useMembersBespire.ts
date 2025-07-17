import { useQuery } from "@apollo/client";
import { useState } from "react";
import { SEARCH_MEMBERS_BESPIRE } from "../graphql/queries/users/search_members";

export function useMembersBespire({ initialSearch = "" } = {}) {
  const [search, setSearch] = useState(initialSearch);

  const { data, loading, error, refetch } = useQuery(SEARCH_MEMBERS_BESPIRE, {
    variables: { search },
  });

  console.log("useMembersBespire data:", data, "loading:", loading, "error:", error);

  // Si quieres buscar con el input, solo cambia el search:
  // setSearch("nuevo valor")

  // Si quieres refrescar manualmente:
  // refetch({ search: "nuevo valor" })

  return {
    members: data?.searchMembersBespire || [],
    loading,
    error,
    search,
    setSearch,
    refetch,
  };
}
