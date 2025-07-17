import FilesSectionTab from "../../file_manager/FilesSectionTab";

export default function RequestTabFiles({ request }) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <FilesSectionTab linkedToId={request.id} linkedToType="request" />
    </div>
  );
}
