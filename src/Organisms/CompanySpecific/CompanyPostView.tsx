import {
  ArrowLeftIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useId, useState, type FormEvent, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useImmer } from "use-immer";
import Accordion from "~/Atoms/Accordion/Accordion";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import RangeSliderComponent from "~/Atoms/RangeSlider/RangeSlider";
import Map from "~/Molecules/Map/Map";
import Uploader from "~/Molecules/Uploader/Uploader";
import { type CompanyPostWihtoutDate } from "~/utils/types";
import { useCompanyPost } from "./useCompanyPost";

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};

type Props = {
  companyPost: CompanyPostWihtoutDate;
};

function CompanyPostView({ companyPost }: Props) {
  const {
    eventCategories,
    updatePost,
    deletePostImage,
    isUpdatePostLoading,
    createPostPrice,
    isCreatingPrice,
  } = useCompanyPost();

  const [currentPost, setCurrentPost] =
    useState<CompanyPostWihtoutDate>(companyPost);
  const [contactPhones, setContactPhones] = useState<string[]>(
    currentPost.contactPhones?.split(",") ?? []
  );
  const [contactEmails, setContactEmails] = useState<string[]>(
    currentPost.contactEmails?.split(",") ?? []
  );
  const [contactEmailsNedded, setContactEmailsNedded] = useState<string[]>(
    currentPost.contactEmails?.split(",") ?? []
  );
  const [contactPhonesNedded, setContactPhonesNedded] = useState<string[]>(
    currentPost.contactPhones?.split(",") ?? []
  );

  const addToPictures = (url: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      pictures: prev.pictures ? prev.pictures + "," + url : url,
    }));
  };
  const removeFromPictures = (location: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      pictures: prev.pictures
        ? prev.pictures
            .split(",")
            .filter((i) => i !== location)
            .toString()
        : "",
    }));
  };
  const addToOfferPictures = (url: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      offerPictures: prev.offerPictures ? prev.offerPictures + "," + url : url,
    }));
  };
  const removeFromOfferPictures = (location: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      offerPictures: prev.offerPictures
        ? prev.offerPictures
            .split(",")
            .filter((i) => i !== location)
            .toString()
        : "",
    }));
  };

  const categorySelectId = useId();
  const onPlacesSelect = (
    address: string,
    latitude: number | null,
    langitude: number | null
  ) => {
    setCurrentPost((prev) => ({
      ...prev,
      location: address,
      lat: latitude,
      lng: langitude,
    }));
  };
  const [prices, setPrices] = useImmer<
    {
      name: string;
      price: number;
      unit: string;
      id: number;
      maximum: number;
      companyPostId: number | null;
    }[]
  >(companyPost.prices);

  async function postAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await updatePost({
        ...currentPost,
        prices,
        pictures: currentPost.pictures?.split(","),
        offerPictures: currentPost.offerPictures?.split(","),
        tags: currentPost.tags?.split(","),
        contactPhones: contactPhones,
        contactEmails: contactEmails,
        earlisetAvailable: currentPost.earlisetAvailable,
        selectedCategoryIds: currentPost.selectedCategoriesIds.map(
          (item) => item.id
        ),
      });
      if (result) {
        setCurrentPost({
          ...result,
          prices,
        });
        toast.success("Promjene spremljene");
      }
    } catch (error) {
      toast.error("Doslo je do pogreske molimo pokusajte ponovo kasnije.");
    }
  }
  const { back } = useRouter();
  const deleteImageInDB = async (location: string) => {
    if (currentPost.pictures) {
      const pictures = currentPost.pictures?.split(",") ?? [];
      if (pictures.includes(location)) {
        await deletePostImage({
          id: currentPost.id,
          imageToDelete: location,
        });
      }
      return true;
    }
    return false;
  };

  function onChangePriceSlider(e: number[]) {
    const min = e[0] ? e[0] : 1;
    const max = e[1] ? e[1] : 10000;
    setCurrentPost((prev) => ({
      ...prev,
      priceRangeMin: min,
      priceRangeMax: max,
    }));
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isUpdatePostLoading]);

  return (
    <div className="h-full bg-[var(--bg-2)] px-3 py-[30px] lg:py-[60px]">
      <button
        className="rounded-full p-2 transition-all hover:bg-gray-400"
        type="button"
        onClick={() => back()}
      >
        <ArrowLeftIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-800 group-active:scale-90" />
      </button>
      {isUpdatePostLoading && (
        <div className="absolute left-0 top-0 z-50 h-full w-full bg-gray-300 opacity-50">
          <div className="z-[51] flex h-full w-full items-center justify-center align-middle">
            <LoadingSpinner spinnerHeight="h-20" spinnerWidth="w-20" />
          </div>
        </div>
      )}

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
                    defaultValue={currentPost?.title}
                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                    placeholder="Naziv poslovanja"
                    onChange={(e) =>
                      setCurrentPost((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <p className="mb-4 mt-6 text-xl font-medium">
                    Prosjecna cijena:
                  </p>
                  <RangeSliderComponent
                    value={[
                      currentPost.priceRangeMin ?? 1,
                      currentPost.priceRangeMax ?? 1000,
                    ]}
                    handleChange={onChangePriceSlider}
                    min={1}
                    max={10000}
                  />
                  <p className="mb-4 mt-6 flex items-center gap-3 text-xl font-medium">
                    Osvrt o poslovanju :
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="long-desc"
                    />
                  </p>
                  <Tooltip
                    id="long-desc"
                    style={tooltipStyle}
                    offset={7}
                    content="Ukratko predstaviti Vase poslovanje."
                  />
                  <textarea
                    rows={4}
                    className="w-full rounded-md border p-2 focus:outline-none "
                    placeholder="Opis.."
                    value={currentPost.companyDescription ?? ""}
                    maxLength={150}
                    onChange={(e) =>
                      setCurrentPost((prev) => ({
                        ...prev,
                        companyDescription: e.target.value,
                      }))
                    }
                  ></textarea>
                  <div>{currentPost.companyDescription?.length} / 150</div>

                  <p className="mb-4 mt-6 flex items-center gap-3 text-xl font-medium">
                    Osvrt o usluzi :
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="short-desc"
                    />
                  </p>
                  <Tooltip
                    id="short-desc"
                    style={tooltipStyle}
                    offset={7}
                    content="Jednostavan opis usluge koju Vase poslovanje nudi."
                  />
                  <textarea
                    value={currentPost.serviceDescription ?? ""}
                    maxLength={150}
                    rows={2}
                    className="w-full rounded-md border p-2 focus:outline-none "
                    placeholder="Opis.."
                    onChange={(e) =>
                      setCurrentPost((prev) => ({
                        ...prev,
                        serviceDescription: e.target.value,
                      }))
                    }
                  ></textarea>
                  <div>{currentPost.serviceDescription?.length} / 150</div>
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
                    content="Kategorije u kojima ce se prikazivati vase poslovanje"
                  />
                  <Select
                    id={categorySelectId}
                    instanceId={categorySelectId}
                    options={eventCategories.data?.map((item) => {
                      return {
                        ...item,
                        label: `${item.value}`,
                      };
                    })}
                    defaultValue={currentPost.selectedCategoriesIds}
                    value={currentPost.selectedCategoriesIds}
                    className="w-full"
                    placeholder="odaberi..."
                    isMulti
                    onChange={(value) => {
                      setCurrentPost((prev) => ({
                        ...prev,
                        selectedCategoriesIds: value.map((item) => item),
                      }));
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
                <p className="mb-4 mt-6 text-xl font-medium">
                  Slike koju predstavljaju Vase poslovanje :
                </p>
                <div className="flex w-full items-center justify-center rounded-2xl border-dashed">
                  <Uploader
                    id="dropzone-images"
                    addToPictures={addToPictures}
                    removeFromPictures={removeFromPictures}
                    deleteImageInDB={deleteImageInDB}
                    imageUrls={currentPost.pictures?.split(",")}
                    maximumImages={6}
                  />
                </div>
              </div>
              <p className="mb-4 mt-6 text-xl font-medium">
                Slike ponude (jelovnika, cjenika, itd...) :
              </p>
              <div className="flex w-full items-center justify-center rounded-2xl border-dashed">
                <Uploader
                  id="dropzone-offer"
                  addToPictures={addToOfferPictures}
                  removeFromPictures={removeFromOfferPictures}
                  deleteImageInDB={deleteImageInDB}
                  maximumImages={4}
                  imageUrls={currentPost.offerPictures?.split(",") ?? []}
                />
              </div>
            </Accordion>
          </div>
          {/* Details for price calc */}
          <div className="mb-5 rounded-2xl bg-white p-4 sm:mb-8 sm:p-6 md:mb-12 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <div className="flex items-center gap-3">
                    <h3 className="h3">Kalkulacija cijene usluge </h3>
                    <QuestionMarkCircleIcon
                      className=" h-6 w-6 text-primary"
                      data-tooltip-id="price-calc"
                    />
                    <Tooltip
                      id="price-calc"
                      style={tooltipStyle}
                      className="max-w-sm"
                      offset={7}
                      content="Ovi podaci ce omoguciti korisniku da izracuna potencijalnu cijenu Vase usluge..."
                    />
                  </div>
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
                    {!isCreatingPrice ? (
                      <div>
                        <div className="mb-5 flex w-full flex-col items-center gap-4 overflow-x-auto">
                          {prices.map((item, idx) => {
                            return (
                              <div
                                key={idx}
                                className="flex w-full justify-between gap-3 "
                              >
                                <div className="flex min-w-fit flex-col">
                                  <label htmlFor={`price-${idx}-name`}>
                                    Naziv
                                  </label>
                                  <input
                                    type="text"
                                    id={`price-${idx}-name`}
                                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                                    placeholder="Naziv"
                                    value={item.name}
                                    onChange={(e) => {
                                      setPrices((prev) => {
                                        const thisItem = prev[idx];
                                        if (!thisItem) return;
                                        thisItem.name = e.target.value;
                                      });
                                    }}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label
                                    htmlFor={`price-${idx}-unit`}
                                    className="line-clamp-2 truncate"
                                  >
                                    Mjerna jedinica
                                  </label>
                                  <input
                                    type="text"
                                    id={`price-${idx}-unit`}
                                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                                    placeholder="Mjerna jedinica"
                                    value={item.unit}
                                    onChange={(e) => {
                                      setPrices((prev) => {
                                        const thisItem = prev[idx];
                                        if (!thisItem) return;
                                        thisItem.unit = e.target.value;
                                      });
                                    }}
                                  />
                                </div>
                                <div className="flex w-full flex-col">
                                  <label
                                    htmlFor={`price-${idx}-price`}
                                    className="line-clamp-1 truncate"
                                  >
                                    Cijena po ({item.unit})
                                  </label>
                                  <input
                                    type="number"
                                    id={`price-${idx}-price`}
                                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                                    placeholder="cijena u eurima"
                                    value={item.price}
                                    onChange={(e) => {
                                      setPrices((prev) => {
                                        const thisItem = prev[idx];
                                        if (!thisItem) return;
                                        thisItem.price = Number(
                                          e.target.value as unknown as number
                                        );
                                      });
                                    }}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor={`price-${idx}-max`}>
                                    Maximalno
                                  </label>
                                  <input
                                    type="number"
                                    id={`price-${idx}-max`}
                                    className="w-full rounded-md border p-2 text-base focus:outline-none"
                                    placeholder="maximalan broj ljudi/usluga..."
                                    value={item.maximum}
                                    onChange={(e) => {
                                      setPrices((prev) => {
                                        const thisItem = prev[idx];
                                        if (!thisItem) return;
                                        thisItem.maximum = Number(
                                          e.target.value as unknown as number
                                        );
                                      });
                                    }}
                                  />
                                </div>

                                <button
                                  className="flex h-fit cursor-pointer items-center gap-2 self-end rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                                  type="button"
                                  onClick={() => {
                                    setPrices((prev) => {
                                      return prev.filter((_, i) => i !== idx);
                                    });
                                  }}
                                >
                                  <XCircleIcon className="h-5 w-5 text-red-400" />
                                  makni
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        {prices.length < 5 && (
                          <button
                            className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-slate-400 hover:shadow-lg"
                            type="button"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async (e) => {
                              e.preventDefault();
                              const newPost = await createPostPrice({
                                name: "",
                                price: 0,
                                unit: "",
                                maximum: 0,
                                postId: companyPost.id,
                              });
                              setPrices((prev) => {
                                prev.push(newPost);
                              });
                            }}
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                            <p>Dodaj cijenu</p>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <LoadingSpinner
                          spinnerWidth="w-8"
                          spinnerHeight="h-8"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
          {/* Location */}
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
                    <Map
                      onPlacesSelect={onPlacesSelect}
                      defaultValue=""
                      choosenAddress={currentPost.location ?? ""}
                    />
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
                  <div className="flex items-center gap-3">
                    <h3 className="h3">Detalji </h3>
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-primary"
                      data-tooltip-id="details"
                    />
                    <Tooltip
                      id="details"
                      style={tooltipStyle}
                      className="max-w-sm"
                      offset={7}
                      content="Ukoliko se neki detalji ne odnose na Vase poslovanje, ostavite ih prazne."
                    />
                  </div>
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
                <p className="mb-4 mt-6 text-xl font-medium">
                  Najranije slobodno :
                </p>
                <input
                  type="date"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  value={
                    currentPost.earlisetAvailable ?? new Date().toDateString()
                  }
                  onChange={(e) => {
                    if (!e.target.value) return;
                    setCurrentPost((prev) => ({
                      ...prev,
                      earlisetAvailable: e.target.value,
                    }));
                  }}
                />

                <p className="mb-4 mt-6 text-xl font-medium">
                  Parking mjesta :
                </p>
                <input
                  type="number"
                  value={currentPost.parkingPlaces ?? 0}
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Npr. 3,20,50,..."
                  onChange={(e) => {
                    const num = parseInt(e.target.value, 10);
                    if (e.target.value === "") {
                      setCurrentPost((prev) => ({
                        ...prev,
                        parkingPlaces: 0,
                      }));
                      return;
                    }
                    if (!Number.isNaN(num)) {
                      setCurrentPost((prev) => ({
                        ...prev,
                        parkingPlaces: num,
                      }));
                    } else {
                      toast.error("Potreban broj!");
                    }
                  }}
                />

                <p className="mb-4 mt-6 text-xl font-medium">
                  Velicina prostora :
                </p>
                <input
                  type="text"
                  value={currentPost.placeSize ?? ""}
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Npr. 80m2, 100m2,..."
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      placeSize: e.target.value,
                    }))
                  }
                />
              </div>
            </Accordion>
          </div>
          {/* Contact info */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-10">
            <Accordion
              buttonContent={(open) => (
                <div className="flex items-center justify-between rounded-2xl">
                  <h3 className="h3">Kontakt </h3>
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
                <p className="mb-4 mt-6 text-xl font-medium">Broj telefona :</p>
                <div className="mb-5 flex flex-col gap-4">
                  {contactPhonesNedded.map((_item, idx) => {
                    return (
                      <div key={idx} className="flex gap-4">
                        <input
                          type="tel"
                          pattern="^[0-9]{3,45}$"
                          className="w-full rounded-md border p-2 text-base focus:outline-none"
                          placeholder="Unesite broj"
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
                          makni
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

                <p className="mb-4 mt-6 text-xl font-medium">Email adresa:</p>
                <div className="mb-5 flex flex-col gap-4">
                  {contactEmailsNedded.map((_item, idx) => {
                    return (
                      <div key={idx + 100} className="flex gap-4">
                        <input
                          type="email"
                          className="w-full rounded-md border p-2 text-base focus:outline-none"
                          placeholder="Unesite email"
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
                          makni
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
                <p className="mb-4 mt-6 text-xl font-medium">Web stranica :</p>
                <input
                  type="url"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Unesite url"
                  value={currentPost.website ?? ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                />
                <p className="mb-4 mt-6 text-xl font-medium">Instagram :</p>
                <input
                  type="url"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Instagram url"
                  value={currentPost.instagramLink ?? ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      instagramLink: e.target.value,
                    }))
                  }
                />
                <p className="mb-4 mt-6 text-xl font-medium">Facebook :</p>
                <input
                  type="url"
                  className="w-full rounded-md border p-2 text-base focus:outline-none"
                  placeholder="Enter Facebook url"
                  value={currentPost.facebookLink ?? ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      facebookLink: e.target.value,
                    }))
                  }
                />
              </div>
            </Accordion>
          </div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={async (e) => {
              await postAction(e);
            }}
          >
            <button type="submit" className="btn-primary mt-6 font-semibold">
              Spremi promjene
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyPostView;
