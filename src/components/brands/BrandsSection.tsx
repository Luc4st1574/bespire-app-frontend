/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Button from "../ui/Button";
import ModalBrands from "../modals/ModalBrands";
import { useBrands } from "@/hooks/useBrands";
import Spinner from "../Spinner";
import { showSuccessToast } from "../ui/toast";
import Swal from "sweetalert2";
import { useAppContext } from "@/context/AppContext";
// Recibe workspaceId como prop
export default function BrandsSection() {
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id || "";
  const {
    brands,
    loading,
    createBrand,
    updateBrand,
    createState,
    updateState,
    removeBrand,
    removeState: deleteState,
    refetch,
  } = useBrands(workspaceId);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setShowModal(true);
  };

  const handleOpenEdit = (brand: any) => {
    setEditingBrand(brand);
    setShowModal(true);
  };
  const handleSubmit = async (formData: { name: string }) => {
    try {
      if (editingBrand) {
        //@ts-ignore
        await updateBrand({
          variables: {
            updateBrandInput: {
              id: editingBrand._id,
              name: formData.name,
              workspace: workspaceId,
            },
          },
        });
      } else {
        await createBrand({
          variables: {
            createBrandInput: { name: formData.name, workspace: workspaceId },
          },
        });
      }
      showSuccessToast("Brands Updated!");
      setShowModal(false);
    } catch (error: any) {
      // SweetAlert2 para errores
      // Primero buscamos si viene error.graphQLErrors
      let message = "Ocurrió un error inesperado.";
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        message = error.graphQLErrors.map((e: any) => e.message).join("\n");
      } else if (error.message) {
        message = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    console.log("handleDeleteBrand", brandId)
    try {
      await removeBrand({
        variables: { id: brandId, workspaceId },
      });
      setShowModal(false);
      showSuccessToast("Brand deleted successfully!");
      refetch();
    } catch (error: any) {
      let message = "Ocurrió un error al eliminar la marca.";
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        message = error.graphQLErrors.map((e: any) => e.message).join("\n");
      } else if (error.message) {
        message = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  console.log("BrandsSection rendered", brands);

  return (
    <section className="w-full max-w-6xl mx-auto">
      {/* Banner aquí si lo necesitas */}
      <img
        src="/assets/brands/brand_mock.webp"
        alt=""
        className="rounded-lg mb-6"
      />
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Your Brands</h3>
          <Button
            type="button"
            variant="green2"
            size="md"
            onClick={handleOpenCreate}
          >
            Add Brand +
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              {brands.map((brand: any) => (
                <div
                  key={brand._id}
                  className="bg-white rounded-xl border flex flex-col items-start gap-3 px-4
                   py-4 min-h-[200px] max-w-xs
                  border-2  border-[#E2E6E4] hover:shadow transition cursor-pointer"
                  onClick={() => handleOpenEdit(brand)}
                >
                  <div className="w-full h-full flex justify-center items-center">
                    <span className="font-bold text-2xl">{brand.name}</span>
                  </div>
                  <div className="w-full max-h-[50px] flex justify-between items-center">
                    <span className="text-gray-500">{brand.name}</span>
                    <img src="/assets/icons/arrow-l.svg" alt="" />
                  </div>
                </div>
              ))}
              {/* Add brand card */}
              <button
                className="flex flex-col cursor-pointer items-center justify-center 
                  bg-white border-2  border-[#E2E6E4] rounded-xl min-w-[320px] max-w-xs px-8 py-8 text-gray-500 hover:bg-gray-50 transition"
                onClick={handleOpenCreate}
              >
                <span className="text-4xl mb-3">+</span>
                <span className="font-medium text-lg">Add a Brand</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal para crear/editar brand */}
      <ModalBrands
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editingBrand={editingBrand}
        loading={createState.loading || updateState.loading}
        onDelete={() => {
          if (editingBrand) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                handleDeleteBrand(editingBrand._id);
              }
            });
          }
        }}
        deleting={deleteState.loading}
      />
    </section>
  );
}
