/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import Button from "../ui/Button";

export default function WelcomeNewPlanModal({
  open,
  onClose,
  workspaceId,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
  plan: string
}) {
  if (!workspaceId) {
    console.error("Workspace ID is required for checkout session.");
    return null; // or handle error appropriately
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="fixed inset-0 flex justify-center">
        <DialogPanel className="w-full max-w-6xl  m-2 bg-white p-8 overflow-y-auto rounded-xl">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          <div
            className="min-h-screen flex flex-col justify-center items-center bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/assets/illustrations/bg_points.webp')",
            }}
          >
       
                <div className="flex flex-col items-center justify-center gap-6">
                     <img
              src="/assets/logos/logo_bespire.svg"
              className="h-12"
              alt="Bespire logo"
            />
                  <h1 className="text-4xl text-center">
                    <div className="flex items-center gap-2">
                        <span>Welcome to </span>
                    <img src="/assets/icons/flash2.svg" alt="" />
                    <span>Bespire {plan}</span>
                    </div>
                    <span className="">Your Next Big Move Starts Now.</span>
                  </h1>
                  <p className="text-base">
                No limits, just seamless execution. Let’s build something great.
                  </p>
                  <Button
                    href="/dashboard"
                    variant="green2"
                    label="Explore your Workspace"
                  ></Button>
                </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
