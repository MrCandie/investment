import { useRouter } from "next/router";
import React, { useState } from "react";

import { BsArrowLeft } from "react-icons/bs";

export default function Search({ text }) {
  const router = useRouter();

  const [search, setSearch] = useState([]);

  function searchHandler(e) {
    e.preventDefault();
  }
  return (
    <div className="flex items-center">
      <span onClick={() => router.replace("/admin")} className="nav-icon">
        <BsArrowLeft />
      </span>
      <form onSubmit={searchHandler} className="w-[80%] mx-auto p-2">
        <input
          className="input w-full "
          type="search"
          placeholder={`Search ${text}`}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
    </div>
  );
}
