import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { FaSearch } from "react-icons/fa";

const Search = ({ onResultSelect }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);
  const searchBarRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchInput}`);
    try {
      const response = await axios.get(
        `https://song-recommender-server.vercel.app/search?query=${searchInput}`
      );
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClickOutside = (event) => {
    // console.log("Click detected outside search results");
    // console.log("searchResultsRef:", searchResultsRef.current);
    // console.log("event target:", event.target);
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      // Escape key code
      setSearchResults([]);
    }
  };

  const handleSelectResult = (track) => {
    onResultSelect(track);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="search-main">
      <form className="search-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          ref={searchBarRef}
          name="song"
          type="text"
          placeholder="Search for a song"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
        <div
          ref={searchResultsRef}
          className={`${
            searchResults.length > 0 ? "search-results" : "hidden"
          }`}
        >
          {searchResults &&
            searchResults.map((track, index) => {
              return (
                <div key={index} className="search-result-item">
                  {track.album.images && (
                    <img
                      className="w-10 h-10 rounded-md"
                      src={track.album.images[0].url}
                      alt=""
                    />
                  )}
                  <div className="flex justify-between w-full">
                    <div className="w-[150px] px-2 flex flex-col">
                      <p className="truncate">{track.name}</p>
                      <p className="truncate text-gray-300 italic">
                        {track.artists[0].name}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleSelectResult(track)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  onResultSelect: PropTypes.func.isRequired,
};

export default Search;
