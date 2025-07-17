"use client";
import Button from "../ui/Button";

const MOCK_PLAN = {
  name: "Pro Plan",
  creditUsage: "36/100",
  paymentMethod: {
    brand: "visa",
    last4: "345",
  },
};

const MOCK_INVOICES = [
  {
    date: "Dec 19, 2024",
    plan: "Pro Plan",
    total: "$3,495",
    status: "Paid",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "Nov 19, 2024",
    plan: "Pro Plan",
    total: "$3,495",
    status: "Paid",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "Oct 19, 2024",
    plan: "Pro Plan",
    total: "$3,495",
    status: "Paid",
    viewUrl: "#",
    downloadUrl: "#",
  },
];

export default function PlansBillingMock() {
  const { name, creditUsage, paymentMethod } = MOCK_PLAN;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* PLAN SECTION */}
      <h2 className="font-medium text-2xl mb-6">Plan</h2>
      <div className="bg-[#F6F7F7] rounded-lg p-8 mb-8">
       <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 items-center mb-4">
              <span className="font-medium">Current Plan</span>
              <span className="font-medium text-lg">{name}</span>
              <div className="flex gap-2 ml-2">
                <Button variant="green2" size="md">Upgrade</Button>
                <Button variant="outlineG" size="md">Cancel</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center  mb-4">
              <span className="font-medium">Credit Usage</span>
              <span>{creditUsage}</span>
              <div className="flex justify-end">
                <Button variant="green2" size="md" className="ml-2">Upgrade</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center justify-start">
              <span className="font-medium">Payment Method</span>
              <div className="flex items-center gap-2">
                {paymentMethod.brand && (
                  <img
                    src={`/assets/cards/${paymentMethod.brand}.svg`}
                    alt={paymentMethod.brand}
                    className="w-8 h-6"
                  />
                )}
                <span className="font-medium">
                  {paymentMethod.brand
                    ? `VISA ending in ${paymentMethod.last4}`
                    : "No card added"}
                </span>
                
              </div>
              <div className="flex justify-end items-center">
                <Button
                  variant={paymentMethod.brand ? "gray" : "green2"}
                  size="md"
                  className="ml-2"
                  disabled={!paymentMethod.brand}
                >
                  {paymentMethod.brand ? "Change" : "Add"}
                </Button>
              </div>
            </div>
          </div>
      </div>

      {/* INVOICES SECTION */}
      <h2 className="font-semibold text-2xl mb-6">Invoices</h2>
      <div className="bg-[#F6F7F7] rounded-lg p-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium"></span>
          <a href="#" className="underline font-medium">Download all invoices</a>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 ">
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                    <span>Date</span>
                <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                    <span>Plan</span>
                <img src="/assets/icons/ChevronDown.svg" alt="" /></div>
              </th>
              <th className="py-2 font-medium ">
                <div className="flex items-center gap-1">
                    <span>Total</span>
                <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
              <th className="py-2 text-center font-medium ">
               <div className="flex items-center gap-1 justify-center">
                 <span>Status</span>
                <img src="/assets/icons/ChevronDown.svg" alt="" />
               </div>
              </th>
              <th className="py-2 text-right font-medium ">
                <div className="flex items-center gap-1 justify-end">
                    <span>Actions</span>
                <img src="/assets/icons/ChevronDown.svg" alt="" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map((inv, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-2">{inv.date}</td>
                <td className="py-2">{inv.plan}</td>
                <td className="py-2">{inv.total}</td>
                <td className="py-2 text-center" >
                  <span className="inline-flex items-center gap-1 text-[#62864D]">
                    <span className="w-2 h-2 rounded-full bg-[#62864D] inline-block"></span>
                    {inv.status}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <a href={inv.viewUrl} className="mr-4 underline">View</a>
                  <a href={inv.downloadUrl} className="underline">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center mt-8 gap-6">
        <Button type="button" variant="outlineG" size="lg" className="w-[200px]">
          Cancel
        </Button>
        <Button type="submit" variant="gray" size="lg" className="w-[200px]" disabled>
          Save
        </Button>
      </div>
    </div>
  );
}
