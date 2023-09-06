"use client";
import { useState } from "react";
import Slider from "rc-slider";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import "rc-slider/assets/index.css";

export default function PriceSlider() {
  const [value, setValue] = useState(1000);

  return (
    <div className="relative w-full text-left md:w-[55%] xl:w-[30%]">
      <div className="flex items-center gap-3 rounded-3xl border bg-[var(--bg-1)] px-6 py-2 focus:shadow-xl sm:text-sm">
        <div className="flex w-full items-center gap-2 py-1">
          <span className="flex items-center gap-1">
            <CreditCardIcon />
            Budzet
          </span>
          <span className="absolute right-4 top-[-14px] rounded-2xl bg-white px-5 py-1 text-xs text-primary shadow">
            ${value}
          </span>
          <Slider
            handleStyle={{
              backgroundColor: "var(--primary)",
              borderColor: "var(--primary)",
            }}
            trackStyle={{
              backgroundColor: "var(--primary)",
              transition: "all 300ms cubic-bezier(.17,.67,.83,.67)",
            }}
            value={value}
            step={100}
            max={10000}
            onChange={(value) => setValue(value as number)}
          />
        </div>
      </div>
    </div>
  );
}
