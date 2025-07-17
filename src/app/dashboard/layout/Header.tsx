import Button from "@/components/ui/Button";
import { Plus, Search } from "lucide-react";
import IconMessage from "@/assets/icons/icon_message.svg";
import IconNotification from "@/assets/icons/icon_notification.svg";
import CreateRequestModal from "@/components/modals/CreateRequestModal";
import { useAppContext } from "@/context/AppContext";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/usePermission";


export default function Header({ titleHead }: { titleHead: string }) {
 const { showModalRequest, setShowModalRequest, setParentId } = useAppContext();
 const canCreateRequest = usePermission(PERMISSIONS.CREATE_REQUESTS);
  return (
    <header className="px-6 py-4 bg-[#F6FDF0]">
      <div className="flex items-center justify-between border border-[#CDEDB6] rounded-full px-6 py-2 bg-white">
        {/* Texto de bienvenida */}
        <div className="text-xl font-medium text-[#181B1A]">
          {titleHead}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          {/* Botón Create Request */}
          <Button
            type="button"
            variant="green2"
            size="sm"
            onClick={() => {
              if (!canCreateRequest) {
                alert("You do not have permission to create requests.");
                return;
              }
              setShowModalRequest(true);
              setParentId(null);
            }}
          >
            <div className="flex items-center gap-2">
              <span>Create Request </span>
              <Plus className="w-4 h-4" />
            </div>
          </Button>

          {/* Botón Search */}
          <Button
            type="button"
            variant="gray"
            size="sm"
            onClick={() => console.log("clic en search")}
          >
            <div className="flex items-center gap-2">
              <span>Search </span>
              <Search className="w-4 h-4" />
            </div>
          </Button>

          {/* Íconos simples */}
          <IconMessage className="w-5 h-5 cursor-pointer " />
          <IconNotification className="w-5 h-5  cursor-pointer" />
        </div>
      </div>
        <CreateRequestModal
          isOpen={showModalRequest}
          onClose={() => setShowModalRequest(false)}
        />
    </header>
  );
}
