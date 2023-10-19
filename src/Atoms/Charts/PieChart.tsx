import type { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import type { WholePostType } from "~/utils/types";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  companyPost?: WholePostType;
};

function PieChart({ companyPost }: Props) {
  if (!companyPost) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  const categoryArray: { name: string; percentage: number; color: string }[] = [
    {
      percentage: companyPost.statistics.Weddings,
      name: "Vjenjcanje",
      color: "#585BF0",
    },
    {
      percentage: companyPost.statistics.Sacraments,
      name: "Sakramenti",
      color: "#FFBE46",
    },
    {
      percentage: companyPost.statistics.Celebrations,
      name: "Slavlja",
      color: "#37D279",
    },
    {
      percentage: companyPost.statistics.Business,
      name: "Poslovno",
      color: "#8A8DF5",
    },
    {
      percentage: companyPost.statistics.Birthdays,
      name: "Rodendani",
      color: "#FE6F5E",
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    plotOptions: {
      pie: {
        startAngle: 90,
        endAngle: 450,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    labels: categoryArray.map((item) => item.name),
    colors: categoryArray.map((item) => item.color),
  };

  const series = categoryArray.map((item) => Math.round(item.percentage));
  return (
    <div className="grid grid-cols-2 gap-5 lg:gap-12">
      <div className="col-span-2 md:col-span-1">
        <Chart options={options} series={series} type="pie" width={300} />
      </div>
      <div className="col-span-2 flex items-center md:col-span-1">
        <ul className="flex w-full flex-col flex-wrap gap-4">
          {categoryArray.map((item, idx) => {
            return (
              <li key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full bg-[${item.color}]`}
                  ></span>
                  {item.name}
                </span>
                <span>
                  {Math.round(
                    (item.percentage / companyPost.statistics.visitors) * 100
                  )}
                  %
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PieChart;
<div className="grid grid-cols-2 gap-5 lg:gap-12">
  <div className="col-span-2 md:col-span-1">
    <PieChart />
  </div>
  <div className="col-span-2 flex items-center md:col-span-1">
    <ul className="flex w-full flex-col flex-wrap gap-4">
      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#585BF0]"></span>
          Organic
        </span>
        <span>64%</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FFBE46]"></span>
          Google
        </span>
        <span>12%</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#37D279]"></span>
          Social Media
        </span>
        <span>13%</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8A8DF5]"></span>
          Referral program
        </span>
        <span>11%</span>
      </li>
    </ul>
  </div>
</div>;
