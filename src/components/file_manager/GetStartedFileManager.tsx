/* eslint-disable @next/next/no-img-element */
"use client";

const actions = [
  {
    label: "Create Folder",
    icon: "/assets/icons/icon_folders.svg",
  },
  {
    label: "Upload Files",
    icon: "/assets/icons/icon_files.svg",
  },
  {
    label: "Create a Doc",
    icon: "/assets/icons/icon_docs.svg",
  },
];

export default function GetStartedFileManager() {
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Get Started</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {actions.map((action) => (
          <div
            key={action.label}
            // Added a fixed width using w-40
            className="w-40 bg-white p-3 border border-gray-200 rounded-md flex flex-col items-start gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <img src={action.icon} alt="" className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">{action.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}