import React, { useState, useEffect, useCallback } from "react";
import instance from "./interceptor/axios";
import useDebounce from "./hooks";
import TableShimmer from "./TableShimmer";
import debounce from "./debounce";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";
import Table from "./Table";

export interface Customer {
  name_of_customer: string;
  email: string;
  dob: string;
  mobile_number: string;
  created_at: string;
}

const App = () => {
  const [tableItems, setTableItems] = useState<Customer[] | []>([]);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prevState) => !prevState); 
      try {
        const response = await instance.get(`/api/customers`, {
          params: {
            page,
            limit,
            search: debouncedSearch,
            filterField,
            filterValue: filterField ? debouncedFilterValue : "",
          },
        });

        setTableItems(response.data.customers);
        setTotalPages(response.data.totalPage);
      } catch (error) {
        if (error instanceof AxiosError)
          toast.error(error.response?.data.error);
        else if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading((prevState) => !prevState);
      }
    };

    fetchData();
  }, [debouncedSearch, debouncedFilterValue, page, limit]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);
  const handleSerchByField = useCallback(
    debounce(() => {
      setPage(1);
      setSearch("");
      if (filterValue) setDebouncedFilterValue(filterValue);
    }, 1000),
    [filterValue]
  );
  const clearFieldSearch = useCallback(() => {
    setFilterField("");
    setFilterValue("");
    setDebouncedFilterValue("");
  }, []);

  const handleFilterFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterField(e.target.value);
      setFilterValue("");
      setDebouncedFilterValue("");
      setPage(1);
    },
    []
  );

  const handleNextPage = useCallback(
    debounce(() => {
      setPage((prev) => Math.min(prev + 1, totalPages));
    }, 500),
    [totalPages]
  );
  const handlePrevPage = useCallback(
    debounce(() => {
      setPage((prev) => Math.max(prev - 1, 1));
    }, 500),
    []
  );

  return (
    <div className="min-w-screen-2xl px-4 md:px-8 text-gray-200 bg-gray-900 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-between items-center py-6">
        <Toaster duration={1500} richColors position="top-right" />
        <div className="flex w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="flex-1 border border-gray-700 rounded-l-lg px-4 py-2 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={handleSearch}
          />
          <button
            onClick={() => setSearch("")}
            disabled={search ? false : true}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-r-lg"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <select
              name="filterField"
              className="border border-gray-700 rounded-lg px-4 py-2  bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFilterFieldChange}
              value={filterField}
            >
              <option value="">Filter by Field</option>
              <option value="mobile_number">Mobile Number</option>
              <option value="dob">Date of Birth</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              name="filterValue"
              placeholder="Filter Value"
              className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <button
              disabled={filterValue || filterField ? false : true}
              onClick={clearFieldSearch}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={filterValue === "" ? true : false}
              onClick={handleSerchByField}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 shadow-md border border-gray-700 rounded-lg overflow-x-auto">
      
          {loading ? <TableShimmer /> : <Table tableItems={tableItems} />}
     
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalPages / limit)}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
