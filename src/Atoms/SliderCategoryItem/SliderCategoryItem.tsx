import React from "react";
type Props = {
  icon: JSX.Element;
  title: string;
};

function SliderCategoryItem({ icon, title }: Props) {
  return (
    <div>
      <div className="mx-auto  mb-10 flex h-20 w-20 justify-center rounded-full bg-purple-800 p-3 shadow-2xl lg:h-32 lg:w-32">
        {icon}
      </div>
      <div className="text-center font-normal sm:text-base lg:text-2xl">
        {title}
      </div>
    </div>
  );
}

export default SliderCategoryItem;
