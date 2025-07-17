/* eslint-disable @next/next/no-img-element */
import Button from "../ui/Button";

type User = {
  name: string;
  role: string;
  avatar: string;
};

const spheruleTeam: User[] = [
  { name: "Gerard Santos", role: "Admin", avatar: "/assets/avatars/gerard.png" },
  { name: "Nathaniel Drew", role: "User", avatar: "/assets/avatars/nathaniel.png" },
  { name: "Iya Coronel", role: "User", avatar: "/assets/avatars/iya.png" },
];

const bespireTeam: User[] = [
  { name: "Glinda Bren", role: "Project Manager", avatar: "/assets/avatars/glinda.png" },
  { name: "Bernard Co", role: "Creative Director", avatar: "/assets/avatars/bernard.png" },
  { name: "Michelle Cruz", role: "Designer", avatar: "/assets/avatars/michelle.png" },
];

export default function DashboardSidebar() {
  return (
    <aside className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      {/* Account Info */}
      <div className="flex items-center gap-4">
        <img
          src="/assets/logos/Avatar-Circle2.png"
          alt="Spherule"
          className="w-12 h-12"
        />
        <div>
          <div className="font-semibold text-xl">Spherule</div>
          <div className="text-xs text-gray-500 uppercase">Pro Account</div>
        </div>
       
      </div>

      {/* Credits Info */}
      <div className="border-b-1 border-[#dcdddc] pb-4 ">
        <div className="text-sm text-gray-500 ">Credits this month</div>
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold">100</span>
          <span className="text-sm text-gray-400">/ 200</span>
          <Button
          type="button"
          variant="transparent"
          label="Upgrade"
          size="xs"
          onClick={()=> console.log("clic en create requests ")}
          className="border border-[#6B6D68] ml-4 text-[#6B6D68] "
        />
        </div>

        <div className="flex justify-between items-center w-full mt-4">
        <div className="flex flex-col text-xs text-gray-500">
          <span>Hours Spent</span>
          <span className="text-base text-black">33</span>

        </div>
        <div className="flex flex-col text-xs text-gray-500">
          <span>Requests Created</span>
          <span className="text-base text-black">12</span>
        </div>
        </div>
       
      </div>

      {/* Spherule Team */}
      <div>
        <div className="text-sm font-medium mb-2">Spherule Team →</div>
        <ul className="space-y-2">
          {spheruleTeam.map((user) => (
            <li key={user.name} className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
              <div className="flex-1">
                <div className="text-sm">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <img src="/assets/icons/message-text-square.svg" className="w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bespire Team */}
      <div>
        <div className="text-sm font-medium mb-2">Team on Bespire →</div>
        <ul className="space-y-2">
          {bespireTeam.map((user) => (
            <li key={user.name} className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
              <div className="flex-1">
                <div className="text-sm">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <img src="/assets/icons/message-text-square.svg" className="w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Go to Account Button */}
      <Button
          type="button"
          variant="green2"
          size="md"
          onClick={()=> console.log("clic en got o account ")}
          className="w-full"
          >
          Go to Account
          </Button>
    </aside>
  );
}
