// hooks/useLinks.ts
import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { LINKS_BY_LINKED_TO_ID } from "../graphql/queries/links/links";
import { CREATE_LINK, DELETE_LINK } from "../graphql/mutations/links/links";

export interface LinkInput {
  url: string;
  title?: string;
  favicon?: string;
  linkedToId?: string;
  linkedToType?: string;
}

export function useLinks({
  linkedToId,
  linkedToType = "request",
}: {
  linkedToId: string;
  linkedToType?: string;
}) {
  const { data, loading, error, refetch } = useQuery(LINKS_BY_LINKED_TO_ID, {
    variables: { linkedToId },
    fetchPolicy: "network-only",
    skip: !linkedToId,
  });

  const [createLinkMutation] = useMutation(CREATE_LINK);
  const [deleteLinkMutation] = useMutation(DELETE_LINK);

  const addLink = useCallback(
    async (input: LinkInput) => {
      await createLinkMutation({ variables: { input } });
      await refetch();
    },
    [createLinkMutation, refetch]
  );

  const removeLink = useCallback(
    async (linkId: string) => {
      await deleteLinkMutation({ variables: { linkId } });
      await refetch();
    },
    [deleteLinkMutation, refetch]
  );

  const links = data?.linksByLinkedToId || [];

  return {
    links,
    loading,
    error,
    addLink,
    removeLink,
    refetch,
  };
}
