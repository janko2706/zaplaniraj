import React from "react";
import PieChart from "@atoms/Charts/PieChart";
import { FaChartBar, FaStar, FaHeart } from "react-icons/fa";
import Counter from "@atoms/Counter/Counter";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { WholePostType } from "~/utils/types";

type Props = {
  businessPost?: WholePostType;
};

const options2: ApexOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: true,
    },
  },
  colors: ["#36ed5e", "#d23737"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};
const series2 = [
  {
    name: "Dobre recenzije",
    data: [19, 40, 45, 30, 25, 43, 45, 62, 66, 112, 105, 100],
  },
  {
    name: "Lose Recenzije",
    data: [10, 30, 32, 50, 42, 33, 36, 45, 44, 40, 66, 56],
  },
];

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const mjeseci: ApexOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: true,
    },
  },
  colors: ["#363AED"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

function StatisticDashboardTab({ businessPost }: Props) {
  const pregledi = [
    {
      name: "Pregleda",
      data: [
        businessPost?.statistics.January ?? 0,
        businessPost?.statistics.February ?? 0,
        businessPost?.statistics.March ?? 0,
        businessPost?.statistics.April ?? 0,
        businessPost?.statistics.May ?? 0,
        businessPost?.statistics.June ?? 0,
        businessPost?.statistics.July ?? 0,
        businessPost?.statistics.August ?? 0,
        businessPost?.statistics.September ?? 0,
        businessPost?.statistics.October ?? 0,
        businessPost?.statistics.November ?? 0,
        businessPost?.statistics.December ?? 0,
      ],
    },
  ];
  return (
    <div className="h-full w-full">
      <div className="xxl:after:bg-white xxl:pb-0 relative z-[1] grid grid-cols-12 gap-4 bg-[var(--dark)] px-6 pb-10 after:absolute after:bottom-0 after:left-0 after:z-[-1] after:h-[50%] after:w-full lg:gap-6">
        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#EBEBFD] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4">
          <FaHeart className="h-16 w-16 self-center rounded-xl bg-primary p-4 text-3xl text-white" />
          <div>
            <h2 className="h2">
              <Counter end={businessPost?.statistics.averageReviewGrade ?? 0} />
            </h2>
            <p>Prosjecna ocjena (od 5)</p>
          </div>
        </div>

        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#FFF9ED] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4 ">
          <FaChartBar className="h-16 w-16 self-center rounded-xl   bg-[#9C742B] p-4 text-white" />
          <div>
            <h2 className="h2">
              <Counter
                end={businessPost?.statistics.visitors ?? 0}
                decimals={0}
              />
            </h2>
            <p>Posjetitelji</p>
          </div>
        </div>
        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#EBEBFD] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4">
          <FaStar className="h-16 w-16 self-center rounded-xl bg-primary p-4 text-3xl text-white" />
          <div>
            <h2 className="h2">
              <Counter
                end={businessPost?.statistics.numberOfReviews ?? 0}
                decimals={0}
              />
            </h2>
            <p>Recenzije</p>
          </div>
        </div>
      </div>
      {/* Charts */}
      <section className="grid grid-cols-12 gap-4 bg-white px-3 pt-6 lg:gap-6 lg:px-6">
        <div className="col-span-12 rounded-2xl border p-3 sm:p-4 md:px-8 md:py-6 lg:col-span-6 lg:px-10 lg:py-8">
          <h3 className="h3 mb-4">Pregledi</h3>
          <Chart options={mjeseci} height={350} type="area" series={pregledi} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className=" rounded-2xl border p-3 sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
            <div className="mb-7 flex justify-between">
              <h3 className="h3">Pregledi po kategorijama</h3>
            </div>
            <PieChart companyPost={businessPost} />
          </div>
        </div>
      </section>
      {/* Candlestick chart*/}
      <section className=" mt-4  bg-white px-3 pb-16 lg:mt-6 lg:px-6">
        <div className="mt-4 rounded-2xl border bg-white p-3 sm:p-4 md:px-6 md:py-6 lg:mt-6 lg:px-10 lg:py-9">
          <h3 className="h3 mb-4">Recenzije</h3>
          <div className="col-span-12 h-full">
            <Chart
              options={options2}
              height={350}
              type="area"
              series={series2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StatisticDashboardTab;
