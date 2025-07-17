
const resources = [
    {
      title: "How to create your first order",
      icon: "/assets/icons/focus7.svg",
    },
    {
      title: "How to add new users",
      icon: "/assets/icons/loading.svg",
    },
    {
      title: "How to manage your billing",
      icon: "/assets/icons/icon_billing.svg",
    },
    {
      title: "How to manage your brands",
      icon: "/assets/icons/resources.svg",
    },
  ];
  
export default function DashboardResources() {
    return (
      <section className="mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium  flex items-center gap-1">
          <span>Resources & Tutorials</span>
          <img src="/assets/icons/arrow-l.svg" alt="" />
        </h2>
        </div>
  
        {/* Grid de recursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {resources.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col items-start gap-3 hover:shadow-sm transition cursor-pointer"
            >
              <img src={item.icon} alt={item.title} className="w-6 h-6" />
              <div className="text-sm font-medium text-[#181B1A]">{item.title}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  