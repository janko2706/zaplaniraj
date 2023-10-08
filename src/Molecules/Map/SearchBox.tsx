import { useEffect, useState } from "react";
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
  const [selectOptions, setSelectOptions] = useState<
    string[]
  >([""]);

  useEffect(() => {
   setSelectOptions([...data.map((item:{description:string})=>item.description)])
  }, [data])
  

  return (
 
<div >
    <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="relative">
            <input disabled={!ready} type="text" className="p-2 pl-8 w-full rounded border border-gray-200 bg-gray-200 " placeholder="search..." value={value} onChange={(e)=>setValue(e.target.value)} />
            <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
        </div>
        <ul className="bg-white border border-gray-100 w-full mt-2">
          {selectOptions.map((address, idx)=>{
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            return <li key={idx} onClick={async()=>{
              setValue(address, false)
              clearSuggestions()
              try {
                const result = await getGeocode({address})
                console.log(result)
                const {lat, lng} = getLatLng(result[0])
                onSelectAddress(address,lat, lng)
              } catch (error) {
                console.error('Geolocation error: ', error);
                
              }
            }} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                          <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                          </svg>
                          {address}
                      </li>
          })}
        </ul>
    </div>
</div>
    
  );
};

export default SearchBox;
