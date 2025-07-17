/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import SpinnerSmall from "../ui/Spinner";
import { showSuccessToast } from "../ui/toast";
import { workspaceSchema, WorkspaceSchema } from "@/schemas/workspaceSchema";
import { UPDATE_WORKSPACE_SETTINGS } from "@/graphql/mutations/workspace/updateWorkspaceSettings";
import Button from "../ui/Button";
import Switch from "../ui/Switch";
import TeamMembersManager from "./TeamMembersManager";
import { useAppContext } from "@/context/AppContext";

export default function WorkspaceSettings() {
  const { workspace, refetchWorkspace, loadingWorkspace:loading } = useAppContext();
  const [formError, setFormError] = useState<string | null>(null);
  const [updateWorkspace, { loading: loadingUpdate }] = useMutation(UPDATE_WORKSPACE_SETTINGS);

  // Guarda valores iniciales para detectar cambios
  const initialValues = useRef<WorkspaceSchema | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    mode: "onChange",
    defaultValues: {
      workspaceName: "",
      defaultRequestsView: "List",
      quickLinks: true,
      getStarted: true,
    },
  });
const quickLinksValue = watch("quickLinks");
const getStartedValue = watch("getStarted");
  // Cargar datos iniciales
  useEffect(() => {
    if (workspace) {
      console.log("si hay workspace ", workspace)
      const val = {
        workspaceName: workspace.companyName || workspace.name || "",
        defaultRequestsView: workspace.defaultRequestsView || "List",
        quickLinks: workspace.quickLinks ?? true,
        getStarted: workspace.getStarted ?? true,
      };
      //@ts-ignore
      reset(val);
      //@ts-ignore
      initialValues.current = val;
    }
  }, [workspace, reset]);

  // Compara fields modificados
  function getModifiedFields(values: WorkspaceSchema) {
    if (!initialValues.current) return values;
    const changed: Partial<WorkspaceSchema> = {};
    Object.entries(values).forEach(([key, val]) => {
      if ((initialValues.current as any)[key] !== val) {
        //@ts-ignore
        changed[key as keyof WorkspaceSchema] = val;
      }
    });
    return changed;
  }

  // Enviar cambios
  const onSubmit = async (data: WorkspaceSchema) => {
    setFormError(null);
    const toSave = getModifiedFields(data);
    if (Object.keys(toSave).length === 0) {
      setFormError("You haven't changed anything!");
      return;
    }
    try {
      await updateWorkspace({
        variables: { workspaceId: workspace?._id, input: toSave },
      });
      showSuccessToast("Workspace updated!");
      refetchWorkspace();
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong");
    }
  };

  // Manejo de errores del formulario
  const onError = () => window.scrollTo({ top: 0, behavior: "smooth" });
 if (loading)
    return (
      <>
        <div>
          <p className="text-center text-gray-500 mt-4">
            Loading workspace information...
          </p>
        </div>
      </>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} id="workspace-settings-form">
      <div className="max-w-6xl mx-auto bg-[#F6F7F7] rounded-md p-8 flex flex-col gap-4">
        {formError && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {formError}
          </div>
        )}

        {/* Workspace Name */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Workspace Name</label>
          <div>
            <input
              {...register("workspaceName")}
              placeholder="Workspace Name"
              className={`bg-white outline-none mt-1 block w-full border rounded-md p-2 ${errors.workspaceName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.workspaceName && (
              <p className="text-red-500 text-xs mt-1">{errors.workspaceName.message}</p>
            )}
          </div>
        </div>

        {/* Default Requests View */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Default Requests View</label>
          <div>
            <select
              {...register("defaultRequestsView")}
              className={`bg-white outline-none mt-1 block w-full border rounded-md p-2 ${errors.defaultRequestsView ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="List">List</option>
              <option value="Board">Board</option>
            </select>
          </div>
        </div>

        {/* Quick Links Toggle */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Quick Links on Dashboard</label>
          <div>
            <Switch
              checked={!!quickLinksValue}
              onChange={(val) => setValue("quickLinks", val, { shouldDirty: true })}
            />
          </div>
        </div>

        {/* Get Started Toggle */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Get Started on Dashboard</label>
          <div>
            <Switch
      checked={!!getStartedValue}
      onChange={(val) => setValue("getStarted", val, { shouldDirty: true })}
    />
          </div>
        </div>
      </div>
             <h2 className="font-medium text-lg mb-4 mt-4">Manage Team Members</h2>
    {workspace?._id && (
        <TeamMembersManager workspaceId={workspace._id} ownerId={workspace.owner?._id} />
    )}
      {/* Footer Actions */}
      <div className="flex justify-center items-center mt-6 gap-6">
         <Button
          type="button"
          variant="outlineG"
          size="lg"
          className="w-[200px]"
           onClick={() => {
            if (initialValues.current) reset(initialValues.current);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="gray" size="lg" className="w-[200px]">
         <div className="flex items-center justify-center gap-2">
        {loadingUpdate && (<SpinnerSmall color="text-black" />)}
            <span>Save</span>
         </div>
        </Button>
        
      </div>
    </form>
  );
}
