export function ValidationCheck({ isValid, text }: { isValid: boolean; text: string }) {
    return (
      <div className="flex items-center gap-2">
        <span className={isValid ? "text-green-600" : "text-gray-400"}>
          {isValid ? "✔️" : "⭕"}
        </span>
        <span className={isValid ? "text-black" : "text-gray-500"}>{text}</span>
      </div>
    );
  }
  