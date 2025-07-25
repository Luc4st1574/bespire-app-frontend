type TimeSpentInputProps = {
  hours?: number;
  minutes?: number;
  onChangeHours?: (value: number) => void;
  onChangeMinutes?: (value: number) => void;
  readOnly?: boolean;
};

export default function TimeSpentInput({
  hours = 0,
  minutes = 0,
  onChangeHours,
  onChangeMinutes,
  readOnly = true,
}: TimeSpentInputProps) {
  return (
    <div className="flex gap-3 mt-2">
      {/* Hours */}
      <div className="relative">
        <input
          type="number"
          min={0}
          max={999}
          value={hours}
          onChange={e => onChangeHours?.(parseInt(e.target.value) || 0)}
          readOnly={readOnly}
          placeholder="Hours"
          title="Hours"
          className="border-2 border-[#C8D0CD] rounded-lg w-22 h-12 pl-3 pr-7 pt-4 pb-2 text-lg font-normal text-[#262C28]  outline-none bg-white text-center"
        />
        <span className="absolute right-3 bottom-2 text-base text-[#67706B] select-none pointer-events-none">
          hr
        </span>
      </div>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={e => onChangeMinutes?.(parseInt(e.target.value) || 0)}
          readOnly={readOnly}
          placeholder="Minutes"
          title="Minutes"
          className="border-2 border-[#C8D0CD] rounded-lg w-22 h-12 pl-3 pr-7 pt-4 pb-2 text-lg font-normal text-[#262C28]  outline-none bg-white text-center"
        />
        <span className="absolute right-3 bottom-2 text-base text-[#67706B] select-none pointer-events-none">
          min
        </span>
      </div>
    </div>
  );
}
