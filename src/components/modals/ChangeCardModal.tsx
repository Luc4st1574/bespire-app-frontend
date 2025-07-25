// components/modals/ChangeCardPaymentElementModal.tsx
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import SpinnerSmall from "../ui/Spinner";
import Button from "../ui/Button";
import { CREATE_SETUP_INTENT } from "@/graphql/queries/billing/createSetupIntent";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ChangeCardPaymentElementModal({
  open,
  onClose,
  workspaceId,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
  onSuccess: () => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createSetupIntent, { loading: loadingSetup }] = useMutation(CREATE_SETUP_INTENT);

  useEffect(() => {
    if (open && workspaceId) {
      (async () => {
        try {
          const { data } = await createSetupIntent({ variables: { workspaceId } });
          setClientSecret(data.createSetupIntent);
        } catch {
          setClientSecret(null);
        }
      })();
    }
    if (!open) setClientSecret(null);
  }, [open, workspaceId, createSetupIntent]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100" leaveTo="opacity-0"
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
            {/* Panel: max-h-[90vh] y flex-col */}
            <Dialog.Panel className="bg-white w-full max-w-md rounded-lg shadow-lg max-h-[90vh] flex flex-col">
              <Dialog.Title className="text-lg font-semibold px-8 pt-8 pb-2">Change Payment Card</Dialog.Title>
              
              {/* SCROLLABLE Content: crece y hace scroll si hay overflow */}
              <div className="flex-1 overflow-y-auto px-2 py-2 min-h-0">
                {!clientSecret || loadingSetup ? (
                  <div className="flex items-center justify-center py-10">
                    <SpinnerSmall color="text-black" />
                  </div>
                ) : (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <ChangeCardPaymentForm
                      onClose={onClose}
                      onSuccess={onSuccess}
                    />
                  </Elements>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// --- Internal Payment Form ---
function ChangeCardPaymentForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe not loaded yet.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message || "Card error");
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
      <div className="flex-1 px-1">
        <PaymentElement />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      <div className="flex justify-end gap-2 mt-2 sticky bottom-0 bg-white pt-2 pb-4">
        <Button
          type="button"
          variant="gray"
          size="md"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="green2"
          size="md"
          disabled={!stripe || loading}
        >
          {loading ? <SpinnerSmall color="text-white" /> : "Save Card"}
        </Button>
      </div>
    </form>
  );
}
