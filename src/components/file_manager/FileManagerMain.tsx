"use client";

import AllFilesSection from "./AllFilesSection";
import GetStartedFileManager from "./GetStartedFileManager";

export default function FileManagerMain() {
  return (
    <div className="flex flex-col gap-8">
      <GetStartedFileManager />
      <AllFilesSection />
    </div>
  );
}