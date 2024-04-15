import React, { useState, useEffect } from "react";
import dummyData from "./assets/dummy.json";

const Table = () => {
  const [colleges, setColleges] = useState(dummyData);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleRows, setVisibleRows] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sortColleges = (key, order) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setColleges(sortedColleges);
  };

  const handleSort = (key, order) => {
    setSortBy({ key, order });
    sortColleges(key, order);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <input
        type="text"
        placeholder="Search by college name"
        onChange={handleSearch}
        className="w-full px-3 py-2 mb-4 mt-6 border border-gray-300 rounded-md"
      />
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
              CD Rank
            </th>
            <th
              onClick={() =>
                handleSort(
                  "name",
                  sortBy && sortBy.key === "name"
                    ? sortBy.order === "asc"
                      ? "desc"
                      : "asc"
                    : "asc"
                )
              }
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer hover:text-gray-900"
            >
              College Name
            </th>
            <th
              onClick={() =>
                handleSort(
                  "rating",
                  sortBy && sortBy.key === "rating"
                    ? sortBy.order === "asc"
                      ? "desc"
                      : "asc"
                    : "asc"
                )
              }
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-900"
            >
              Rating
            </th>
            <th
              onClick={() =>
                handleSort(
                  "fees",
                  sortBy && sortBy.key === "fees"
                    ? sortBy.order === "asc"
                      ? "desc"
                      : "asc"
                    : "asc"
                )
              }
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-900"
            >
              Fees
            </th>
            <th
              onClick={() =>
                handleSort(
                  "userReview",
                  sortBy && sortBy.key === "userReview"
                    ? sortBy.order === "asc"
                      ? "desc"
                      : "asc"
                    : "asc"
                )
              }
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
            >
              User Review Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase ">
              Featured
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.slice(0, visibleRows).map((college) => (
            <tr key={college.id} className="border-t border-gray-200">
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.id}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.name}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.rating}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.fees}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.userReview}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {college.featured ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
