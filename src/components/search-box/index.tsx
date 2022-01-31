import React, { FC, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';

export interface ISearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: FC<ISearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-center px-4 pt-6">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          className="z-0 w-full pl-10 text-lg font-semibold text-gray-700 rounded shadow pr-7 h-14 ring-2 ring-offset-2 ring-gray-300 focus:shadow-md focus:outline-none"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute top-4 left-3">
          <IconContext.Provider
            value={{
              className: 'text-gray-400 text-2xl text-indigo-400',
            }}
          >
            <BiSearch />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
