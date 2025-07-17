/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useBillingData } from "@/hooks/useBillingData";
import SpinnerSmall from "../ui/Spinner";
import { useState } from "react";
import ChangeCardModal from "../modals/ChangeCardModal";
import { showSuccessToast } from "../ui/toast";
import UpgradePlanModal from "../modals/UpgradePlanModal";
import PlanCancelModal from "../modals/PlanCancelModal";

export default function PlansBillingSettings() {
  const {
    billing,
    invoices,
    loading,
    refetchBilling,
    createPortalSession,
    loadingPortal,
    workspaceId,
    CancelWorkspacePlan,
    loadingCancelPlan,
    planCancelPending,
    planEndsAt,
    refetchWorkspace,
  } = useBillingData();
  console.log("PlansBillingSettings billing", billing);
  console.log("PlansBillingSettings invoices", invoices);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const router = useRouter();

  const now = new Date();
  const endsAtDate = planEndsAt ? new Date(planEndsAt) : null;
  const isCancelPending = !!planCancelPending;
  const isPlanExpired = isCancelPending && endsAtDate && now > endsAtDate;

  // Mostrar el modal si el plan fue cancelado (en cualquier estado)
  let cancelModalState: "start" | "reason" | "done" = "start";
  if (isCancelPending && isPlanExpired) {
    cancelModalState = "done"; // Plan cancelado y expirado
  } else if (isCancelPending) {
    cancelModalState = "done"; // Plan cancelado pero aún activo, muestra primer paso
  } else {
    cancelModalState = "start"; // Ni siquiera está cancelado (ni deberías mostrar el modal)
  }

  console.log("isCancelPending", isCancelPending);

  const handleCancelPlan = async (reason: string, other: string) => {
    try {
      await CancelWorkspacePlan({
        variables: {
          input: {
            workspaceId,
            reason,
            other,
          },
        },
      });
      setShowCancelModal(false);

      showSuccessToast("Subscription cancelled successfully!");
      await refetchWorkspace();
      await refetchBilling();
      router.refresh();
    } catch (error) {
      console.log("Error cancelling subscription:", error);
      showSuccessToast("Failed to cancel subscription. Please try again.");
    }
  };

  if (loading)
    return (
      <>
        <div>
          <p className="text-center text-gray-500 mt-4">
            Loading billing information...
          </p>
        </div>
      </>
    );
  function extractProductName(description = "") {
    // "1 × Bespire growth (at $1,695.00 / month)"
    const match = description.match(/×\s(.+?)\s\(/);
    return match ? match[1] : description;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* PLAN SECTION */}
      <h2 className="font-medium text-2xl mb-6">Plan</h2>
      <div className="bg-[#F6F7F7] rounded-lg p-8 mb-8">
        {/* ... igual que antes ... */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 items-center mb-4">
            <span className="font-medium">Current Plan</span>
            <span className="font-medium text-lg">{billing?.currentPlan}</span>
            <div className="flex gap-2 ml-2">
              <Button
                type="button"
                variant="green2"
                size="md"
                onClick={() => {
                  if (!isCancelPending) setShowUpgradeModal(true);
                }}
              >
                Upgrade
              </Button>
              <Button
                type="button"
                variant="outlineG"
                size="md"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center mb-4">
            <span className="font-medium">Credit Usage</span>
            <span>{billing?.creditUsage}</span>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="green2"
                size="md"
                className="ml-2"
                onClick={() => {
                  if (!isCancelPending) setShowUpgradeModal(true);
                }}
              >
                Upgrade
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center justify-start">
            <span className="font-medium">Payment Method</span>
            <div className="flex items-center gap-2">
              {billing?.paymentMethod?.brand && (
                <img
                  src={`/assets/cards/${billing.paymentMethod.brand}.svg`}
                  alt={billing.paymentMethod.brand}
                  className="w-8 h-6"
                />
              )}
              <span className="font-medium">
                {billing?.paymentMethod?.brand
                  ? `VISA ending in ${billing.paymentMethod.last4}`
                  : "No card added"}
              </span>
            </div>
            <div className="flex justify-end items-center">
              <Button
                type="button"
                variant={billing?.paymentMethod?.brand ? "gray" : "green2"}
                size="md"
                className="ml-2"
                onClick={() => {
                  if (!isCancelPending) setShowCardModal(true);
                }}
              >
                {billing?.paymentMethod?.brand ? "Change" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* INVOICES */}
      <h2 className="font-semibold text-2xl mb-6">Invoices</h2>
      <div className="bg-[#F6F7F7] rounded-lg p-8">
        {/* ... igual que antes, pero con data de invoices ... */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium"></span>
          <a href="#" className="underline font-medium">
            Download all invoices
          </a>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 ">
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                  <span>Plan</span>
                  <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                  <span>Total</span>
                  <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 text-center font-medium ">
                <div className="flex items-center gap-1 justify-center">
                  <span>Status</span>
                  <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 text-right font-medium ">
                <div className="flex items-center gap-1 justify-end">
                  <span>Actions</span>
                  <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv: any, idx: number) => (
              <tr key={inv.id || idx} className="border-b border-gray-100">
                <td className="py-2">{inv.date}</td>
                <td className="py-2">{extractProductName(inv.plan)}</td>
                <td className="py-2">{inv.amount}</td>
                <td className="py-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[#62864D]">
                    <span className="w-2 h-2 rounded-full bg-[#62864D] inline-block"></span>
                    {inv.status}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <a
                      href={inv.pdfUrl}
                      className="mr-4 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    <a href={inv.pdfUrl} className="underline" download>
                      Download
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer igual */}
      <div className="flex justify-center items-center mt-8 gap-6">
        <Button
          type="button"
          variant="outlineG"
          size="lg"
          className="w-[200px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="gray"
          size="lg"
          className="w-[200px]"
          disabled
        >
          Save
        </Button>
      </div>
      <ChangeCardModal
        open={showCardModal}
        onClose={() => setShowCardModal(false)}
        workspaceId={workspaceId}
        onSuccess={() => {
          refetchBilling();
          setShowCardModal(false);
          showSuccessToast("Payment method updated successfully!");
          // Refresca la data del workspace o billing aquí si quieres
        }}
      />
      <UpgradePlanModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        //@ts-ignore
        workspaceId={workspaceId}
        currentPlan={billing?.currentPlan} // "starter", "growth", "pro"
      />
      <PlanCancelModal
        open={isCancelPending || showCancelModal}
        // Si está cancelando, nunca deja cerrar, solo permite acciones del modal
        onClose={() => {
          if (!isCancelPending) setShowCancelModal(false);
        }}
        cancellationEndDate={
          planEndsAt
            ? new Date(planEndsAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : undefined
        }
        state={isCancelPending ? "done" : cancelModalState}
        onSubmit={async (reason: string, other) => {
          //@ts-ignore
          if (!isCancelPending) await handleCancelPlan(reason, other);
        }}
        onSupport={() => {
          // Lógica para soporte, ejemplo: window.open('mailto:support@bespire.com')
        }}
      />
    </div>
  );
}
