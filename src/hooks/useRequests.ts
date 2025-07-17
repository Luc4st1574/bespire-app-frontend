import { useQuery, useMutation } from "@apollo/client";
import { GET_REQUESTS } from "@/graphql/mutations/requests/getRequests";
import { UPDATE_REQUEST_ASSIGNEES } from "@/graphql/mutations/requests/updateRequestAssignees";
import { RequestList } from "@/types/requests";

export function useRequests() {
  const { data, loading, error, refetch } = useQuery(GET_REQUESTS);
  const [updateRequestAssignees, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_REQUEST_ASSIGNEES);

  // Los requests están en data?.getRequestList
  const requests = data?.getRequestList as RequestList[] || [];

  // Mutación para actualizar los asignados
  const assignUsers = async (requestId: string, assigneeIds: string[]) => {
    await updateRequestAssignees({
      variables: {
        input: { requestId, assignees: assigneeIds },
      },
       refetchQueries: [{ query: GET_REQUESTS }],
    });
  };

  return {
    requests,
    loading,
    error,
    refetch,
    assignUsers,
    loadingUpdate,
    errorUpdate,
  };
}
