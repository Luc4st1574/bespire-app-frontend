import { useQuery, useMutation } from "@apollo/client";
import { GET_TIMELINE_BY_REQUEST } from "@/graphql/queries/comments/getTimeLineByRequest";
import { CREATE_COMMENT } from "@/graphql/mutations/comments/createComment";

export function useComments(requestId: string) {
  // 1. Traer comentarios
  const { data, loading, error, refetch } = useQuery(GET_TIMELINE_BY_REQUEST, {
    variables: { id: requestId },
    fetchPolicy: "network-only", // O 'cache-and-network' según lo que prefieras
    skip: !requestId,
  });

  // 2. Mutación para crear comentarios
  const [createComment, { loading: creating, error: createError }] = useMutation(CREATE_COMMENT);

  // 3. Función para enviar comentario
  const addComment = async (text: string) => {
    await createComment({
      variables: {
        input: {
          linkedToId: requestId,
          linkedToType: "request",
          text,
        },
      },
    });
    await refetch(); // Actualiza la lista
  };

  // 4. Normaliza el resultado para la UI
  return {
    comments: data?.getTimeLineByRequest || [],
    loading,
    error,
    addComment,
    creating,
    createError,
    refetch,
  };
}
