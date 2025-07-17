import { useQuery } from "@apollo/client";
import { GET_REQUEST_DETAIL } from "@/graphql/queries/requests/getRequestDetail";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import RequestOverviewSidebar from "./RequestOverviewSidebar";
import RequestMainContent from "./RequestMainContent";
// Puedes eliminar el mockRequestDetail porque ya usas la API real

export default function RequestDetailsModal({
  open,
  onClose,
  requestId,
  onBackToMain, // <- nueva función para volver al padre
  onOpenSubtask,
  parentRequest,
}) {
  console.log("RequestDetailsModal rendered with requestId:", requestId);
  // Usar Apollo para obtener el detalle real
  const { data, loading, error } = useQuery(GET_REQUEST_DETAIL, {
    variables: { id: requestId },
    skip: !requestId,
    fetchPolicy: "network-only", // o 'cache-and-network'
  });

  console.log(
    "RequestDetailsModal data:",
    data,
    "loading:",
    loading,
    "error:",
    error
  );

  // Puedes manejar un loader bonito aquí
  if (!open) return null;

  // Loader visual
  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} className="relative z-50 p-4">
        <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="fixed inset-0 flex justify-end p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-2xl flex w-full max-w-4xl overflow-hidden items-center justify-center">
            <div className="p-10 text-gray-500">Loading request...</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  // Error visual
  if (error) {
    return (
      <Dialog open={open} onClose={onClose} className="relative z-50 p-4">
        <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="fixed inset-0 flex justify-end p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-2xl flex w-full max-w-4xl overflow-hidden items-center justify-center">
            <div className="p-10 text-red-500">
              Error loading request detail
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  const request = data?.requestDetail;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="fixed inset-0 flex justify-end p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
          <RequestOverviewSidebar request={request} onBackToMain={onBackToMain} />
          <RequestMainContent parentRequest={parentRequest} request={request} onClose={onClose} onBackToMain={onBackToMain} onOpenSubtask={onOpenSubtask} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
