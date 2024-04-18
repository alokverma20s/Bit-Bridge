import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


let filteredQuestionArray = []

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  function handleSearch(e) {
    navigate(`/filter/${searchText}`)
  }
  function handleChange(e) {
    setSearchText(e.target.value);
  }
  

  return (
    <span>
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          id="search-bar"
          placeholder="Search..."
          onChange={handleChange}
        />
        <span className="material-symbols-outlined search-icon" onClick={handleSearch}>
            <Link to={`/filter/${searchText}`}>
              <i style={{color: "white"}} className="fa fa-search" aria-hidden="true"></i>
            </Link>
        </span>
      </form>
    </span>
  );
};

export default Searchbar;
export {filteredQuestionArray};
