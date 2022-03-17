import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}

const Search: React.FC<Props> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="relative flex w-full lg:w-1/4 flex-wrap justify-between items-center mb-3">
      <input
        type="text"
        placeholder={`Search...`}
        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm  border-b-2  shadow-lg outline-none focus:outline-none focus:ring w-full pr-10"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <AiOutlineSearch className="w-4 h-4" />
      </span>
    </div>
  );
};

export default Search;
