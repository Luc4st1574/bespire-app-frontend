/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";
const steps = [
    {
      title: "Set Up Your Brand Kit",
      description:
        "Upload your logo, define your brand colors, fonts, and tone of voice, and include references.",
      buttonLabel: "Go to Brands Page",
      buttonLink: "/dashboard/brands",
      icon: "/assets/icons/resources.svg",
    },
    {
      title: "Create Your First Request",
      description: "Submit your first creative task and get started with the team.",
      buttonLabel: "Create Request",
      buttonLink: "/dashboard/requests/create",
      icon: "/assets/icons/rocket.svg",
    },
    {
      title: "Add Team Members",
      description: "Invite colleagues to collaborate on projects within your workspace.",
      buttonLabel: "Manage Team",
      buttonLink: "/dashboard/team",
      icon: "/assets/icons/team.svg",
    },
    {
      title: "Explore the Features",
      description: "Discover templates, workflows, and integrations to boost productivity.",
      buttonLabel: "Browse Templates",
      buttonLink: "/dashboard/templates",
      icon: "/assets/icons/focus6.svg",
    },
  ];
  
export default function GetStartedSection({ onHide }: { onHide: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];


  return (
    <section className="mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium ">Get Started</h2>
        <button
          onClick={onHide}
          className="text-sm text-gray-500 hover:underline"
        >
          Hide
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row overflow-hidden">
        {/* Steps list */}
        <div className="md:w-1/3 p-4 space-y-3 bg-[#FBFBFB]">
          {steps.map((s, index) => (
            <div
              key={index}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center ${
                  index === currentStep
                    ? "bg-[#CEFFA3] text-[#003D3B]"
                    : "bg-[#EBFDD8] text-black"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm ${
                  index === currentStep ? "font-medium text-black" : "text-gray-800"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step detail */}
        <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Icon */}
            {step.icon && (
              <img src={step.icon} alt={step.title} className="w-8 h-8" />
            )}
            {/* Title and Description */}
            <h3 className="text-black font-medium text-xl">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>

          <div className="flex gap-2">

          <Button
          variant="secondary"
          size="sm"
          href={step.buttonLink}
          >
         {step.buttonLabel}
          </Button>

          <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentStep((prev) => (prev + 1) % steps.length)
          }
          >
       <div className="flex items-center gap-1 ">
       Next Step
       <ChevronRight className="w-4 h-4" />
       </div>
          </Button>

           
          </div>
        </div>
      </div>
    </section>
  );
}

// Debe ir acompañado del nuevo array `steps` como constante arriba
