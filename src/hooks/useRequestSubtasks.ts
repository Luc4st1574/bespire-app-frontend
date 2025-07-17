// hooks/useRequestSubtasks.ts
import { useLazyQuery } from "@apollo/client";
import { GET_SUBTASKS_BY_REQUEST } from "@/graphql/queries/requests/getSubtasksByRequest";

export function useRequestSubtasksLazy() {
  const [fetchSubtasks, { data, loading, error, called }] = useLazyQuery(
    GET_SUBTASKS_BY_REQUEST,
    {
      fetchPolicy: "network-only",
    }
  );

  return {
    subtasks: data?.getSubtasksByRequest || [],
    loading,
    error,
    fetchSubtasks, // llama esto cuando quieras buscar
    called,
  };
}
