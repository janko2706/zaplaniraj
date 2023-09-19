import React, { type HTMLAttributes } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/utils/component-reusability";

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  selected?: {
    name: string;
    icon?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
  };
  setSelected?: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          icon: React.JSX.Element;
          onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
        }
      | undefined
    >
  >;

  options: {
    name: string;
    icon?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
  }[];
}

const dropdownVariants = cva("cursor-pointer text-left", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "w-full  md:w-[48%] xl:w-[50%]",
      small: "w-52",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const HeroDropdown = ({
  selected,
  setSelected,
  options,
  size,
  variant,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(dropdownVariants({ variant, size, className }))}
      {...props}
    >
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="relative flex w-full cursor-default items-center gap-3 rounded-3xl border bg-[var(--bg-1)] px-8 py-3 focus:shadow-xl sm:text-sm">
              {selected?.icon ?? null}
              <span className="block truncate">
                {selected ? selected.name : ""}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-8 flex items-center pr-2">
                <ChevronDownIcon
                  width={30}
                  height={30}
                  className={`${
                    open ? "rotate-180" : ""
                  } transition-all duration-300 ease-out`}
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {options.map((category, categoryIdx) => (
                  <Listbox.Option
                    key={categoryIdx}
                    onClick={category.onClick}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-gray-200 text-gray-700" : "text-gray-700"
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`flex items-center gap-3 truncate text-base ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category.icon ?? <></>}
                          {category.name}
                        </span>
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

export { HeroDropdown, dropdownVariants };
