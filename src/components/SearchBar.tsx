import { Dispatch, SetStateAction } from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm?: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="">
      <div className="bg-gray-100 flex items-center my-2 relative rounded-full">
        <div className="text-gray-500 pl-3 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          className="w-full focus:outline-none p-2 rounded-full bg-gray-100"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          role="button"
          onClick={() => setSearchTerm("")}
          className="text-gray-500 pr-3 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title>close</title>
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <hr className=" border-gray-300"></hr>
    </div>
  );
};

export default SearchBar;
