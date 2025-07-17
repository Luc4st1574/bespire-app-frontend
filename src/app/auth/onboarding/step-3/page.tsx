"use client";
import StepGuard from "@/components/StepGuard";

import { useRouter } from "next/navigation";
import {
  useOnboarding,
  useOnboardingAutoLoad,
} from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import FooterNav from "@/components/layouts/OnboardingLayout/FooterNav";
import CompanyAvatarUploader from "@/utils/CompanyAvatarUploader";
import { UPDATE_ONBOARDING_PROGRESS_MUTATION } from "@/graphql/mutations/updateOnboardingProgress";
import { useWorkspace } from "@/hooks/useWorkspace";
import { GET_COMPANY_DATA_BY_WORKSPACE_ID } from "@/graphql/queries/workspace/getCompanyDataWorkspace";
import { UPDATE_COMPANY_DATA } from "@/graphql/mutations/workspace/updateCompanyData";
import { UPDATE_CURRENT_STEP } from "@/graphql/mutations/workspace/updateCurrentStep";
import { useAppContext } from "@/context/AppContext";

const industries = ["B2B", "B2C", "Non-profit", "Startup", "Enterprise"];
const sizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
const archetypes = [
  "The Hero",
  "The Creator",
  "The Caregiver",
  "The Explorer",
  "The Ruler",
];

export default function DefineCompanyPage() {
  const { workspace, refetchWorkspace } = useAppContext();
  const workspaceId = workspace?._id;

  const { data:dataCompany, loading:loadingDataComany, error:errorDataCompany, refetch } = useQuery(GET_COMPANY_DATA_BY_WORKSPACE_ID, {
    variables: { workspaceId: workspaceId },
  });


const [updateCompanyData, { data:dataUpdateCompany, 
  loading:loadingUpdateCompany, error:errorUpdateCompany }] = useMutation(UPDATE_COMPANY_DATA);

  const [updateCurrentStep] = useMutation(UPDATE_CURRENT_STEP);
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [size, setSize] = useState(sizes[0]);
  const [brandArchetype, setBrandArchetype] = useState(archetypes[0]);
  const [elevatorPitch, setElevatorPitch] = useState("");

  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [communicationStyle, setCommunicationStyle] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [valuePropositions, setValuePropositions] = useState("");






  useEffect(() => {
    if (dataCompany && dataCompany.getCompanyDataByWorkspaceId) {
      const data = dataCompany.getCompanyDataByWorkspaceId;
      console.log("Company data loaded:", data);
      // Asignar los valores del objeto data a los estados correspondientes
      setCompanyName(data.companyName || "");
      setIndustry(data.industry || industries[0]);
      setLocation(data.location || "");
      setWebsite(data.website || "");
      setSize(data.size || sizes[0]);
      setBrandArchetype(data.brandArchetype || archetypes[0]);
      setElevatorPitch(data.elevatorPitch || "");
      setAvatarUrl(data.companyImg || "");
    }

  }, [dataCompany]);


  const handleNext = async () => {
    setLoading(true);
    if (!companyName.trim()) {
      alert("Please enter a company name.");
      setLoading(false);
      return;
    }

    updateCompanyData({
      variables: {
        workspaceId: workspaceId,
        input: {
          companyName: companyName,
          companyImg:   avatarUrl,
          companyWebsite: website,
          companyIndustry: industry,
          companySize: size,
          location: location,
          brandArchetype: brandArchetype,
          communicationStyle: communicationStyle,
          elevatorPitch: elevatorPitch,
          mission: mission,
          vision: vision,
          valuePropositions: valuePropositions
        }
      }
    });
    await refetch();
    const resStep = await updateCurrentStep({
      variables: {
        workspaceId: workspaceId,
        currentStep: 4
      },
    });
    await refetchWorkspace();

    console.log("avanzar al paso 4");
    router.push("/auth/onboarding/step-4");


  };

  return (
    <StepGuard>
      <OnboardingLayout>
        <div className="w-full mt-10 flex flex-col items-center z-10 relative px-4">
          {/* Header con logo y nombre */}
          <div className="flex items-center gap-4 mb-8">
            <CompanyAvatarUploader
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
            />
            <div>
              <h2 className="text-xl font-semibold">
                {companyName || "Company Name"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company Website
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {industries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {sizes.map((item) => (
                  <option key={item}>{item} Employees</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Brand Archetype
              </label>
              <select
                value={brandArchetype}
                onChange={(e) => setBrandArchetype(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {archetypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Communication Style
              </label>
              <input
                type="text"
                value={communicationStyle}
                onChange={(e) => setCommunicationStyle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter your Communication Style"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Elevator Pitch
              </label>
              <textarea
                value={elevatorPitch}
                onChange={(e) => setElevatorPitch(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={3}
                placeholder="Enter your Elevator Pitch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mission</label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vision</label>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Value Proposition(s)
              </label>
              <textarea
              value={valuePropositions}
                  onChange={(e) => setValuePropositions(e.target.value)}
               
                placeholder="Enter your Value Propositions, one per line"
                className="w-full border border-gray-300 rounded p-2"
                rows={4}
                
              />
            </div>
          </div>
        </div>
        <FooterNav
          loading={loading}
          isNextDisabled={!companyName.trim()}
          onNext={() => handleNext()}
          textFooter="Fill in your company’s details."
        />
      </OnboardingLayout>
    </StepGuard>
  );
}
