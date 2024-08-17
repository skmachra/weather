import React from "react";
import { useState } from "react";
import logo from "/src/assets/pngwing.com.png";
import FetchLocationByCity from "./LocationInput";

function Nav({ onCitySearch }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      await onCitySearch(city); // Pass the city to the parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav class="bg-blue-600 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="#"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            class="h-8"
            alt="Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Weather
          </span>
        </a>
        <div class="flex md:order-2">
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
            <button
              type="button"
              className=" text-white rounded"
              onClick={handleSearch}
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
            </div>
            <input
              type="text number"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
