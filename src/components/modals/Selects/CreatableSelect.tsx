import React, { useState, Fragment } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface CreatableSelectProps {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    options: SelectOption[];
    onCreate: (value: string) => void;
    }

    const CreatableSelect: React.FC<CreatableSelectProps> = ({ label, value, onChange, options, onCreate }) => {
    const [query, setQuery] = useState('');

    const filteredOptions =
        query === ''
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(query.toLowerCase())
            );

    const showCreateOption = query !== '' && !filteredOptions.some(option => option.label.toLowerCase() === query.toLowerCase());

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
        <Combobox value={value} onChange={onChange}>
            {({ open }) => (
            <div className="relative">
                <div className="relative w-full cursor-default overflow-hidden rounded-md border border-gray-300 bg-white text-left shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black sm:text-sm">
                <ComboboxInput
                    className="h-[50px] w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={() => selectedOption?.label || ''}
                    placeholder={`Select or create a ${label.toLowerCase()}`}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                    />
                </ComboboxButton>
                </div>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}>
                <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {showCreateOption && (
                    <ComboboxOption
                        value={query}
                        className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            focus ? 'bg-primary-green text-black' : 'text-gray-900'
                        }`
                        }
                        onClick={() => {
                        onCreate(query);
                        onChange(query);
                        }}
                    >
                        <span className="block truncate font-medium">Create &quot;{query}&quot;</span>
                    </ComboboxOption>
                    )}
                    {filteredOptions.map((option) => (
                    <ComboboxOption
                        key={option.value}
                        className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            focus ? 'bg-primary-green text-black' : 'text-gray-900'
                        }`
                        }
                        value={option.value}
                    >
                        {({ selected }) => (
                        <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {option.label}
                            </span>
                            {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-dark-green">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </ComboboxOption>
                    ))}
                </ComboboxOptions>
                </Transition>
            </div>
            )}
        </Combobox>
        </div>
    );
};
export default CreatableSelect;