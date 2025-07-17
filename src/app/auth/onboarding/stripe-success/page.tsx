'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/queries/getUserProfile";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAuthActions } from "@/hooks/useAuthActions";

export default function StripeSuccessPage() {
  const router = useRouter();
    const { workspace, user } = useAppContext();
    const workspaceId = workspace?._id;
  const { data } = useQuery(GET_USER_PROFILE, {
    pollInterval: 2000,
  });

  const { login } = useAuthActions();
  const hasUpdated = useRef(false); // 🔥 aquí

  useEffect(() => {
    if (!hasUpdated.current && workspace?.hasPaid && workspace?.currentStep >= 4) {
      if (user) {
        hasUpdated.current = true; // ✅ Marcamos que ya actualizamos
        if(!data?.getUserProfile?.hasVisitedDashboard){
        router.replace("/auth/welcome");
        }else{
  router.replace("/dashboard");
        }
      }
   
    }
  }, [data, router, login, user, workspace?.hasPaid, workspace?.currentStep]);

  return (
    <div className="w-full flex flex-col items-center justify-center z-10 relative px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Payment Processing... 🔄
      </h1>
      <p className="text-center mb-8">
        Please wait while we confirm your payment with Stripe.
      </p>
    </div>
  );
}
