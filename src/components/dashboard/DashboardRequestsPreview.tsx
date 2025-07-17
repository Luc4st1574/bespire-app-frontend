/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function DashboardRequestsPreview() {
  return (
    <section className="mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium  flex items-center gap-1">
          <span>Requests</span>
          <img src="/assets/icons/arrow-l.svg" alt="" />
        </h2>
        <div className="relative inline-block">
  <select
    className="text-sm border-2 border-[#6B6D68] rounded-full px-4 py-1 text-[#6B6D68] appearance-none  pr-6"
    defaultValue="1m"
  >
    <option value="1m">1 month</option>
    <option value="3m">3 months</option>
    <option value="6m">6 months</option>
  </select>
  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6D68]">
    <img src="/assets/icons/ChevronDown.svg" alt="" />
  </div>
</div>

      </div>

      {/* Preview (imagen temporal) */}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Image
          src="/assets/illustrations/Requests-Mini.jpg"
          alt="Requests Preview"
          width={900}
          height={500}
          className=""
        />
      </div>
    </section>
  );
}
