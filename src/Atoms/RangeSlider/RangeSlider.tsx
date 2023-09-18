import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

type Props = {
  value: number[];
  handleChange: (e: number[]) => void;
  min: number;
  max: number;
};

function RangeSliderComponent({ value, handleChange, min, max }: Props) {
  return (
    <div>
      <RangeSlider
        onInput={(e: number[]) => handleChange(e)}
        id="range"
        min={min}
        max={max}
        step={1}
        defaultValue={value}
      />
      <div className="flex justify-center gap-4 py-5">
        <span>${value[0]}</span>
        <span>-</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}

export default RangeSliderComponent;
