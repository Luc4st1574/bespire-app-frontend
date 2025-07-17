// components/ui/CustomDatePicker.tsx
import React from "react";
import ReactDatePicker from "react-datepicker";
import  Calendar  from "@/assets/icons/calendar.svg"; // Asegúrate de que la ruta sea correcta
import ClipboardCheck from "@/assets/icons/clipboard-check.svg"; // Asegúrate de que la ruta sea correcta
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;

};

export default function CustomDatePicker({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  disabled = false,
}: CustomDatePickerProps) {
  // Custom input component para el input con icono y estilos
  const CustomInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={`
          flex items-center gap-3  w-full
          font-medium text-md 
          transition
          ${disabled ? "cursor-not-allowed" : "hover:border-[#B3C7A4]"}
        `}
        style={{ minHeight: 52 }}
      >
        {disabled ? (
            <ClipboardCheck className="w-6 h-6 mb-1" />
        ) : (
            <Calendar className="w-6 h-6 mb-1" />
        )}
        <span>
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Select date"}
        </span>
      </button>
    )
  );
  CustomInput.displayName = "CustomInput";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <span className="text-[#5E6B66] ">{label}</span>}
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        withPortal
        popperModifiers={[
          {
            name: "offset",
            options: { offset: [0, 10] },
          },
        ]}
        calendarClassName="!rounded-xl !shadow-lg !border !border-gray-200"
        dayClassName={() => "!rounded-full"}
        customInput={<CustomInput />}
        portalId="root-portal" // ¡Portal para evitar overflow!
        dateFormat="MMM dd, yyyy"
      />
    </div>
  );
}
