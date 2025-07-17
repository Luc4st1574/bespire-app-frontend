/* eslint-disable @next/next/no-img-element */
"use client";
import StepGuard from "@/components/StepGuard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import FooterNav from "@/components/layouts/OnboardingLayout/FooterNav";
import { useWorkspace } from "@/hooks/useWorkspace";
import Spinner from "@/components/Spinner";
import { UPDATE_CURRENT_STEP } from "@/graphql/mutations/workspace/updateCurrentStep";
import TeamMembersManager from "@/components/workspace/TeamMembersManager";
import { useAppContext } from "@/context/AppContext";

export default function BuildTeamPage() {
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id;

  const [updateCurrentStep] = useMutation(UPDATE_CURRENT_STEP);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    const resStep = await updateCurrentStep({
      variables: {
        workspaceId: workspaceId,
        currentStep: 3,
      },
    });
    await refetchWorkspace();
    router.push("/auth/onboarding/step-3");
  };


  return (
    <StepGuard>
      <OnboardingLayout>
        <div className="w-full flex flex-col items-center justify-center z-10 relative px-4">
          <p className="max-w-2xl text-lg font-medium mb-8 text-center mt-8">
            Add collaborators to your workspace. Together, we’ll make every idea
            count.
          </p>
          {workspace?._id && (
            <TeamMembersManager
              workspaceId={workspace._id}
              ownerId={workspace.owner?._id}
            />
          )}
        </div>
        <FooterNav
          loading={loading}
          onNext={handleNext}
          textFooter="Your plan allows you to add up to 4 people."
        />
      </OnboardingLayout>
    </StepGuard>
  );
}
