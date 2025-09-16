'use client';


import { useState } from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
export default function FilterDropdown({ filter, setFilter }) {
  const [open, setOpen] = useState(false);

  const options = ["All", "Completed", "Upcoming"];

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-3 gap-1 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
      >
        <FilterAltOutlinedIcon color="success" sx={{ fontSize: 20 }} />
        Filter
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    setFilter(option);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    filter === option ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
