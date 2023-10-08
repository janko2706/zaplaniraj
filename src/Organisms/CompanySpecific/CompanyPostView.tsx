"use client";

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Accordion from "~/Atoms/Accordion/Accordion";
import RangeSliderComponent from "~/Atoms/RangeSlider/RangeSlider";
import Map from "~/Molecules/Map/Map";
import { useCompanyPost } from "./useCompanyPost";
import Uploader from "~/Molecules/Uploader/Uploader";

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};

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
  const { businessPost, createPost, categories } = useCompanyPost();
  const [title, setTitle] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [longDesc, setLongDesc] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [contactPhones, setContactPhones] = useState<string[]>([]);
  const [contactEmails, setContactEmails] = useState<string[]>([]);
  const [contactEmailsNedded, setContactEmailsNedded] = useState<string[]>([]);
  const [contactPhonesNedded, setContactPhonesNedded] = useState<string[]>([]);
  const [priceRangeValues, setPriceRangeValues] = useState<number[]>([
    1, 10000,
  ]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] =
    useState<number[]>();

  async function createPostAction() {
    if (!selectedCategoriesIds || selectedCategoriesIds === undefined)
      return toast.error("Odaberite barem jednu kategoriju objave!");

    return await createPost({
      title,
      businessId: "",
      selectedCategoryIds: selectedCategoriesIds,
      fullDescription: longDesc,
      shortDescription: shortDesc,
      priceRangeMin: priceRangeValues[0],
      priceRangeMax: priceRangeValues[1],
      pictures: imageUrls,
    });
  }
  const { back } = useRouter();

  function onChangePriceSlider(e: number[]) {
    setPriceRangeValues(e);
  }
  return (
    <div className="bg-[var(--bg-2)] px-3 py-[30px] lg:py-[60px]">
      <button
        className="rounded-full p-2 transition-all hover:bg-gray-400"
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
                    placeholder="Naziv poslovanja"
                    onChange={(e) => setTitle(e.target.value)}
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
                  <p className="mb-4 mt-6 flex items-center gap-3 text-xl font-medium">
                    Detaljan opis :
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="long-desc"
                    />
                  </p>
                  <Tooltip
                    id="long-desc"
                    style={tooltipStyle}
                    offset={7}
                    content="Predstaviti usluge te pogodnosti Vaseg poslovanja."
                  />
                  <textarea
                    rows={5}
                    className="w-full rounded-md border p-2 focus:outline-none "
                    placeholder="Opis.."
                    onChange={(e) => setLongDesc(e.target.value)}
                  ></textarea>
                  <p className="mb-4 mt-6 flex items-center gap-3 text-xl font-medium">
                    Kratak opis :{" "}
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="short-desc"
                    />
                  </p>
                  <Tooltip
                    id="short-desc"
                    style={tooltipStyle}
                    offset={7}
                    content="Jednostavan opis kroz jednu do dvije recenice"
                  />
                  <input
                    type="text"
                    className="w-full rounded-md border p-2 text-base  focus:outline-none"
                    placeholder="Opis..."
                    onChange={(e) => setShortDesc(e.target.value)}
                  />
                  <p className="mb-4 mt-6 flex gap-3 text-xl font-medium">
                    Kategorije :
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="categories"
                    />
                  </p>
                  <Tooltip
                    id="categories"
                    style={tooltipStyle}
                    offset={7}
                    content="Kategorije u koji ce se prikazivati vase poslovanje"
                  />
                  <Select
                    id="category"
                    options={categories.data}
                    className="w-full"
                    placeholder="odaberi..."
                    isMulti
                    onChange={(value) => {
                      if (value && value.length > 0) {
                        setSelectedCategoriesIds((prev) => {
                          if (!prev) {
                            return [
                              ...value.map((item) => {
                                return item.id;
                              }),
                            ];
                          } else
                            return [
                              ...prev,
                              ...value.map((item) => {
                                return item.id;
                              }),
                            ];
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </Accordion>
          </div>
          {/* Images */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Slike </h3>
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
                  <Uploader imageUrls={imageUrls} setImageUrls={setImageUrls} />
                </div>
              </div>
            </Accordion>
          </div>
          {/* Map */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Lokacija </h3>
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
                <div className="mt-6">
                  <div className="h-fit">
                    <Map />
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
          {/* Details */}
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
          {/* Category Specific details */}
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
          {/* Contact info */}
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
                <p className="mb-4 mt-6 text-xl font-medium">Phone :</p>
                <div className="mb-5 flex flex-col gap-4">
                  {contactPhonesNedded.map((_item, idx) => {
                    return (
                      <div key={idx} className="flex gap-4">
                        <input
                          type="tel"
                          pattern="^[0-9]{3,45}$"
                          className="w-full rounded-md border p-2 text-base focus:outline-none"
                          placeholder="Enter Number"
                          value={contactPhones[idx]}
                          onChange={(e) => {
                            const newArray = [...contactPhones];
                            newArray.splice(idx, 1, e.target.value);
                            setContactPhones(newArray);
                          }}
                        />

                        <button
                          className="flex cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                          onClick={() => {
                            const newArray = [...contactPhonesNedded];
                            newArray.splice(idx, 1);
                            setContactPhonesNedded(newArray);
                            const newContactsArray = [...contactPhones];
                            newContactsArray.splice(idx, 1);
                            setContactPhones(newContactsArray);
                          }}
                        >
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
                {contactPhonesNedded.length < 5 && (
                  <div
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                    onClick={() => {
                      setContactPhonesNedded((prev) => [...prev, ""]);
                      setContactPhones((prev) => [...prev, ""]);
                    }}
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Dodaj broj</p>
                  </div>
                )}

                <p className="mb-4 mt-6 text-xl font-medium">Email :</p>
                <div className="mb-5 flex flex-col gap-4">
                  {contactEmailsNedded.map((_item, idx) => {
                    return (
                      <div key={idx + 100} className="flex gap-4">
                        <input
                          type="email"
                          className="w-full rounded-md border p-2 text-base focus:outline-none"
                          placeholder="Enter email"
                          value={contactEmails[idx]}
                          onChange={(e) => {
                            const newArray = [...contactEmails];
                            newArray.splice(idx, 1, e.target.value);
                            setContactEmails(newArray);
                          }}
                        />

                        <button
                          className="flex cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                          onClick={() => {
                            const newArray = [...contactEmails];
                            newArray.splice(idx, 1);
                            setContactEmails(newArray);
                            const newContactsArray = [...contactEmailsNedded];
                            newContactsArray.splice(idx, 1);
                            setContactEmailsNedded(newContactsArray);
                          }}
                        >
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
                {contactEmailsNedded.length < 5 && (
                  <div
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                    onClick={() => {
                      setContactEmailsNedded((prev) => [...prev, ""]);
                      setContactEmails((prev) => [...prev, ""]);
                    }}
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Dodaj email</p>
                  </div>
                )}
                <p className="mb-4 mt-6 text-xl font-medium">Website :</p>
                <input
                  type="url"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter website"
                />
              </div>
            </Accordion>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
          <form onSubmit={async () => await createPostAction()}>
            <div className="py-6 md:py-10">
              <ul className="flex flex-col gap-4">
                <li>
                  <div className="mb-4 flex items-center">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      value=""
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <label
                      htmlFor="terms-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Terms & conditions
                    </label>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center">
                    <input
                      id="privacy-checkbox"
                      type="checkbox"
                      value=""
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <label
                      htmlFor="privacy-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Privacy
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <button type="submit" className="btn-primary font-semibold">
              Save & Preview
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyPostView;
