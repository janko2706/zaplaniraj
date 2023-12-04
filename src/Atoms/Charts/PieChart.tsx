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
  const categoryArray: {
    name: string;
    percentage: number;
    color: string;
    tailwindColor: string;
  }[] = [
    {
      percentage: companyPost.statistics.Weddings,
      name: "Vjenjcanje",
      color: "#58A4F0",
      tailwindColor: "bg-[#58A4F0]",
    },
    {
      percentage: companyPost.statistics.Sacraments,
      name: "Sakramenti",
      color: "#FFBE46",
      tailwindColor: "bg-[#FFBE46]",
    },
    {
      percentage: companyPost.statistics.Celebrations,
      name: "Slavlja",
      color: "#D23737",
      tailwindColor: "bg-[#D23737]",
    },
    {
      percentage: companyPost.statistics.Business,
      name: "Poslovno",
      color: "#8A8DF5",
      tailwindColor: "bg-[#8A8DF5]",
    },
    {
      percentage: companyPost.statistics.Birthdays,
      name: "Rodendani",
      color: "#619434",
      tailwindColor: "bg-[#619434]",
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
        <Chart options={options} series={series} type="pie" width={250} />
      </div>
      <div className="col-span-2 flex items-center md:col-span-1">
        <ul className="flex w-full flex-col gap-4">
          {categoryArray.map((item, idx) => {
            console.log(`h-2 w-2 rounded-full bg-${item.tailwindColor}`);
            return (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${item.tailwindColor}`}
                  ></div>
                  {item.name}
                </div>
                <div>
                  {Math.round(
                    (item.percentage / companyPost.statistics.visitors) * 100
                  )}
                  %
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PieChart;
