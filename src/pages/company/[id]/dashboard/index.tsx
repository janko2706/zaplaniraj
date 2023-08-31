"use client";
import React from "react";
import RootLayout from "../layout";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Counter from "@atoms/Counter/Counter";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import PieChart from "@atoms/Charts/PieChart";
import Pagination from "~/Molecules/Pagination/Pagination";
import { FaChartArea, FaChartBar, FaFileAlt, FaStar } from "react-icons/fa";

const recentBookings = [
  {
    id: "01",
    item: "ABC",
    amount: 344,
    paid: 120,
    date: "25/05/2023",
    time: "08:20",
    status: "Rejected",
    name: "Antique Ford Hotel",
  },
  {
    id: "02",
    item: "XYZ",
    amount: 500,
    paid: 250,
    date: "26/05/2023",
    time: "10:45",
    status: "Pending",
    name: "Refresh Resort",
  },
  {
    id: "03",
    item: "DEF",
    amount: 200,
    paid: 200,
    date: "27/05/2023",
    time: "12:30",
    status: "Successfull",
    name: "Essence Hotel",
  },
  {
    id: "04",
    item: "PQR",
    amount: 100,
    paid: 100,
    date: "28/05/2023",
    time: "14:15",
    status: "Successfull",
    name: "Vertex Hotel",
  },
];

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const options: ApexOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: true,
      
    },
    events: {
      updated: (chart, options) => {
        console.log(chart);
        console.log(options);
        return;
      },
    },
  },
  colors: ["#363AED"],
  dataLabels: {
    enabled: true,
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
    data: [190, 400, 405, 450, 420, 430, 425, 425, 404, 400, 666, 1109],
  },
];

function Dashboard() {
  return (
    <RootLayout>
      <div>
        {/* statisticts */}
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
        {/* Recent bookings */}
        <section className="mt-4 bg-white px-3 pb-5 lg:mt-6 lg:px-6">
          <div className=" rounded-2xl border p-3 sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
            <div className="mb-7 flex justify-between">
              <h3 className="h3">Recent Bookings</h3>
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-primary"
              >
                View All <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="border-b border-dashed bg-[#F5F5FE] text-left">
                    <th className="px-2 py-3">#</th>
                    <th className="px-2 py-3">item</th>
                    <th className="px-2 py-3">Amount</th>
                    <th className="px-2 py-3">Paid</th>
                    <th className="px-2 py-3">Date</th>
                    <th className="px-2 py-3">Time</th>
                    <th className="px-2 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(
                    ({ id, amount, date, item, paid, status, time }) => (
                      <tr key={id} className="border-b border-dashed">
                        <td className="px-2 py-3">{id}</td>
                        <td className="px-2 py-3 text-primary">{item}</td>
                        <td className="px-2 py-3">{amount}</td>
                        <td className="px-2 py-3">{paid}</td>
                        <td className="px-2 py-3">{date}</td>
                        <td className="px-2 py-3">{time}</td>
                        <td className={`px-2 py-3`}>
                          <span
                            className={`rounded-xl px-3 py-2 ${
                              status == "Rejected" &&
                              "bg-[#EBFBF2] text-[var(--secondary-500)]"
                            } ${
                              status == "Successfull" &&
                              "bg-[#EBEBFD] text-primary"
                            } ${
                              status == "Pending" &&
                              "bg-[#FFF9ED] text-[#9C742B]"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <Pagination />
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}

export default Dashboard;
