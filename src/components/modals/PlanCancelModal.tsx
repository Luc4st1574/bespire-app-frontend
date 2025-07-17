/* eslint-disable @next/next/no-img-element */
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../ui/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthActions } from "@/hooks/useAuthActions";

// Lista de motivos de cancelación
const REASONS = [
  "Our needs have shifted, so we no longer need the service.",
  "The pricing doesn’t fit our budget, causing cost concerns.",
  "The service fell short of expectations and value.",
  "We’re moving to another provider with a better solution.",
  "Taking a break but might return later.",
  "Other – Let us know",
];

export default function PlanCancelModal({
  open,
  onClose,
  cancellationEndDate, // fecha tipo "March 30, 2025"
  onSubmit, // async (reason, otherText) => Promise<void>
  onSupport, // función para botón "Talk to Support"
  state: controlledState, // para mostrar el último modal siempre si quieres, sino maneja el estado interno
}: {
  open: boolean;
  onClose: () => void;
  cancellationEndDate?: string;
  onSubmit?: (reason: string, otherText?: string) => Promise<void> | void;
  onSupport?: () => void;
  state?: "start" | "reason" | "done";
}) {
      const router = useRouter();
      const {  logout } = useAuthActions();
  // States

  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Permite controlar el estado externo o dejarlo interno
    const [currentStep, setStep] = useState<"start" | "reason" | "done">(controlledState || "start");

    // Reinicia todo al cerrar
    function handleClose() {
        setStep("start");
        setSelected(null);
        setOtherText("");
        setSubmitting(false);
        onClose();
    }

  const handleLogout = async () => {
    console.log("logout")
    try {
       logout();
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to logout.");
    } 
  };

  // Envía encuesta y pasa al modal final
  async function handleSubmit() {
    if (!selected) return;
    setSubmitting(true);
    try {
      await onSubmit?.(selected, selected === REASONS[5] ? otherText : undefined);
      setStep("done");
    } catch (e) {
      alert("There was an error. Please try again.");
    }
    setSubmitting(false);
  }

  // Render
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white w-full max-w-xl rounded-xl p-8 shadow-xl flex flex-col items-center">
              <button
                className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-black"
                onClick={handleClose}
                aria-label="Close"
                type="button"
              >
                &times;
              </button>

              {/* STEP 1: Confirmación de cancelación */}
              {currentStep === "start" && (
                <>
                  <div className="flex flex-col items-center mt-2">
                    <img src="/assets/icons/waving-hand.svg" alt="" />
                    <h2 className="text-2xl font-medium text-center mb-3">
                      Goodbye for Now –<br />
                      Before You Go, A Quick Note..
                    </h2>
                    <p className="text-center text-gray-700 ">
                      You&apos;ll retain access to all remaining credits and services until{" "}
                      <b>{cancellationEndDate || "March 30, 2025"}</b>.
                      You can always reactivate your plan before that date.
                    </p>
                  </div>
                  <div className="flex gap-4 w-full mt-4">
                    <Button
                    type="button"
                      variant="outlineG"
                      size="lg"
                      className="flex-1 text-sm"
                      onClick={handleClose}
                    >
                      Keep My Plan
                    </Button>
                    <Button
                        type="button"
                      variant="green2"
                      size="lg"
                      className="flex-1 text-sm"
                      onClick={() => {
                        console.log('setStep("reason")')
                        setStep("reason")
                      }}
                    >
                      Continue with Cancellation
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 2: Encuesta de motivo */}
              {currentStep === "reason" && (
                <>
                  <h2 className="text-2xl font-medium mb-2 text-center">Reason for Cancellation</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    To help us improve, please select a reason for your cancellation:
                  </p>
                  <div className="flex flex-col gap-3 w-full mb-6">
                    {REASONS.map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        className={clsx(
                          "px-4 py-3 rounded-lg border text-left transition focus:outline-none",
                          selected === reason
                            ? "border-[#82C683] bg-[#F6FBF5] text-[#27352B]"
                            : "border-gray-200 hover:bg-[#F5F6F6]"
                        )}
                        onClick={() => {
                          setSelected(reason);
                          if (reason !== REASONS[5]) setOtherText("");
                        }}
                      >
                        {reason}
                      </button>
                    ))}
                    {/* Input para "Other" */}
                    {selected === REASONS[5] && (
                      <input
                        type="text"
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                        placeholder="Tell us why"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex gap-4 w-full mt-2">
                    <Button
                    type="button"
                      variant="outlineG"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep("start")}
                    >
                      Go Back
                    </Button>
                    <Button
                    type="button"
                      variant="green2"
                      size="lg"
                      className="flex-1"
                      disabled={
                        !selected ||
                        (selected === REASONS[5] && otherText.trim() === "") ||
                        submitting
                      }
                      onClick={handleSubmit}
                    >
                      {submitting ? "Submitting..." : "Submit & Continue"}
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 3: Confirmación */}
              {currentStep === "done" && (
                <>
                  <div className="flex flex-col items-center mt-2 gap-4">
                    <img src="/assets/icons/cancel_icon.svg" alt="" />
                    <h2 className="text-2xl font-semibold text-center mb-3">
                      Your Plan Has Been Canceled
                    </h2>
                    <p className="text-center text-gray-700 mb-6">
                      You&apos;ll still have access to your remaining credits and services until <b>{cancellationEndDate || "March 30, 2025"}</b>.
                      If you decide to return, reactivating is seamless.
                    </p>
                  </div>
                  <div className="flex gap-4 w-full mt-4">
                    <Button
                    type="button"
                      variant="outlineG"
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                         router.push("/dashboard");
                      }
                        
                      }
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                    type="button"
                      variant="green2"
                      size="lg"
                      className="flex-1"
                      onClick={onSupport}
                    >
                      Talk to Support
                    </Button>
                  </div>
                  <div className="mt-6 text-xs text-center text-gray-500 flex items-center gap-2">
                    <img src="/assets/icons/info-circle.svg" alt="" />
                    Need help with anything before you go? Our team is happy to assist.
                  </div>
                  <a className="mt-6 text-xs text-center text-gray-500 flex items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
                  >
                    Logout
                  </a>
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
