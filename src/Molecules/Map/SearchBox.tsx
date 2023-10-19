import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { useGoogleMapsScript } from "use-google-maps-script";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { env } from "~/env.mjs";
import { libraries } from "~/utils/googleLibraries";

type Props = {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    langitude: number | null
  ) => void;
  defaultValue: string;
};

function SearchBox({ onSelectAddress, defaultValue }: Props) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return null;
  if (loadError) {
    return <div>Error loading</div>;
  }
  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
    />
  );
}

const ReadySearchBox = ({ onSelectAddress, defaultValue }: Props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 700, defaultValue });
  const [selectOptions, setSelectOptions] = useState<string[]>([""]);

  useEffect(() => {
    setSelectOptions([
      ...data.map((item: { description: string }) => item.description),
    ]);
  }, [data]);

  return (
    <div>
      <div className="relative inline-flex flex-col justify-center text-gray-500">
        <div className="relative">
          <input
            disabled={!ready}
            type="text"
            className="w-full rounded border border-gray-200 bg-gray-200 p-2 pl-8 "
            placeholder="search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CgSearch className="absolute left-2.5 top-3.5 h-4 w-4" />
        </div>
        <ul className="mt-2 w-full border border-gray-100 bg-white">
          {selectOptions.map((address, idx) => {
            return (
              <li
                key={idx}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => {
                  setValue(address, false);
                  clearSuggestions();
                  try {
                    const result = await getGeocode({ address });
                    const { lat, lng } = getLatLng(result[0]);
                    onSelectAddress(address, lat, lng);
                  } catch (error) {
                    console.error("Geolocation error: ", error);
                  }
                }}
                className="relative cursor-pointer border-b-2 border-gray-100 py-1 pl-8 pr-2 hover:bg-yellow-50 hover:text-gray-900"
              >
                <ArrowRightIcon className="absolute left-2 top-2 h-4 w-4" />
                {address}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBox;
