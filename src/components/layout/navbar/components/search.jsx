import { SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <div class="max-w-md mx-auto ">
      <div class="relative flex items-center md:w-80 h-10 rounded-full focus-within:shadow-lg md:bg-white overflow-hidden">
        <div class="grid place-items-center h-full md:w-10 text-gray-300">
          <SearchIcon className="text-white md:text-gray-300 w-9 h-9 md:w-5 md:h-5" />
        </div>

        <input
          class=" h-full md:w-full hidden md:block outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something.."
        />
      </div>
    </div>
  );
};

export default Search;
