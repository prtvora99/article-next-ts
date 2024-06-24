// src/components/SearchFilter.tsx
"use client";

import { sortField, sortOrder } from "@/src/types/article";
import { useState } from "react";

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  onSortBy: (sortField: sortField, sortOrder?: sortOrder) => void;
}

const SearchFilter = ({ onSearch, onSortBy }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterOption(selectedValue);
    if (!selectedValue) {
      onSortBy("default");
      return;
    }
    const parts = selectedValue.split("-");
    const sortOrder = parts[1] === "az" ? "asc" : "dsc";
    onSortBy(parts[0] as sortField, sortOrder);
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row items-center justify-end">
      <input
        type="text"
        className="bg-gray-800 border border-gray-700 text-white rounded-lg p-2 mb-4 md:mb-0 md:mr-4 focus:outline-none"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="bg-gray-800 border border-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none"
        value={filterOption}
        onChange={handleFilterChange}
      >
        <option value="">Default</option>
        <option value="title-az">Title - A to Z</option>
        <option value="title-za">Title - Z to A</option>
        <option value="id-az">ID - A to Z</option>
        <option value="id-za">ID - Z to A</option>
      </select>
    </div>
  );
};

export default SearchFilter;
