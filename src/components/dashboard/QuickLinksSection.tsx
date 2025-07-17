
const Links = [
  {
    title: "Start with a Project Library Template",
    description: "Use templates to begin quickly.",
    icon: "/assets/icons/resources.svg",
    bg: "bg-[#DEFCBD]",
  },
  {
    title: "Manage your Brand Essentials",
    description: "Update logos, colors, and more.",
    icon: "/assets/icons/resources.svg",
    bg: "bg-[#FEDAA0]",
  },
  {
    title: "View Monthly Ads Performance",
    description: "Analyze your monthly performing ads.",
    icon: "/assets/icons/team.svg",
    bg: "bg-[#E0E5DA]",
  },
];

export default function QuickLinksSection({ onHide }: { onHide: () => void }) {
  return (
    <>
      <section
        className={`mb-6 transition-all duration-300 ease-in-out opacity-100 translate-y-0`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium flex items-center gap-1">
            <span>Quick Links</span>
          </h2>
          <button
            type="button"
            onClick={onHide}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            Hide
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Links.map((item, index) => (
            <div
              key={index}
              className={` ${item.bg} border border-gray-200 rounded-lg px-4 py-3 flex flex-col
                 items-start gap-3 hover:shadow-sm transition cursor-pointer`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-8 h-8 object-contain"
              />
              <div className="text-base md:text-lg lg:text-xl font-medium text-black">
                {item.title}
              </div>
              <p className="text-sm text-[#7e8280]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
