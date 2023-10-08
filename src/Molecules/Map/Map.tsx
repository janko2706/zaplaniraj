import React, { useState } from "react";
import SearchBox from "./SearchBox";

const Map = () => {
  const [chooseAddress, setChooseAddress] = useState<string>();
  const onPlacesSelect = (
    address: string,
    latitude: number | null,
    langitude: number | null
  ) => {
    setChooseAddress(address);
  };
  return (
    <div className="w-100 flex items-center gap-5">
      <SearchBox onSelectAddress={onPlacesSelect} defaultValue="" />
      {chooseAddress && (
        <div>
          <span className="text-lg font-semibold">Vasa adresa: </span>{" "}
          {chooseAddress}
        </div>
      )}
    </div>
  );
};

export default Map;
