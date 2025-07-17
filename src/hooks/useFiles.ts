// hooks/useFiles.ts
import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { FILES_BY_LINKED_TO_ID } from "../graphql/queries/files/files";
import { CREATE_FILE, DELETE_FILE } from "../graphql/mutations/files/files";

// Puedes importar el tipo de archivo, por ahora tipamos rápido:
export interface FileInput {
  name: string;
  type: string;
  url?: string;
  ext?: string;
  size?: number;
  linkedToId?: string;
  linkedToType?: string;
}

export function useFiles({ linkedToId, linkedToType = "request" }: { linkedToId: string, linkedToType?: string }) {
  // Query para obtener archivos relacionados
  const { data, loading, error, refetch } = useQuery(FILES_BY_LINKED_TO_ID, {
    variables: { linkedToId },
    fetchPolicy: "network-only",
    skip: !linkedToId,
  });

  // Mutation para crear archivo
  const [createFileMutation] = useMutation(CREATE_FILE);
  // Mutation para borrar archivo
  const [deleteFileMutation] = useMutation(DELETE_FILE);

  // Agregar archivo
  const addFile = useCallback(
    async (input: FileInput) => {
      await createFileMutation({ variables: { input } });
      await refetch();
    },
    [createFileMutation, refetch]
  );

  // Eliminar archivo
  const removeFile = useCallback(
    async (fileId: string) => {
        console.log("Removing file with ID:", fileId);
      await deleteFileMutation({ variables: { fileId } });
      await refetch();
    },
    [deleteFileMutation, refetch]
  );

  // Archivos listos para usar
  const files = data?.filesByLinkedToId || [];

  return {
    files,
    loading,
    error,
    addFile,
    removeFile,
    refetch, // si quieres forzar manualmente
  };
}
