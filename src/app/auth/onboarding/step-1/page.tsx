/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import StepGuard from "@/components/StepGuard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ONBOARDING_PROGRESS_MUTATION } from "@/graphql/mutations/updateOnboardingProgress";
import FooterNav from "@/components/layouts/OnboardingLayout/FooterNav";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import { GET_FOCUSES_AREAS_WORKSPACE } from "@/graphql/queries/workspace/getWorkspaceBasisById";
import { useWorkspace } from "@/hooks/useWorkspace";
import Spinner from "@/components/Spinner";
import { UPDATE_FOCUS_AREAS } from "@/graphql/mutations/workspace/updateFocusAreas";
import { UPDATE_CURRENT_STEP } from "@/graphql/mutations/workspace/updateCurrentStep";
import { useAppContext } from "@/context/AppContext";

const focusOptions = [
  { label: "Graphic Design", icon: "/assets/icons/focus1.svg" },
  { label: "Video Editing", icon: "/assets/icons/focus2.svg" },
  { label: "Paid Ads Management", icon: "/assets/icons/focus3.svg" },
  { label: "Copywriting", icon: "/assets/icons/focus4.svg" },
  {
    label: "Content & Social Media Management",
    icon: "/assets/icons/focus5.svg",
  },
  { label: "UI/UX", icon: "/assets/icons/focus6.svg" },
  { label: "Email Marketing", icon: "/assets/icons/focus7.svg" },
  { label: "SEO & Blog Strategy", icon: "/assets/icons/focus8.svg" },
  { label: "App Design", icon: "/assets/icons/focus9.svg" },
];

function ShareFocusPage() {
  console.log("ShareFocusPage rendered");
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id;

  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [
    updateFocusAreas,
    {
      loading: loadingFocusAreas,
      error: errorFocusAreas,
      data: dataFocusAreas,
    },
  ] = useMutation(UPDATE_FOCUS_AREAS);
  const [updateCurrentStep] = useMutation(UPDATE_CURRENT_STEP);

  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: loadingQuery,
    refetch: refetchFocusAreas,
  } = useQuery(GET_FOCUSES_AREAS_WORKSPACE, {
    variables: { workspaceId },
    skip: !workspaceId,
  });

  console.log("data en ShareFocusPage", data);

  useEffect(() => {
    if (data?.getWorkspaceBasisById?.focusAreas) {
      setSelected(data.getWorkspaceBasisById.focusAreas);
    }
  }, [data?.getWorkspaceBasisById?.focusAreas]);

  const toggleFocus = (focus: string) => {
    if (selected.includes(focus)) {
      setSelected(selected.filter((item) => item !== focus));
    } else {
      setSelected([...selected, focus]);
    }
  };

const handleNext = async () => {
  setLoading(true);
  if (selected.length === 0) {
    alert("Please select at least one focus area.");
    return;
  }
  try {
    await updateFocusAreas({
      variables: {
        workspaceId,
        focusAreas: selected,
      },
    });
    await refetchFocusAreas();
    await updateCurrentStep({
      variables: {
        workspaceId: workspaceId,
        currentStep: 2,
      },
    });
    // Espera a que el workspace en el contexto tenga currentStep: 2
    let tries = 0;
    let updated = false;
    while (tries < 10 && !updated) {
      const { data } = await refetchWorkspace();
      if (data?.getWorkspaceBasisById?.currentStep === 2) {
        updated = true;
      } else {
        await new Promise(res => setTimeout(res, 150)); // espera 150ms y prueba de nuevo
      }
      tries++;
    }
    router.push("/auth/onboarding/step-2");
  } catch (error: any) {
    
      console.error("Error updating onboarding progress:", error);
      if (error.networkError) {
        console.error("Network error:", error.networkError);
      }
      if (error.graphQLErrors) {
        console.error("GraphQL errors:", error.graphQLErrors);
      }
      alert(
        error?.message ||
          error?.networkError?.result?.errors?.[0]?.message ||
          "Failed to update onboarding progress."
      );
  }
};





  if (loadingQuery) {
    return <Spinner />;
  }

  return (
    <StepGuard>
      <OnboardingLayout>
        <div className="w-full flex flex-col items-center justify-center z-10 relative px-4">
          <p className="max-w-2xl text-lg font-medium mb-8 text-center mt-8">
            What’s your creative priority? Let us align our expertise to amplify
            your projects. Don’t worry, you’ll have full access to every service
            we offer.
          </p>
          <div className="flex flex-col  md:flex-wrap gap-4">
            {Array.from({ length: Math.ceil(focusOptions.length / 3) }).map(
              (_, rowIndex) => {
                const rowItems = focusOptions.slice(
                  rowIndex * 3,
                  rowIndex * 3 + 3
                );
                return (
                  <div
                    key={rowIndex}
                    className="flex flex-col md:flex-row gap-4 w-full justify-center"
                  >
                    {rowItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => toggleFocus(item.label)}
                        className={`px-4 py-2 rounded-full  border border-[#6B6D68] 
              flex items-center justify-center gap-2 shadow text-sm transition
              ${
                selected.includes(item.label)
                  ? " text-[#6B6D68] bg-[#F6F8F5] border-2 border-[#758C5D]"
                  : " text-[#6B6D68] bg-white hover:border-black"
              }
            `}
                      >
                        <img src={item.icon} alt="" className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <FooterNav
          loading={loading}
          isNextDisabled={selected.length === 0}
          onNext={() => handleNext()}
          textFooter="(Select all that apply)"
        />
      </OnboardingLayout>
    </StepGuard>
  );
}
export default ShareFocusPage;
