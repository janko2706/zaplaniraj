import type { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import type { CompanyPost } from "@prisma/client";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  companyPost?: CompanyPost;
};

function PieChart({ companyPost }: Props) {
  if (!companyPost) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
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
    labels: ["Organic", "Google", "Social Media", "Referral"],
    colors: ["#585BF0", "#FFBE46", "#37D279", "#8A8DF5"],
  };
  const series = [64, 12, 13, 11];

  return (
    <div className="grid grid-cols-2 gap-5 lg:gap-12">
      <div className="col-span-2 md:col-span-1">
        <Chart options={options} series={series} type="pie" width={300} />
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
