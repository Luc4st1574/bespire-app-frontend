import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    options: SelectOption[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options }) => {
    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
        <Listbox value={value} onChange={onChange}>
            {({ open }) => (
            <div className="relative">
                <Listbox.Button className="relative h-[50px] w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-black focus:ring-1 focus:ring-black sm:text-sm">
                <span className="block truncate">{selectedOption?.label ?? `Select a ${label.toLowerCase()}`}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                    />
                </span>
                </Listbox.Button>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                {/* 👇 Increased z-index to 50 */}
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                    <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-primary-green text-black' : 'text-gray-900'
                        }`
                        }
                        value={option.value}
                    >
                        {({ selected, active }) => (
                        <>
                            <span
                            className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {option.label}
                            </span>
                            {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-black' : 'text-dark-green'
                                }`}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                </Transition>
            </div>
            )}
        </Listbox>
        </div>
    );
};

export default CustomSelect;