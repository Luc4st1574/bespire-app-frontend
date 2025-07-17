/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "@/graphql/mutations/createCheckoutSession";
import SpinnerSmall from "../ui/Spinner";
import clsx from "clsx";
import Button from "../ui/Button";

const plansPrices = [
  {
    id: "starter",
    order: 0,
    name: "Starter Plan",
    price: "$695/mo",
    description:
      "Perfect for smaller projects or assistance, with the flexibility to grow",
    icon: "/assets/icons/shapes2.svg",
    iconCheck: "/assets/icons/check2.svg",
    features: [
      "Ideal for small businesses",
      "100 credits for all services",
      "1 brand supported",
      "1 active order at a time",
      "Access to top-notch designers",
    ],
  },
  {
    id: "growth",
    order: 1,
    name: "Growth Plan",
    price: "$1,695/mo",
    description:
      "Designed for expanding teams, with more credits and room for up to three brands",
    icon: "/assets/icons/paper-plane.svg",
    iconCheck: "/assets/icons/check2.svg",
    features: [
      "For growing businesses",
      "250 credits for diverse needs",
      "Support for up to 3 brands",
      "2 active orders at a time",
      "Access to top-notch designers",
      "Dedicated Project Manager & Creative Director",
    ],
  },
  {
    id: "pro",
    order: 2,
    name: "Pro Plan",
    price: "$3,495/mo",
    description:
      "The plan for large-scale operations with unlimited orders and multi-brand support",
    icon: "/assets/icons/flash.svg",
    iconCheck: "/assets/icons/check2.svg",
    features: [
      "For large agencies & businesses",
      "500 credits for high-volume work",
      "Support for up to 5 brands",
      "4 active orders at a time",
      "Full access to senior design team",
      "Dedicated Project Manager & Creative Director",
    ],
  },
];

export default function UpgradePlanModal({
  open,
  onClose,
  workspaceId,
  currentPlan,
}: {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
  currentPlan: string; // id del plan actual: 'starter' | 'growth' | 'pro'
}) {
  const [createCheckoutSession, { loading }] = useMutation(
    CREATE_CHECKOUT_SESSION
  );

  const successUrl = `${window.location.origin}/settings?showPlanModal=1`;
const cancelUrl =  `${window.location.origin}/settings?showError`;

if (!workspaceId) {
    console.error("Workspace ID is required for checkout session.");
    return null; // or handle error appropriately
  }

  // Botón de upgrade/cambiar plan
  const handleUpgrade = async (planId: string) => {
    try {
      const { data } = await createCheckoutSession({
  variables: {
    plan: planId,
    workspaceId,
    successUrl,
    cancelUrl,
  },
});
      if (data?.createCheckoutSession) {
        window.location.href = data.createCheckoutSession;
      }
    } catch (error) {
      alert("Failed to redirect to payment.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="fixed inset-0 flex justify-center">
        <DialogPanel className="w-full max-w-6xl  m-2 bg-white p-8 overflow-y-auto rounded-xl">
          {/* Header */}
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <img
              src="/assets/logos/logo_bespire.svg"
              className="h-12"
              alt="Bespire logo"
            />
          </div>
          <p className="text-base font-medium mb-8 text-center">
            Plans that grow with your vision, whether you’re a team of one or a
            powerhouse crew.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {plansPrices.map((plan) => {
              const isCurrent =
                plan.id.toLowerCase() === currentPlan?.toLowerCase();
              const currentOrder =
                plansPrices.find((p) => p.id === currentPlan?.toLowerCase())
                  ?.order ?? 0;
              const isUpgrade = plan.order > currentOrder;
              const isDowngrade = plan.order < currentOrder;
              return (
                <div
                  key={plan.id}
                  className={clsx(
                    "rounded-2xl overflow-hidden flex flex-col justify-between border transition-all duration-200",
                    isCurrent
                      ? "border-brand-dark bg-gray-100"
                      : "border-[#E2E6E4] hover:bg-[#F6F8F5] hover:border-[#758C5D]"
                  )}
                >
                  <div className="p-6 ">
                    <div className="flex gap-4 items-center">
                      <img
                        src={plan.icon}
                        alt={plan.name + " icon"}
                        className="w-5 h-5"
                      />
                      <h3 className="text-lg font-semibold ">{plan.name}</h3>
                    </div>
                    <p className=" text-xs graySmall">{plan.description}</p>
                    <p className="text-2xl font-semibold mt-5  mb-4">
                      {plan.price.split("/")[0]}
                      <span className=" text-xl font-medium text-[#6E8B90]">
                        /{plan.price.split("/")[1]}
                      </span>
                    </p>
                    {/* Botón de acción */}
                    <div className="w-full mt-3 mb-4">
                      {isCurrent ? (
                        <Button
                          disabled
                          variant="gray"
                          size="md"
                          className="w-full"
                        >
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="md"
                          className="w-full"
                          variant="green2"
                          disabled={loading}
                          onClick={() => handleUpgrade(plan.id)}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <SpinnerSmall color="text-white" />
                              {isUpgrade ? "Upgrading..." : "Downgrading..."}
                            </div>
                          ) : (
                            <>
                              {isUpgrade
                                ? `Upgrade to ${plan.name.replace(" Plan", "")}`
                                : `Downgrade to ${plan.name.replace(
                                    " Plan",
                                    ""
                                  )}`}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    <ul className=" text-xs mb-8 flex flex-col gap-4">
                      {plan.features.map((featureKey) => (
                        <li
                          className="flex items-center gap-2"
                          key={featureKey}
                        >
                          <img src={plan.iconCheck} className="w-4 h-4" />
                          {featureKey}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Footer ayuda/pricing expansion */}
          <div className="flex items-center justify-center mt-6 text-xs gap-2 text-[#5B6F59]">
            <img src="/assets/icons/paper-plane.svg" className="w-4 h-4" />
            Looking for expanded credits and services?{" "}
            <a href="mailto:hello@bespire.com" className="underline ml-1">
              Let’s talk pricing
            </a>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
