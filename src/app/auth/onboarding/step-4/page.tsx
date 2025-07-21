/* eslint-disable @next/next/no-img-element */
"use client";
import StepGuard from "@/components/StepGuard";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "@/graphql/mutations/createCheckoutSession";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import { useState } from "react";
import clsx from "clsx";
import FooterNav from "@/components/layouts/OnboardingLayout/FooterNav";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAppContext } from "@/context/AppContext";

const plansPrices = [
  {
    id: "starter",
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
    btnBg: "bg-white",
    btnColorLabel: "text-black",
    highlight: false,
  },
  {
    id: "growth",
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
    btnBg: "bg-brand-neon",
    btnColorLabel: "text-brand-dark",
    highlight: true,
  },
  {
    id: "pro",
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
    btnBg: "bg-white",
    highlight: false,
    btnColorLabel: "text-black",
  },
];


export default function ChoosePlanPage() {
  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id;

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSelectPlan = async (planId: string) => {
    setLoading(true);
    console.log("handleSelectPlan", planId)
    try {
      const { data } = await createCheckoutSession({
        variables: {
          plan: planId,
          workspaceId: workspaceId,
        },
      });

      if (data?.createCheckoutSession) {
        window.location.href = data.createCheckoutSession;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to redirect to payment.");
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <StepGuard>
      <OnboardingLayout>
        <div className="w-full flex flex-col items-center justify-center z-10 relative px-4">
          <p className="text-base font-medium mb-8 text-center mt-8">
            Plans that grow with your vision, whether you’re a team of one or a
            powerhouse crew.
          </p>
          <div className="grid md:grid-cols-3 gap-2   text-left">
            {plansPrices.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={clsx(
                  "rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between border transition-all duration-200",
                  "shadow-outline-md", // Puedes personalizar esta sombra
                  selectedPlan === plan.id
                    ? "border-brand-dark bg-gray-100"
                    : "border-[#E2E6E4] hover:bg-[#F6F8F5] hover:border-[#758C5D]",
                )}
              >
                <div className="p-6 ">
                  <div className="flex gap-4 items-center">
                  <img
                      src={plan.icon}
                      alt={`${plan.name} icon`}
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


                  <ul className=" text-xs mb-8 flex flex-col gap-4">
                    {plan.features.map((featureKey) => (
                      // eslint-disable-next-line react/jsx-key
                      <li className="flex items-center gap-2" key={featureKey}>
                        <img src={plan.iconCheck} className="w-4 h-4" />
                        {featureKey}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </div>
        <FooterNav
          loading={loading}
          isNextDisabled={!selectedPlan}
          onNext={() => handleSelectPlan(selectedPlan!)}
          textFooter="By continuing, you agree to Bespire’s Terms of Use <br> and confirm you have read our Privacy Policy."
        />

      </OnboardingLayout>
    </StepGuard>
  );
}