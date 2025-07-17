"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/queries/getUserProfile";

type Plan = "starter" | "growth" | "pro";

type OnboardingData = {
  plan?: Plan;
  focusAreas: string[];
  teamMembers: { email: string; role: string }[];
  companyInfo: {
    companyName: string;
    industry: string;
    location: string;
    website: string;
    size: string;
    brandArchetype: string;
    elevatorPitch: string;
    logoUrl?: string;
    logo?:string
  };
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    focusAreas: [],
    teamMembers: [],
    companyInfo: {
      companyName: "",
      industry: "",
      location: "",
      website: "",
      size: "",
      brandArchetype: "",
      elevatorPitch: "",
    },
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const resetData = () => {
    setData({
      focusAreas: [],
      teamMembers: [],
      companyInfo: {
        companyName: "",
        industry: "",
        location: "",
        website: "",
        size: "",
        brandArchetype: "",
        elevatorPitch: "",
      },
    });
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

/* -----------------------------------------------
    Hook para autoload de onboardingData
   ----------------------------------------------- */
export function useOnboardingAutoLoad() {
  const { data: userData, loading } = useQuery(GET_USER_PROFILE);
  const { updateData } = useOnboarding();
  const alreadyLoaded = useRef(false);
 //   console.log("userdata", userData)
  useEffect(() => {
    if (
      !alreadyLoaded.current &&
      !loading &&
      userData?.getUserProfile?.onboardingData
    ) {
        //convertir el onboardingData a un objeto
        const onboardingData = JSON.parse(userData.getUserProfile.onboardingData);
        console.log("onboardingData", onboardingData)
        updateData(onboardingData);
        
      alreadyLoaded.current = true;
    }
  }, [loading, updateData, userData]);
}
