import { useQuery, useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_PORTAL_SESSION } from "@/graphql/mutations/createCustomerPortalSession";
import { GET_WORKSPACE_BILLING, GET_WORKSPACE_INVOICES } from "../graphql/queries/billing/billing";
import { CANCEL_WORKSPACE_PLAN } from "../graphql/mutations/billing/CancelWorkspacePlan";
import { useAppContext } from "@/context/AppContext";

export function useBillingData() {
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id;
 const planCancelPending = workspace?.planCancelPending || false;
 const planEndsAt = workspace?.planEndsAt || null;


  const { data: billingData, loading: loadingBilling, refetch: refetchBilling } = useQuery(GET_WORKSPACE_BILLING, {
    variables: { workspaceId },
    skip: !workspaceId,
  });

  const { data: invoicesData, loading: loadingInvoices } = useQuery(GET_WORKSPACE_INVOICES, {
    variables: { workspaceId },
    skip: !workspaceId,
  });

  const [createPortalSession, { loading: loadingPortal }] = useMutation(CREATE_CUSTOMER_PORTAL_SESSION);

    const [CancelWorkspacePlan, { loading: loadingCancelPlan }] = useMutation(CANCEL_WORKSPACE_PLAN);

  return {
    billing: billingData?.getWorkspaceBilling,
    invoices: invoicesData?.getWorkspaceInvoices || [],
    loading:  loadingBilling || loadingInvoices,
    createPortalSession,
    loadingPortal,
    workspaceId,
    refetchBilling,
    CancelWorkspacePlan,
    loadingCancelPlan,
    planCancelPending,
    planEndsAt,
    refetchWorkspace
  };
}
