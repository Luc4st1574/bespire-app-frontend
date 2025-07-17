"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/AppContext";


export default function WelcomePage() {
  const router = useRouter();
  const { user, loadingUser:loading } = useAppContext();
    const [NotWelcome, setNotWelcome] = useState(false);

  useEffect(() => {
    console.log("guard welcome user", user);
    if (!loading) {
    const hasVisitedDashboard = user?.hasVisitedDashboard || false;
        if (user && hasVisitedDashboard) {
          router.replace("/dashboard");
        }else{
            setNotWelcome(true);
        }
    }
  }, [user, loading, router]);




 if (loading || !NotWelcome ) {
    return <Spinner />;
  }

  return (
      <div className="w-full flex items-center justify-center z-10 relative px-4">
       <div className="flex flex-col items-center justify-center gap-6">
       <h1 className="text-4xl text-center">Welcome to Bespire. <br />
        Let’s Build Bold Ideas Together.</h1>
        <p className="text-base">Your workspace is ready—every idea starts here.</p>
        <Button
       href="/dashboard"
              variant="green2"
              label="Explore your Workspace"
          
            >
            </Button>
       </div>
      </div>
  );
}
