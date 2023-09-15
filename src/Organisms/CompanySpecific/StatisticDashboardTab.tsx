import React from "react";
import PieChart from "@atoms/Charts/PieChart";
import { FaChartArea, FaChartBar, FaFileAlt, FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Counter from "@atoms/Counter/Counter";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { Business } from "@prisma/client";

type Props = {
  business?: Business;
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
const options: ApexOptions = {
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
const series = [
  {
    name: "Booking States",
    data: [134, 400, 405, 450, 420, 430, 425, 425, 404, 400, 666, 1109],
  },
];

function StatisticDashboardTab({ business }: Props) {
  return (
    <div className="h-full w-full">
      <div className="xxl:after:bg-white xxl:pb-0 relative z-[1] grid grid-cols-12 gap-4 bg-[var(--dark)] px-6 pb-10 after:absolute after:bottom-0 after:left-0 after:z-[-1] after:h-[50%] after:w-full lg:gap-6">
        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#EBEBFD] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4">
          <FaFileAlt className="h-16 w-16 self-center rounded-xl bg-primary p-4 text-3xl text-white" />
          <div>
            <h2 className="h2">
              {" "}
              <Counter end={66} />
            </h2>
            <p>Total Listings</p>
          </div>
        </div>
        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#EBFBF2] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4">
          <FaChartArea className="h-16 w-16 self-center rounded-xl bg-[var(--secondary-500)] p-4 text-3xl text-white" />
          <div>
            <h2 className="h2">
              $ <Counter end={256} />k
            </h2>
            <p>Earning</p>
          </div>
        </div>

        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#FFF9ED] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4 ">
          <FaChartBar className="h-16 w-16 self-center rounded-xl   bg-[#9C742B] p-4 text-white" />
          <div>
            <h2 className="h2">
              {" "}
              <Counter end={6.4} decimals={1} />k
            </h2>
            <p>Visitors</p>
          </div>
        </div>
        <div className="xxl:col-span-3 col-span-12 flex gap-4 rounded-2xl bg-[#EBEBFD] p-4 sm:col-span-6 sm:p-6 lg:p-8 xl:col-span-4">
          <FaStar className="h-16 w-16 self-center rounded-xl bg-primary p-4 text-3xl text-white" />
          <div>
            <h2 className="h2">
              {" "}
              <Counter end={7.6} decimals={1} />k
            </h2>
            <p>Reviews</p>
          </div>
        </div>
      </div>
      {/* Charts */}
      <section className="grid grid-cols-12 gap-4 bg-white px-3 pt-6 lg:gap-6 lg:px-6">
        <div className="col-span-12 rounded-2xl border p-3 sm:p-4 md:px-8 md:py-6 lg:col-span-6 lg:px-10 lg:py-8">
          <h3 className="h3 mb-4">Booking Stats</h3>
          <Chart options={options} height={350} type="area" series={series} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className=" rounded-2xl border p-3 sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
            <div className="mb-7 flex justify-between">
              <h3 className="h3">Booking Traffic</h3>
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-primary"
              >
                View All <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
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
            </div>
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
