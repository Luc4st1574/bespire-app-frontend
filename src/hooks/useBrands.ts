import { useQuery, useMutation } from "@apollo/client";
import { GET_BRANDS } from "../graphql/queries/brands/getBrands";
import { CREATE_BRAND } from "../graphql/mutations/brands/CreateBrand";
import { UPDATE_BRAND } from "../graphql/mutations/brands/UpdateBrand";
import { REMOVE_BRAND } from "../graphql/mutations/brands/RemoveBrand";

export function useBrands(workspaceId: string) {
  const { data, loading, refetch } = useQuery(GET_BRANDS, {
    variables: { workspace: workspaceId },
    skip: !workspaceId || workspaceId === "",
  });

  const [createBrand, createState] = useMutation(CREATE_BRAND, {
    onCompleted: () => refetch(),
  });

  const [updateBrand, updateState] = useMutation(UPDATE_BRAND, {
    onCompleted: () => refetch(),
  });

  const [removeBrand, removeState] = useMutation(REMOVE_BRAND, {
    onCompleted: () => refetch(),
  });

  return {
    brands: data?.getAllBrands ?? [],
    loading,
    createBrand,
    updateBrand,
    createState,
    updateState,
    refetch,
    removeBrand,
      removeState,
  };
}
