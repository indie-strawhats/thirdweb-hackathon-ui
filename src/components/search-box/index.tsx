import React from 'react';
import { BiSearch } from 'react-icons/Bi';
import { IconContext } from 'react-icons/lib';

const SearchBox = () => {
  return (
    <div className='flex items-center justify-center px-4'>
      <div className='relative'>
        <input
          type='text'
          className='z-0 pl-10 rounded pr-7 h-14 w-96 focus:shadow focus:outline-none '
          placeholder='Search...'
        />
        <div className='absolute top-4 left-3'>
          <IconContext.Provider
            value={{
              className: 'text-red-400 text-2xl',
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
