import React from "react";
import SearchBox from "./SearchBox";

type Props = {
  onPlacesSelect: (
    address: string,
    latitude: number | null,
    langitude: number | null
  ) => void;
  defaultValue: string;
  choosenAddress?: string

};
const Map = ({onPlacesSelect, defaultValue, choosenAddress}:Props) => {

  return (
    <div className="w-100 flex items-center gap-5">
      <SearchBox onSelectAddress={onPlacesSelect} defaultValue={defaultValue} />
      {choosenAddress && (
        <div>
          <span className="text-lg font-semibold">Vasa adresa: </span>
          {choosenAddress}
        </div>
      )}
    </div>
  );
};

export default Map;
