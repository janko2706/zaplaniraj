import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Accordion from "~/Atoms/Accordion/Accordion";
import RangeSliderComponent from "~/Atoms/RangeSlider/RangeSlider";

const propertyAmenities = [
  "Air Conditioning",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Refrigerator",
  "Swimming Pool",
  "Window Coverings",
  "Outdoor Shower",
  "Washer",
  "WiFi",
  "Sauna",
  "TV Cable",
  "Internet",
];

function CompanyPostView() {
  // TODO get this from BE
  const [priceRangeValues, setPriceRangeValues] = useState<number[]>([
    1, 10000,
  ]);
  const { back } = useRouter();

  function onChangePriceSlider(e: number[]) {
    setPriceRangeValues(e);
  }
  return (
    <div className="bg-[var(--bg-2)] px-3 py-[30px] lg:py-[60px]">
      <button
        className="rounded-full p-2 transition-all hover:bg-gray-400 "
        type="button"
        onClick={() => back()}
      >
        <ArrowLeftIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-800 group-active:scale-90" />
      </button>
      <div className="container">
        <div className="xxl:w-[66.66%] mx-auto w-full xl:w-[83.33%]">
          {/* General */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Opcenito </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="pt-4">
                <div className="border-t pt-4">
                  <p className="mb-4 mt-6 text-xl font-medium">Naziv:</p>
                  <input
                    type="text"
                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                    placeholder="Write Title"
                  />
                  <p className="mb-4 mt-6 text-xl font-medium">
                    Prosjecna cijena:
                  </p>
                  <RangeSliderComponent
                    value={priceRangeValues}
                    handleChange={onChangePriceSlider}
                    min={1}
                    max={10000}
                  />
                  {/* <CustomRangeSlider /> */}
                  <p className="mb-4 mt-6 text-xl font-medium">Description :</p>
                  <textarea
                    rows={5}
                    className="w-full rounded-md border p-2 focus:outline-none "
                    placeholder="Description.."
                  ></textarea>
                  <p className="mb-4 mt-6 text-xl font-medium">Tagline :</p>
                  <input
                    type="text"
                    className="w-full rounded-md border p-2 text-base  focus:outline-none"
                    placeholder="Your tag line"
                  />
                  <p className="mb-4 mt-6 text-xl font-medium"> Tag </p>
                  <select className="w-full rounded-md border bg-transparent px-5 py-3 pr-3 text-base focus:outline-none">
                    <option>Choice</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </Accordion>
          </div>
          {/* Item 2 */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Images & Video with Map </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="pt-6">
                <div className="flex w-full items-center justify-center rounded-2xl border-dashed">
                  <label
                    htmlFor="dropzone-file"
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-[var(--bg-2)]"
                  >
                    <span className="flex flex-col items-center justify-center py-12">
                      <CloudArrowUpIcon className="h-[60px] w-[60px]" />
                      <span className="h3 clr-neutral-500 mb-3 mt-4 text-center">
                        Drag & Drop
                      </span>
                      <span className="clr-neutral-500 mb-6 block text-center">
                        OR
                      </span>
                      <span className="mb-10 inline-block rounded-full bg-[#354764] px-6 py-3 text-white">
                        Select Files
                      </span>
                      <span className="flex flex-wrap items-center justify-center gap-5">
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="h-5 w-5" />
                          <span className="clr-neutral-500 mb-0 block">
                            Maximum allowed file size is 9.00 MB
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="h-5 w-5" />
                          <span className="clr-neutral-500 mb-0 block">
                            Maximum 10 files are allowed
                          </span>
                        </span>
                      </span>
                    </span>
                    <input type="file" id="dropzone-file" className="hidden" />
                  </label>
                </div>
                <p className="mb-4 mt-6 text-xl font-medium">Video Link :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Any type video link"
                />
                <div className="mt-6">
                  <div className="h-[400px]">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2233.5934788396344!2d89.78232001463437!3d23.836268639364576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1688381345276!5m2!1sen!2sbd"
                    ></iframe>
                  </div>
                </div>
                <p className="mb-4 mt-6 text-xl font-medium">Address :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Address"
                />
              </div>
            </Accordion>
          </div>

          {/* Item 3 */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Property Details </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="pt-6">
                <p className="mb-4 text-xl font-medium"> Beds : </p>
                <select className="w-full rounded-md border bg-transparent p-3 text-base focus:outline-none">
                  <option>4</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p className="mb-4 mt-6 text-xl font-medium">Bathrooms :</p>
                <select className="w-full rounded-md border bg-transparent p-3 text-base focus:outline-none">
                  <option>3</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p className="mb-4 mt-6 text-xl font-medium">Garages :</p>
                <select className="w-full rounded-md border bg-transparent p-3 text-base focus:outline-none">
                  <option>1</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p className="mb-4 mt-6 text-xl font-medium">Person :</p>
                <select className="w-full rounded-md border bg-transparent p-3 text-base focus:outline-none">
                  <option>8</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                  <option value="3">5</option>
                  <option value="3">6</option>
                  <option value="3">7</option>
                  <option value="3">8</option>
                </select>
                <p className="mb-4 mt-6 text-xl font-medium">Area (sq ft) :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="0"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Property ID :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter ID"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Type :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter type"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Area :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter area"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Bedrooms :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="06"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Parking :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="3"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Dimensions :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="0"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Year Build :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="2023"
                />
              </div>
            </Accordion>
          </div>
          {/* Item 4 */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Amenities</h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="pt-6">
                <p className="text-xl font-medium"> Features : </p>
                <ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                  {propertyAmenities.map((label, idx) => (
                    <li key={idx} className="py-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={label}
                          name="A3-confirmation"
                          value={label}
                          className="absolute h-8 w-8 opacity-0"
                        />
                        <div className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white focus-within:border-[var(--primary)]">
                          <svg
                            className="pointer-events-none hidden h-[10px] w-[10px] fill-current text-primary"
                            version="1.1"
                            viewBox="0 0 17 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="none" fillRule="evenodd">
                              <g
                                transform="translate(-9 -11)"
                                fill="#363AED"
                                fillRule="nonzero"
                              >
                                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <label
                          htmlFor={label}
                          className="flex cursor-pointer select-none items-center gap-2"
                        >
                          {label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>
          </div>
          {/* Item 5 */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Contact Information </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="pt-6">
                <p className="mb-4 text-xl font-medium">Zip/Post Code :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="4"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Phone :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Number"
                />
                <p className="mb-4 mt-6 text-xl font-medium"> Fax : </p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Fax number"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Email :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Email"
                />
                <p className="mb-4 mt-6 text-xl font-medium">Website :</p>
                <input
                  type="text"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter website"
                />
                <Link
                  href="#"
                  className="link :bg-primary-400 mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:text-white"
                >
                  <span className="inline-block"> Add New </span>
                </Link>
              </div>
            </Accordion>
          </div>

          <div className="py-6 md:py-10">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={"I agree to the privacy & policy"}
                    name="A3-confirmation"
                    value={"I agree to the privacy & policy"}
                    className="absolute h-8 w-8 opacity-0"
                  />
                  <div className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white focus-within:border-[var(--primary)]">
                    <svg
                      className="pointer-events-none hidden h-[10px] w-[10px] fill-current text-primary"
                      version="1.1"
                      viewBox="0 0 17 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g
                          transform="translate(-9 -11)"
                          fill="#363AED"
                          fillRule="nonzero"
                        >
                          <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <label
                    htmlFor={"I agree to the privacy & policy"}
                    className="flex cursor-pointer select-none items-center gap-2"
                  >
                    I agree to the privacy & policy
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={"I agree with all terms & conditions"}
                    name="A3-confirmation"
                    value={"I agree with all terms & conditions"}
                    className="absolute h-8 w-8 opacity-0"
                  />
                  <div className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white focus-within:border-[var(--primary)]">
                    <svg
                      className="pointer-events-none hidden h-[10px] w-[10px] fill-current text-primary"
                      version="1.1"
                      viewBox="0 0 17 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g
                          transform="translate(-9 -11)"
                          fill="#363AED"
                          fillRule="nonzero"
                        >
                          <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <label
                    htmlFor={"I agree with all terms & conditions"}
                    className="flex cursor-pointer select-none items-center gap-2"
                  >
                    I agree with all terms & conditions
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <Link href="#" className="btn-primary font-semibold">
            <span className="inline-block"> Save & Preview </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyPostView;
